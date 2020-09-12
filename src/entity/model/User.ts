import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'

import { Length, IsNotEmpty, IsEmail } from 'class-validator'

import { hashValue } from '../../utils'
import { IUser } from '../dto'

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @Length(8, 20)
  fullname: string

  @Column()
  @IsNotEmpty()
  @Length(6, 20)
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

  @BeforeInsert()
  @BeforeUpdate()
  async hash() {
    this.hashedValue = await hashValue(10, this.hashedValue)
  }
}
