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
    PORT: 3000 || Number(process.env.PORT),
    SWAGGER_PATH: 'doc' || process.env.SWAGGER_PATH,
    ENV: 'DEV' || process.env.ENV,
  }),
);
