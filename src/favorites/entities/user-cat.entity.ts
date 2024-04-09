import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Cat} from "../../cats/entities/cats.entity";
import {User} from "../../auth/entities/user.entity";

@Entity('user_cat')
export class UserCat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  cat_id: string;

  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cat, cat => cat.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cat_id' })
  cat: Cat;
}
