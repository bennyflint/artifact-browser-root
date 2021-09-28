import { cleanEnv, str, url } from 'envalid';

function validateEnv(): Readonly<Record<string, unknown>> {
  return cleanEnv(process.env, {
    NODE_ENV: str(),
    REMOTE_HOST: url({ default: 'http://localhost:8080' }),
  });
}

export default validateEnv;
