import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  fullname: string

  @Column()
  @Length(4, 20)
  username: string

  @Column()
  @IsNotEmpty()
  email: string

  @Column()
  @Length(8, 100)
  @IsNotEmpty()
  hashedValue: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
