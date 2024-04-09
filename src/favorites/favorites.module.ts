import {TypeOrmModule} from "@nestjs/typeorm";
import {UserCat} from "./entities/user-cat.entity";
import {Module} from "@nestjs/common";
import {FavoriteService} from "./favorite.service";
import {FavoritesController} from "./favorites.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCat]),

  ],
  providers: [FavoriteService],
  controllers: [FavoritesController],
  exports: [FavoriteService],
})
export class FavoritesModule {}
