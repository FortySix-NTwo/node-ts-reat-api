import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

import { Length, IsNotEmpty, IsEmail } from 'class-validator'

import { IUser } from '../interfaces'

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @Length(4, 20)
  fullname: string

  @Column()
  @IsNotEmpty()
  @Length(4, 20)
  username: string

  @Column()
  @IsEmail()
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

  @Column()
  @DeleteDateColumn()
  deletedAt: Date
}
