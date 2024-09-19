export interface UserInterface {
    id?:number | null,
    username:string,
    password:string,
    email:string,
    isActivated:string |false;
    refreshToken:string | null;
}