import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstRun1613399286391 implements MigrationInterface {
    name = 'FirstRun1613399286391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying, "content" character varying NOT NULL, "image" character varying, "repliedToId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "googleId" character varying, "twitterId" character varying, "password" character varying, "name" character varying NOT NULL, "nickname" character varying NOT NULL, "email" character varying, "profile" character varying, CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_2cc55db5a0550a220aaff54a5d4" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_36c7dffeba87284690503fc702" ON "post_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_c29a3c5d4b36c73b2902200ecc" ON "post_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_1ff02682065a630c3241f0f1617" FOREIGN KEY ("repliedToId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_closure" ADD CONSTRAINT "FK_36c7dffeba87284690503fc7020" FOREIGN KEY ("id_ancestor") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_closure" ADD CONSTRAINT "FK_c29a3c5d4b36c73b2902200eccd" FOREIGN KEY ("id_descendant") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_closure" DROP CONSTRAINT "FK_c29a3c5d4b36c73b2902200eccd"`);
        await queryRunner.query(`ALTER TABLE "post_closure" DROP CONSTRAINT "FK_36c7dffeba87284690503fc7020"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_1ff02682065a630c3241f0f1617"`);
        await queryRunner.query(`DROP INDEX "IDX_c29a3c5d4b36c73b2902200ecc"`);
        await queryRunner.query(`DROP INDEX "IDX_36c7dffeba87284690503fc702"`);
        await queryRunner.query(`DROP TABLE "post_closure"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
