/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { K8sController } from './k8s.controller';
import { RomanNumeralModule } from '../roman-numeral/roman-numeral.module';

@Module({
  imports: [RomanNumeralModule],
  controllers: [K8sController],
})
export class K8sModule {}
