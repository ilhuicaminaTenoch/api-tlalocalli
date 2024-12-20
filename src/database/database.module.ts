import { Global, Module } from '@nestjs/common';

import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

const API_KEY_JETPACK: string =
  'jpcrm_pk_bf9b48dac6ca52dec25b480354b6bceb4be65ebd';
const API_SECRET_JETPACK: string =
  'jpcrm_sk_22fe81ef8e41c74adb484c6f8a6709e68990f41d';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: {
        secret: API_SECRET_JETPACK,
        key: API_KEY_JETPACK,
      },
    },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
