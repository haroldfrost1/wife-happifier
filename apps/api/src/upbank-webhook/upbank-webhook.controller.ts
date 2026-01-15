import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import {
  UpBankWebhookService,
  UpBankWebhookEvent,
} from './upbank-webhook.service';

@Controller('webhooks/upbank')
export class UpBankWebhookController {
  private readonly logger = new Logger(UpBankWebhookController.name);

  constructor(private readonly webhookService: UpBankWebhookService) {}

  /**
   * Endpoint to receive webhook events from Up Bank.
   *
   * Up Bank sends events as JSON-encoded POST requests with a
   * X-Up-Authenticity-Signature header for verification.
   *
   * Must respond with HTTP 200 within 30 seconds.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('X-Up-Authenticity-Signature') signature: string,
  ): { ok: boolean } {
    this.logger.log('Received webhook request from Up Bank');

    // Get the raw body for signature verification
    const rawBody = req.rawBody;

    if (!rawBody) {
      this.logger.error('Raw body not available for signature verification');
      throw new Error(
        'Raw body not available. Ensure rawBody is enabled in NestJS.',
      );
    }

    // Verify the webhook signature
    this.webhookService.verifySignature(rawBody, signature);

    // Parse the event payload
    const event = JSON.parse(rawBody.toString()) as UpBankWebhookEvent;

    // Process the event asynchronously but respond immediately
    // to meet Up Bank's 30s timeout requirement
    this.webhookService.processWebhookEvent(event).catch((error: Error) => {
      this.logger.error(`Error processing webhook event: ${error.message}`);
    });

    return { ok: true };
  }
}
