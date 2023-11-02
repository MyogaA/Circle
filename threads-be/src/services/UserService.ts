import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/User";

export default new class UserService {

    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            
            const user = this.userRepository.create({
                username: data.username,
                full_name: data.full_name,
                email: data.email,
                password: data.password
            });
            const savedUser = await this.userRepository.save(user);
            return res.status(200).json({data:savedUser});
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async find(req: Request, res: Response): Promise<Response> {
        try {
          const user = await this.UserRepository.find({
            relations: ['likes', 'followingToUser','followerToUser']
          })
          return res.status(200).json(user);
        } catch (err) {
          return res.status(500).json({ error: 'Error while getting users' });
        }
      }
      // async findById(req: Request, res: Response) {
      //   try {
      //     const userId = req.userId;
    
      //     const user = await this.UserRepository.findOne({ where: { id: userId } });
      //     if (!user)
      //       return res
      //         .status(404)
      //         .json({ status: "Failed", message: "User didn't exist" });
      //     return res.status(200).json({ message: "pew", user });
      //   } catch (error) {
      //     return res
      //       .status(500)
      //       .json({ message: "Something error on the server!", error });
      //   }
      // }

}
