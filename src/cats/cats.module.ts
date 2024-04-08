import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {Cat} from "./entities/cats.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports:[		TypeOrmModule.forFeature([Cat])]
})
export class CatsModule {}
