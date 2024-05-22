import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = app.get(ConfigService);
  const PORT = cfg.get('PORT') || 8080;

  await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
bootstrap();
