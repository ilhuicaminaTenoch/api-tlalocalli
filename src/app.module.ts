import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { HttpClientModule } from './http-client/http-client.module';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JETPACK: Joi.object({
          key: Joi.string().required(),
          secret: Joi.string().required(),
          url: Joi.string().required(),
        }),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
