import { MigrationInterface, QueryRunner } from "typeorm";

export class correctingCart1654471166895 implements MigrationInterface {
  name = "correctingCart1654471166895";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_91b0c422e2c5187437d4dd29747"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "cartId" TO "newUserId"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME CONSTRAINT "REL_91b0c422e2c5187437d4dd2974" TO "UQ_223a396bd2af6e1c313ec6f055b"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b" FOREIGN KEY ("newUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME CONSTRAINT "UQ_223a396bd2af6e1c313ec6f055b" TO "REL_91b0c422e2c5187437d4dd2974"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "newUserId" TO "cartId"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_91b0c422e2c5187437d4dd29747" FOREIGN KEY ("cartId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
