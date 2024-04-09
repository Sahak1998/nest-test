import {
  Column,

  Entity, ManyToOne, OneToMany,

  PrimaryGeneratedColumn
} from 'typeorm';
import {UserCat} from "../../favorites/entities/user-cat.entity";
import {User} from "../../auth/entities/user.entity";


@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'varchar' })
  name: string;
  @Column({ nullable: false, type: 'integer' })
  age: number;
  @Column({ nullable: false, type: 'varchar' })
  breed: string;
  @OneToMany(() => UserCat, userCat => userCat.cat, { onDelete: 'CASCADE' })
  favorites: UserCat[];
}
