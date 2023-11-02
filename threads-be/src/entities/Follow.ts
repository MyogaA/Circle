import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> User,(user) => user.followingToUser,{
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn( {name: "following_id"})
  followingToUser : User

  @ManyToOne(()=> User,(user) => user.followerToUser,{
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn( {name: "follower_id"})
  followerToUser : User
}
