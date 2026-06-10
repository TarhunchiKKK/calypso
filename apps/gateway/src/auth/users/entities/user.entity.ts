import type { Profile } from "@lib/auth";
import type { Id } from "@lib/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements Profile {
    @PrimaryGeneratedColumn("uuid")
    public id: Id;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column({ default: false })
    public emailVerified: boolean;

    @Column()
    public password: string;

    @Column({ nullable: true, default: null })
    public avatar?: string;
}
