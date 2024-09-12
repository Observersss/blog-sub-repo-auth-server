import jwt from "jsonwebtoken"
class TokenService {
    generateAccessToken (id:number,username:string) {
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined")
        }

        return jwt.sign(
            {
                id,
                username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:"1h"
            }
        )
    }

    generateRefreshToken (id:number)  {
        if(!process.env.REFRESH_TOKEN_SECRET){
            throw new Error("REFRESH_TOKEN_SECRET is not defined");
        }
        return jwt.sign(
            {
                id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:'7d'
            }
        )
    }
}

export default new TokenService();