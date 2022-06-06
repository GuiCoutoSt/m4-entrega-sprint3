import { MigrationInterface, QueryRunner } from "typeorm";

export class final1654478704494 implements MigrationInterface {
    name = 'final1654478704494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "newUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_223a396bd2af6e1c313ec6f055b" UNIQUE ("newUserId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b" FOREIGN KEY ("newUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_223a396bd2af6e1c313ec6f055b"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "newUserId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
