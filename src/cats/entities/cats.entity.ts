import {
  Column,

  Entity,

  PrimaryGeneratedColumn
} from 'typeorm';


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
}
