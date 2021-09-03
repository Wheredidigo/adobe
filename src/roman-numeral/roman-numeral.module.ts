/* istanbul ignore file */
import { CacheModule, Module } from '@nestjs/common';
import { RomanNumeralController } from './controllers/roman-numeral.controller';
import { RomanNumeralService } from './services/roman-numeral.service';

@Module({
  // We can set up different caches inside the register method
  // https://docs.nestjs.com/techniques/caching#different-stores
  imports: [
    CacheModule.register({
      ttl: 0,
      max: 5000,
    }),
  ],
  controllers: [RomanNumeralController],
  providers: [RomanNumeralService],
  exports: [RomanNumeralService],
})
export class RomanNumeralModule {}
