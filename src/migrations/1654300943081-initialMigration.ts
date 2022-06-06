import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";

import * as dotenv from "dotenv";

dotenv.config();

export class initialMigration1654300943081 implements MigrationInterface {
  name = "initialMigration1654300943081";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid, CONSTRAINT "REL_d1e620c0f75aa0d8341f2c768a" UNIQUE ("stockId"), CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "cartId" uuid, CONSTRAINT "REL_91b0c422e2c5187437d4dd2974" UNIQUE ("cartId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cart_dvds_dvds" ("cartId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_4b8ad07f60482adcf25346f5f4b" PRIMARY KEY ("cartId", "dvdsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67f28f9f6c3ba2fd86118048fc" ON "cart_dvds_dvds" ("cartId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e5b5356c9db1290e341dfddfb9" ON "cart_dvds_dvds" ("dvdsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_91b0c422e2c5187437d4dd29747" FOREIGN KEY ("cartId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `
        INSERT INTO "users" ("name", "email", "password", "isAdm")
        VALUES ('${process.env.ADMIN_NAME}', '${
        process.env.ADMIN_EMAIL
      }', '${hashSync(process.env.ADMIN_PASSWORD, 10)}', true)
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_91b0c422e2c5187437d4dd29747"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e5b5356c9db1290e341dfddfb9"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_67f28f9f6c3ba2fd86118048fc"`
    );
    await queryRunner.query(`DROP TABLE "cart_dvds_dvds"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "dvds"`);
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
