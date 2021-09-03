import { Controller, Get, Logger } from '@nestjs/common';
import { RomanNumeralService } from '../roman-numeral/services/roman-numeral.service';
import { ConversionsDto } from '../roman-numeral/dto/conversions.dto';

// This controller is exposed specifically for Kubernetes deployments
// https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
@Controller('k8s')
export class K8sController {
  constructor(private readonly romanNumeralService: RomanNumeralService) {}
  private readonly logger = new Logger(K8sController.name);

  @Get('liveness')
  async getLiveness() {
    this.logger.log('liveness probe executed');
    return new Date();
  }

  // Calling the romanNumeralService with the max range so that we can pre-populate the cache in a k8s deployment
  @Get('startup')
  async getStartup() {
    this.logger.log('startup probe executed');
    const input = new ConversionsDto();
    input.min = 1;
    input.max = 3999;
    await this.romanNumeralService.convertIntRangeToRomanNumerals(input);
    return new Date();
  }

  @Get('readiness')
  async getReadiness() {
    this.logger.log('readiness probe executed');
    return new Date();
  }
}
