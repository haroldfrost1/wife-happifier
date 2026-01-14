import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  public readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      auth: this.configService.getOrThrow<string>('NOTION_API_KEY'),
    });
  }
}
