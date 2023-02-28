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
        PORT: 3000,
        SWAGGER_PATH: 'doc',
        ENV: 'DEV'
    }),
);