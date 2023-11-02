import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Like } from "../entities/Like";
import { User } from "../entities/User";

export default new class LikeService {

    private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const like: any = this.likeRepository.create({
                thread: {
                    id: Number(req.params.id),
                },
                user: { 
                    id: data.user_id
                },
                  
            });

            const savedLike = await this.likeRepository.save(like);
            return res.status(200).json({data: savedLike});
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
    async delete(req: Request, res: Response): Promise<Response> {
        try {

            const id = parseInt(req.params.id);
            const thread = await this.likeRepository.findOne({
                where: { id: id },
                relations: ["users"]
            })
            if (!thread) {
                return res.status(404).send("User not found");
            } else {
                const deleteLike = await this.likeRepository.remove(thread)
                return res.status(200).send({
                    Thread: deleteLike,
                    message: "Like deleted"
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)

        }
    }

}
