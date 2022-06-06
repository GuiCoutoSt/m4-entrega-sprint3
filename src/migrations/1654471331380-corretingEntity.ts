import { MigrationInterface, QueryRunner } from "typeorm";

export class corretingEntity1654471331380 implements MigrationInterface {
    name = 'corretingEntity1654471331380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_dvd_dvds" ("cartId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_09aae92cdf55e09270cf357019e" PRIMARY KEY ("cartId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b205508e9623f97939f96cc78" ON "cart_dvd_dvds" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7a74eaba83f3e4f732ee3c69a" ON "cart_dvd_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" ADD CONSTRAINT "FK_8b205508e9623f97939f96cc784" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" ADD CONSTRAINT "FK_e7a74eaba83f3e4f732ee3c69a7" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" DROP CONSTRAINT "FK_e7a74eaba83f3e4f732ee3c69a7"`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" DROP CONSTRAINT "FK_8b205508e9623f97939f96cc784"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7a74eaba83f3e4f732ee3c69a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b205508e9623f97939f96cc78"`);
        await queryRunner.query(`DROP TABLE "cart_dvd_dvds"`);
    }

}
