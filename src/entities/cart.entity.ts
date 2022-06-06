import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Dvd } from "./dvd.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "boolean", default: false })
  paid: boolean;

  @Column({ type: "float" })
  total: number;

  @OneToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  newUser: User;

  @ManyToMany(() => Dvd, {
    eager: true,
  })
  @JoinTable()
  dvd: Dvd;
}
