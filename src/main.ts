/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { RomanNumeralModule } from './roman-numeral/roman-numeral.module';
import { ConversionEntity } from './roman-numeral/entities/conversion.entity';
import { ConversionsEntity } from './roman-numeral/entities/conversions.entity';
import { ConversionDto } from './roman-numeral/dto/conversion.dto';
import { ConversionsDto } from './roman-numeral/dto/conversions.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // https://github.com/winstonjs/winston
    // https://github.com/gremo/nest-winston
    // Replacing the built-in NestJs Logger with Winston because of it's supported transports
    // https://github.com/winstonjs/winston/blob/master/docs/transports.md
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.sss A UTC' }),
            winston.format.ms(),
            winston.format.prettyPrint({ colorize: true }),
          ),
        }),
      ],
      level: 'debug',
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Adobe Exercise')
    .setDescription('An api to convert integers to roman numerals')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    include: [RomanNumeralModule],
    extraModels: [ConversionEntity, ConversionsEntity, ConversionDto, ConversionsDto],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
