import { Request, Response } from "express"
import LikeService from "../services/LikeService"


export default new class LikeController{
    create(req: Request, res: Response) {
        LikeService.create(req, res)
        console.log(req);
        
    }
    delete(req: Request, res: Response) {
        LikeService.delete(req, res)
        console.log(req);
        
    }

}