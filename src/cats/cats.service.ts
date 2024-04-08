import { Injectable } from '@nestjs/common';
import { Cat as CatInterface } from './interfaces/cat.interface';
import {Cat} from "./entities/cats.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(data: CatInterface) {
    const newData =  await this.catRepository.create(data);
    return await this.catRepository.save(newData);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id) {
    return await this.catRepository.findOne({
      where: { id }
    });
  }

  async update(id,data) {
    return await this.catRepository.update(id, data);
  }

  async delete(id) {
    return await this.catRepository.delete({ id });
  }
}
