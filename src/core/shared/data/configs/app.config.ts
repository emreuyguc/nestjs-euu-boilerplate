import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  PORT: number;
  SWAGGER_PATH: string;
  ENV: string;
}

export const AppConfigKey = 'AppConfig';

export const AppConfig = registerAs(
  AppConfigKey,
  (): IAppConfig => ({
    PORT: Number(process.env.PORT),
    SWAGGER_PATH: process.env.SWAGGER_PATH,
    ENV: process.env.ENV,
  }),
);
