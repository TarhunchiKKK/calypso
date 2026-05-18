import type { MediaGroup as MediaGroupType } from "@repo/common";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";

@Entity()
export class MediaGroup implements MediaGroupType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column()
    public thumbnail: string;

    @OneToMany(
        () => Media,
        (media) => media.group,
        { onDelete: "CASCADE" }
    )
    public media: Media[];
}
