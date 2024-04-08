import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import {GetCatDto} from "./dto/get-cat.dto";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param() {id}: GetCatDto
  ) {
    return this.catsService.findOne(id);
  }
  @Roles(['admin'])
  @Delete(':id')
  deleteOne(
    @Param() {id}: GetCatDto
  ) {
    return this.catsService.delete(id);
  }
  @Roles(['admin'])
  @Put(':id')
  updateOne(
    @Param() {id}: GetCatDto,
    @Body() updateCatDto: CreateCatDto
  ) {
    return this.catsService.update(id,updateCatDto);
  }
}
