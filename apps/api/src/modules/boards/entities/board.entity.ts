import type { Board } from "@repo/common";
import { BaseEntity } from "src/shared/db";
import { Column, Entity } from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity implements Board {
    @Column()
    public title: string;
}
