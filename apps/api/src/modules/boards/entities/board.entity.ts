import { BaseEntity } from "src/shared/db";
import { Column, Entity } from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @Column()
    public title: string;

    @Column()
    public creatorId: string;
}
