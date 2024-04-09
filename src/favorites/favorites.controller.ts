import {Body, Controller, Post, Request, Delete, Get, Param, UseGuards} from '@nestjs/common';
import {FavoriteService} from "./favorite.service";
import {AddFavoriteDto} from "./dto/add-favorite.dto";
import {IdDto} from "../common/dto/id.dto";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {RolesGuard} from "../common/guards/roles.guard";
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('favorite')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}
  @Get('')
  async index(@Request() req) {
    return await this.favoriteService.getAll({user_id:req.user.userId});
  }

  @Post('')
  async add(@Request() req, @Body() addFavoriteDto: AddFavoriteDto) {
    return await this.favoriteService.create({...addFavoriteDto,user_id : req.user.userId});
  }


  @Delete(':id')
  async remove(@Request() req, @Param() {id}: IdDto) {
    return await this.favoriteService.delete({id,user_id:req.user.userId});
  }


}
