
import {HttpException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import {UserRole} from "./entities/user-role.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  @InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Role) private roleRepository: Repository<Role>,
  @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
) {}

  async register(username: string, pass: string): Promise<any> {

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new HttpException('User already exists',400);
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    const { password, ...result } = newUser;
    return result;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } , relations:{
      roles: {
        role:true
      }
      } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;


      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id , roles:user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async seedRolesAndUsers() {
    try {
      const adminRole = this.roleRepository.create({ name: 'admin' });
      await this.roleRepository.save(adminRole);

      const hashedPassword = await bcrypt.hash('adminPassword', 10);
      const adminUser = this.userRepository.create({
        username: 'admin@admin.com',
        password: hashedPassword,
      });
      await this.userRepository.save(adminUser);

      const adminUserRole = this.userRoleRepository.create({
        user: adminUser,
        role: adminRole,
      });
      await this.userRoleRepository.save(adminUserRole);

    } catch (e) {
      console.log(e,'Error Seeding ')
    }

  }
}
