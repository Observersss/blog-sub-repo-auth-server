import {pool} from "../config/db";
import bcrypt from "bcrypt";
import {UserInterface} from "../types/custom/UserInterface";
class AuthService {
    async registry (user){}
    async login (username:string,password:string){
        const query = "SELECT * FROM Users WHERE username = $1";
        const values = [username];

        const user = await pool.query(query,values);

        if(!user.rows[0]){
            throw new Error("Invalid username")
        }

        const isMath = await bcrypt.compare(password,user.rows[0].password);
        if (!isMath){
            throw new Error("Invalid username or password")
        }

        return user.rows[0] as UserInterface;
    }
    async refresh (refresh_token){}
    async activate (){}
    async changeEmail (){}
}

export default new AuthService();