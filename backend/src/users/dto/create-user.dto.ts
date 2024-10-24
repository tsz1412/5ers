export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly stocks?: string[]; // Optional at the time of user creation
}
  