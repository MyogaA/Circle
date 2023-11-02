import { Request, Response } from "express"
import UserService from "../services/UserService"


export default new class UserController{
    create(req: Request, res: Response) {
        UserService.create(req, res)
        console.log(req);
        
    }
    find(req: Request, res: Response) {
        UserService.find(req, res)
        console.log(req);
        
    }
    // findById(req: Request, res: Response) {
    //     UserService.findById(req, res)
    //     console.log(req);
    //   }
    

}