import {Pool} from "pg"

export const pool = new Pool({
    user:'root',
    password:'root',
    host:'localhost',
    port:5432,
    database:'db',
})