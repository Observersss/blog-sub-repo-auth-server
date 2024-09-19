import {Request,Response} from "express";
import {UserInterface} from "../types/custom/UserInterface";
import TokenService from "../service/TokenService";
import AuthService from "../service/AuthService";
import jwt from "jsonwebtoken";
import {UserReqInterface} from "../types/custom/UserReqInterface";

class AuthController {
    async registry(req:Request<{},{}, UserReqInterface>,res:Response){
        try{
            const user = req.body;

            // const newUser = await UserService.create(user);

            const newUser:UserInterface= null;


            // res.status(200).json(newUser.rows[0]);
            res.status(200);
        }catch (e:any) {
            switch (e.name){
                case "TypeError":
                    res.status(500).json({name:e.name,message: e.message});
                    break;
                default:
                    res.status(500).json({name:e.name,message: e.message});
            }
        }
    }
    async login(req:Request,res:Response){
        try{
            const {username,password} = req.body;
            const user = await AuthService.login(username,password);

            const [refreshToken,accessToken] = TokenService.generateTokens(user.id,user.username);

            // const userUpdated = await UserService.setRefreshToken(user.id,refresh_token);

            res.status(200).json({
                // user:userUpdated.rows[0],
                refreshToken,
                accessToken
            });
        }catch (e:any) {
            res.status(500).json({name:e.name,message:e.message});
        }
    }
    async refresh(req:Request,res:Response){
        try {
            const {refreshToken} = req.body;

            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

            const accessToken = await AuthService.refresh(refreshToken);

            res.status(200).json({accessToken});
        }catch (e:any){
            if (e.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Refresh token expired, please login again" });
            } else if (e.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            res.status(500).json({message: e.message});
        }
    }

    async activate(req:Request,res:Response){}
    async changeEmail(req:Request,res:Response){}
}

export default new AuthController();