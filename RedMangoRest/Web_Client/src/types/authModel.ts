export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    token: string;
}

/*{
  "username": "per@mail.com",
  "password": "12345a"
} */