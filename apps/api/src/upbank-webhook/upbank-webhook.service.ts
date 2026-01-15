import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import {
  SpendingsService,
  UpBankTransaction,
} from '../spendings/spendings.service';

/**
 * WebhookEventResource as received from Up Bank
 */
export interface UpBankWebhookEvent {
  data: {
    type: 'webhook-events';
    id: string;
    attributes: {
      eventType:
        | 'TRANSACTION_CREATED'
        | 'TRANSACTION_SETTLED'
        | 'TRANSACTION_DELETED'
        | 'PING';
      createdAt: string;
    };
    relationships: {
      webhook: {
        data: {
          type: 'webhooks';
          id: string;
        };
        links?: {
          related: string;
        };
      };
      transaction?: {
        data: {
          type: 'transactions';
          id: string;
        };
        links?: {
          related: string;
        };
      };
    };
  };
}

/**
 * Response from Up Bank transaction API endpoint
 */
interface UpBankTransactionResponse {
  data: UpBankTransaction;
}

@Injectable()
export class UpBankWebhookService {
  private readonly logger = new Logger(UpBankWebhookService.name);
  private readonly webhookSecretKey: string | undefined;
  private readonly upBankToken: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly spendingsService: SpendingsService,
  ) {
    this.webhookSecretKey = this.configService.get<string>(
      'UP_BANK_WEBHOOK_SECRET',
    );
    if (!this.webhookSecretKey) {
      this.logger.warn(
        'UP_BANK_WEBHOOK_SECRET is not set. Webhook signature verification will fail.',
      );
    }

    this.upBankToken = this.configService.get<string>('UP_BANK_TOKEN');
    if (!this.upBankToken) {
      this.logger.warn(
        'UP_BANK_TOKEN is not set. Cannot fetch transaction details.',
      );
    }
  }

  /**
   * Verifies the authenticity of an incoming webhook request by computing the
   * SHA-256 HMAC signature of the raw request body and comparing it with the
   * X-Up-Authenticity-Signature header.
   *
   * @param rawBody - The raw request body as a Buffer
   * @param signature - The signature from the X-Up-Authenticity-Signature header
   * @returns true if the signature is valid
   * @throws UnauthorizedException if the signature is invalid or secret is not configured
   */
  verifySignature(rawBody: Buffer, signature: string): boolean {
    if (!this.webhookSecretKey) {
      throw new UnauthorizedException(
        'Webhook secret key is not configured. Cannot verify signature.',
      );
    }

    if (!signature) {
      throw new UnauthorizedException(
        'Missing X-Up-Authenticity-Signature header',
      );
    }

    // Compute the HMAC SHA-256 signature
    const computedSignature = crypto
      .createHmac('sha256', this.webhookSecretKey)
      .update(rawBody)
      .digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(computedSignature, 'hex'),
    );

    if (!isValid) {
      this.logger.warn('Webhook signature verification failed');
      throw new UnauthorizedException('Invalid webhook signature');
    }

    this.logger.debug('Webhook signature verified successfully');
    return true;
  }

  /**
   * Fetches the full transaction details from Up Bank using the transaction link
   *
   * @param transactionLink - The API link to fetch transaction details
   * @returns The full transaction object
   */
  private async fetchTransactionDetails(
    transactionLink: string,
  ): Promise<UpBankTransaction> {
    if (!this.upBankToken) {
      throw new Error('UP_BANK_TOKEN is not configured');
    }

    const response = await firstValueFrom(
      this.httpService.get<UpBankTransactionResponse>(transactionLink, {
        headers: { Authorization: `Bearer ${this.upBankToken}` },
      }),
    );

    return response.data.data;
  }

  /**
   * Handles the TRANSACTION_SETTLED webhook event.
   * Fetches the full transaction details, persists as a spending, and syncs to Notion.
   *
   * @param event - The webhook event payload
   */
  async handleTransactionSettled(event: UpBankWebhookEvent): Promise<void> {
    const { data } = event;
    const transactionId = data.relationships.transaction?.data?.id;
    const transactionLink = data.relationships.transaction?.links?.related;

    this.logger.log(
      `Handling TRANSACTION_SETTLED event: ${data.id} for transaction: ${transactionId}`,
    );

    if (!transactionLink) {
      this.logger.error(
        `No transaction link provided in webhook event ${data.id}`,
      );
      return;
    }

    try {
      // Fetch the full transaction details from Up Bank
      this.logger.log(`Fetching transaction details from: ${transactionLink}`);
      const transaction = await this.fetchTransactionDetails(transactionLink);

      // Process the transaction - persists to DB and syncs to Notion
      const processed =
        await this.spendingsService.processSingleTransaction(transaction);

      if (processed) {
        this.logger.log(
          `Successfully processed settled transaction: ${transactionId}`,
        );
      } else {
        this.logger.log(
          `Transaction ${transactionId} was already processed (duplicate)`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to process transaction ${transactionId}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  /**
   * Main entry point for processing incoming webhook events.
   * Routes events to appropriate handlers based on event type.
   *
   * @param event - The webhook event payload
   */
  async processWebhookEvent(event: UpBankWebhookEvent): Promise<void> {
    const eventType = event.data.attributes.eventType;
    const eventId = event.data.id;

    this.logger.log(`Processing webhook event: ${eventType} (${eventId})`);

    switch (eventType) {
      case 'TRANSACTION_SETTLED':
        await this.handleTransactionSettled(event);
        break;
      case 'TRANSACTION_CREATED':
        this.logger.debug(`Ignoring TRANSACTION_CREATED event: ${eventId}`);
        break;
      case 'TRANSACTION_DELETED':
        this.logger.debug(`Ignoring TRANSACTION_DELETED event: ${eventId}`);
        break;
      case 'PING':
        this.logger.log(`Received PING event: ${eventId}`);
        break;
      default: {
        // Exhaustive type checking - this should never be reached
        const _exhaustiveCheck: never = eventType;
        this.logger.warn(
          `Unknown event type received: ${String(_exhaustiveCheck)}`,
        );
      }
    }
  }
}
