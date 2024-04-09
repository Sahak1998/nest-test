
import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {UserCat} from "./entities/user-cat.entity";


@Injectable()
export class FavoriteService {
  constructor(
  @InjectRepository(UserCat) private userCatRepository: Repository<UserCat>,
) {
  }
  async create(data) {
    const newData= await this.userCatRepository.create(data);
    return await this.userCatRepository.save(newData);
  }

  async delete(cond) {
    return await this.userCatRepository.delete(cond);
  }

  async getAll(cond) {
    return await this.userCatRepository.find(cond);
  }
}
