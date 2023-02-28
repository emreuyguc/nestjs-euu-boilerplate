import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../app/app.module';
import { AppConfig } from './shared/data/configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      envFilePath: '.env',
    }),
    AppModule,
  ],
})
export class CoreModule {}
