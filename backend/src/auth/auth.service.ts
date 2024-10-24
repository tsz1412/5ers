import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && await user.comparePassword(password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}