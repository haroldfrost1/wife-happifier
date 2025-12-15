import { TransactionParser } from './types';
import { StGeorgeParser } from './st-george.parser';
import { BadRequestException } from '@nestjs/common';

export class ParserFactory {
  static getParser(bankId: string): TransactionParser {
    switch (bankId) {
      case 'stgeorge':
        return new StGeorgeParser();
      default:
        throw new BadRequestException(`Unsupported bank provider: ${bankId}`);
    }
  }
}
