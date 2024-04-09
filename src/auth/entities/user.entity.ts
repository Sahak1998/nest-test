import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {UserRole} from "./user-role.entity";
import {UserCat} from "../../favorites/entities/user-cat.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserRole, userRole => userRole.user)
  roles: UserRole[];

  @OneToMany(() => UserCat, userCat => userCat.user, { onDelete: 'CASCADE' })
  favorites: UserCat[];
}
