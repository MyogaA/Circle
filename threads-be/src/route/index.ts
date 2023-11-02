import * as express from "express"
import ThreadController from "../controllers/ThreadController"
import UserController from "../controllers/UserController"
import LikeController from "../controllers/LikeController"
import ReplyController from "../controllers/ReplyController"
import FollowerController from "../controllers/FollowerController"
import FollowingController from "../controllers/FollowingController"
import AuthControllers from "../controllers/AuthController"
import AuthenticationMiddlewares from "../middlewares/Auth"
const router = express.Router()
const { storage } = require('../claudinary/Claudinary');
const multer = require('multer');
const upload = multer({ storage });

router.get("/threads", ThreadController.find)
router.post("/thread",AuthenticationMiddlewares.Authentication,upload.single('image'), ThreadController.create)
router.get("/thread/:id", ThreadController.findOne) 
router.patch("/thread/:id", ThreadController.update)
router.delete("/thread/:id", ThreadController.delete)



router.post("/user", UserController.create);
router.get("/users", UserController.find)
// router.get("/users", UserController.findById)

router.post("/like/:id", LikeController.create);
router.delete("/like/:id", LikeController.delete);
router.post("/follower", AuthenticationMiddlewares.Authentication, FollowerController.create);
router.post("/following", AuthenticationMiddlewares.Authentication,FollowingController.create);

router.post("/reply", ReplyController.create);


// AUTH
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login",AuthControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, AuthControllers.check)


export default router   