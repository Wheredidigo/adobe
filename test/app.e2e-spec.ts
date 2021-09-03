import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/romannumeral?query=1 (GET)', () => {
    return request(app.getHttpServer()).get('/romannumeral?query=1').expect(200).expect('{"input":"1","output":"I"}');
  });

  it('/romannumeral?min=1&max=3 (GET)', () => {
    return request(app.getHttpServer())
      .get('/romannumeral?min=1&max=3')
      .expect(200)
      .expect('{"conversions":[{"input":"1","output":"I"},{"input":"2","output":"II"},{"input":"3","output":"III"}]}');
  });
});
