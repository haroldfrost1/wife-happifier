import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

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

@Injectable()
export class UpBankWebhookService {
  private readonly logger = new Logger(UpBankWebhookService.name);
  private readonly webhookSecretKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.webhookSecretKey = this.configService.get<string>(
      'UP_BANK_WEBHOOK_SECRET',
    );
    if (!this.webhookSecretKey) {
      this.logger.warn(
        'UP_BANK_WEBHOOK_SECRET is not set. Webhook signature verification will fail.',
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
   * Handles the TRANSACTION_SETTLED webhook event
   *
   * @param event - The webhook event payload
   */
  handleTransactionSettled(event: UpBankWebhookEvent): void {
    const { data } = event;
    const transactionId = data.relationships.transaction?.data?.id;
    const transactionLink = data.relationships.transaction?.links?.related;

    this.logger.log(
      `Handling TRANSACTION_SETTLED event: ${data.id} for transaction: ${transactionId}`,
    );

    // TODO: Implement the actual logic for handling transaction settled events
    // This could include:
    // 1. Fetching the full transaction details from Up Bank using the transactionLink
    // 2. Saving or updating the transaction in the local database
    // 3. Syncing with Notion or other services
    // 4. Triggering notifications

    // Placeholder for implementation
    this.logger.log(
      `Transaction ${transactionId} settled. Link: ${transactionLink}`,
    );
  }

  /**
   * Main entry point for processing incoming webhook events.
   * Routes events to appropriate handlers based on event type.
   *
   * @param event - The webhook event payload
   */
  processWebhookEvent(event: UpBankWebhookEvent): Promise<void> {
    const eventType = event.data.attributes.eventType;
    const eventId = event.data.id;

    this.logger.log(`Processing webhook event: ${eventType} (${eventId})`);

    switch (eventType) {
      case 'TRANSACTION_SETTLED':
        this.handleTransactionSettled(event);
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

    return Promise.resolve();
  }
}
