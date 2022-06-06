import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float" })
  price: number;
}
