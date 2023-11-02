import { Request, Response } from "express"
import FollowerService from "../services/FollowerService"


export default new class FollowController{
    create(req: Request, res: Response) {
        FollowerService.create(req, res)
        
    }
    

}