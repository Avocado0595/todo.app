
export interface UserAuth{
    username: string;
    password: string;
}

export interface UserSignUp extends UserAuth{
    email: string;
    confirmpassword: string;
}
