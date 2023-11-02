import { Request, Response } from "express"
import ReplyService from "../services/Reply"


export default new class ReplyController{
    create(req: Request, res: Response) {
        ReplyService.create(req, res)
        console.log(req);
        
    }

}