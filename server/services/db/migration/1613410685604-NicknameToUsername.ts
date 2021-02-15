import {MigrationInterface, QueryRunner} from "typeorm";

export class NicknameToUsername1613410685604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('user', 'nickname', 'username')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('user', 'username', 'nickname')
    }

}
