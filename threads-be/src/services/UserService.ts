import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { error } from 'console';
import { createUserSchema } from '../utils/valid';
import { User } from '../entities/User';
export default new (class UserService {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.find({
        relations: ['following', 'followers'],
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Error while getting users' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) {
        return res.status(400).json({ Error: error.details[0].message });
      }
      const users = await this.UserRepository.create({
        username: value.username,
        full_name: value.full_name,
        email: value.email,
        password: value.password,
        // photo_profile: value.photo_profile,
        // bio: value.bio,
      })

      const createUser = await this.UserRepository.save(users);
      res.status(200).json(createUser);
    } catch (err) {
      console.log(error);
      return res.status(500).json({ error: 'Error while creating users' });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = res.locals.logingSession;
      const user = await this.UserRepository.findOne({
        relations: ['following', 'followers'],
        where: { id: id },
      });
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Error while finding user' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user = await this.UserRepository.findOne({
        where: { id: id },
      });
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      user.username = value.username;
      user.full_name = value.full_name;
      user.email = value.email;
      user.password = value.password;
      // user.photo_profile = value.photo_profile;
      user.bio = value.bio;

      const update = await this.UserRepository.save(user);

      res.status(200).json(update);
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating user' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user = await this.UserRepository.findOne({
        where: { id: id },
      });
      if (!user) return res.status(404).json({ Error: 'User ID not found' });

      const response = await this.UserRepository.delete({ id: id });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: 'Error while deleting user' });
    }
  }

  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      const followingId = Number(req.body.followingId);

      const follower = await this.UserRepository.findOne({
        where: { id: loginSession.user.id },
        relations: ['following'],
      });
      console.log(loginSession);
      
      const following = await this.UserRepository.findOne({
        where: { id: followingId },
      });

      if (!follower || !following) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isFollowing = follower.following.some((user) => user.id === following.id);

      if (isFollowing) {
        follower.following = follower.following.filter((user) => user.id !== following.id);
      } else {
        follower.following.push(following);
      }

      await this.UserRepository.save(follower);

      return res.status(200).json(follower);
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ error: 'Error while following/unfollowing user' });
    }
  }
})();