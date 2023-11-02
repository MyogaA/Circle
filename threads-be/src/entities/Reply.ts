import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Thread } from './Threads';


@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.reply)
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.reply)
  thread: Thread;
}
