import {Router} from "express";
import AuthController from "../controller/AuthController";

const AuthRouter = Router();

AuthRouter.post('/registry',AuthController.registry);
AuthRouter.post('/login',AuthController.login);
AuthRouter.post('/refresh',AuthController.refresh);
AuthRouter.post('/activate',AuthController.activate);
AuthRouter.post('/changeEmail',AuthController.changeEmail);

export default AuthRouter;