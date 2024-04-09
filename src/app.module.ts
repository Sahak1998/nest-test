import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {LocalStrategy} from "./common/strategies/local.strategy";
import {JwtStrategy} from "./common/strategies/jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {FavoritesModule} from "./favorites/favorites.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {

        return ({
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        })
      }

    }),
    CoreModule, CatsModule, AuthModule,FavoritesModule],
  providers:[LocalStrategy,JwtStrategy]
})
export class AppModule {}
