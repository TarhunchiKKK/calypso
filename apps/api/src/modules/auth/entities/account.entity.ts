import { BoardEntity } from "src/modules/boards/entities/board.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryColumn()
    public username: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdAt: Date;

    @OneToMany(
        () => BoardEntity,
        board => board.creator
    )
    public boards: BoardEntity[];

    @BeforeInsert()
    protected async hashPassword() {
        this.password = await Bun.password.hash(this.password);
    }
}
