/* istanbul ignore file */
import { Logger, Module } from '@nestjs/common';
import { RomanNumeralModule } from './roman-numeral/roman-numeral.module';
import { K8sModule } from './k8s/k8s.module';

@Module({
  providers: [Logger],
  imports: [RomanNumeralModule, K8sModule],
})
export class AppModule {}
