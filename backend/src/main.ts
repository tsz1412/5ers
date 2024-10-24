import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SEED_DATABASE === 'true') {
    const seederService = app.get(SeederService);
    await seederService.seedUsers();
  }

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
