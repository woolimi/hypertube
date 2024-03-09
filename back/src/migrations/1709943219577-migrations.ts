import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709943219577 implements MigrationInterface {
    name = 'Migrations1709943219577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movieswatched\` (\`movie_id\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`watchedAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_dc3d3d4303f3f45f4bfe6d154e\` (\`movie_id\`, \`user_id\`), PRIMARY KEY (\`movie_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL, \`watchedAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(300) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`user_id\` varchar(36) NULL, \`movie_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL DEFAULT '', \`username\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL DEFAULT '', \`password\` varchar(255) NOT NULL DEFAULT '', \`image\` varchar(255) NOT NULL DEFAULT '', \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`refreshToken\` varchar(255) NOT NULL DEFAULT '', \`provider\` varchar(255) NOT NULL DEFAULT 'local', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movieswatched\` ADD CONSTRAINT \`FK_1a008d30273c3ec2f2eeea032f1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movieswatched\` ADD CONSTRAINT \`FK_9c4a09008ec2390fd1295df87a7\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_78bb58aecbc0e3e21ee5b81cd9a\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_78bb58aecbc0e3e21ee5b81cd9a\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``);
        await queryRunner.query(`ALTER TABLE \`movieswatched\` DROP FOREIGN KEY \`FK_9c4a09008ec2390fd1295df87a7\``);
        await queryRunner.query(`ALTER TABLE \`movieswatched\` DROP FOREIGN KEY \`FK_1a008d30273c3ec2f2eeea032f1\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc3d3d4303f3f45f4bfe6d154e\` ON \`movieswatched\``);
        await queryRunner.query(`DROP TABLE \`movieswatched\``);
    }

}
