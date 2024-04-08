import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {UserRole} from "./user-role.entity";

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
}
