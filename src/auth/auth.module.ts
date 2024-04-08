import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import {UserRole} from "./entities/user-role.entity";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
