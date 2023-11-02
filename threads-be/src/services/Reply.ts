import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { User } from "../entities/User";

export default new class ReplyService {

    private readonly replyRepository: Repository<Reply> = AppDataSource.getRepository(Reply);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const reply = this.replyRepository.create({
                user: data.user,
                content: data.content,

            });

            const savedReply = await this.replyRepository.save(req.body);
            return res.status(200).send(savedReply);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

}
