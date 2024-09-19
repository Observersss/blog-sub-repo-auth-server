import jwt from "jsonwebtoken"
class TokenService {
    generateTokens (id:number,username:string) {
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined")
        }

        const refreshToken= jwt.sign(
            {
                id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:'7d'
            }
        )
        const accessToken= jwt.sign(
            {
                id,
                username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:"1h"
            }
        )
        return [refreshToken,accessToken];
    }

}

export default new TokenService();