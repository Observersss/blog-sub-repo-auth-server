export interface CustomUserInterface {
    id?:number | null,
    username:string,
    password:string,
    email:string,
    isActivated:string |false;
    refreshToken:string | null;
}

export interface CustomUserRequestInterface {
    username:string,
    password:string,
    email:string,
}