import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import { Thread } from "./Threads"
import { Like } from "./Like"
import { Reply } from "./Reply"
import { Follow } from "./Follow"

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    full_name: string

    @Column()
    email: string

    @Column({select: false})
    password: string

    @Column({nullable: true})
    profile_picture: string

    @Column({nullable:true})
    profile_description: string

    @OneToMany(() => Thread,(thread) => thread.users)
    threads: Thread[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Reply, (reply) => reply.user)
    reply: Reply[]; 
    
    @OneToMany(() => Follow, (follow) => follow.followingToUser,{
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    followingToUser: Follow[]; 

    @OneToMany(() => Follow, (follow) => follow.followerToUser,{
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    followerToUser: Follow[]; 
}
