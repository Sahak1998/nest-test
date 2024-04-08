import { NestFactory } from '@nestjs/core';
import {AppModule} from "../../app.module";
import {AuthService} from "../../auth/auth.service";


async function seed() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const seeder = appContext.get(AuthService);
  await seeder.seedRolesAndUsers()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => {
      throw error;
    })
    .finally(() => appContext.close());
}

seed();
