import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Function to seed users into the database
  async seedUsers() {
    const users = [
      {
        username: 'israel_israeli',
        password: await this.hashPassword('password123'),
        stocks: ['AAPL', 'GOOG'],
      },
      {
        username: 'eli_cohen',
        password: await this.hashPassword('securePass'),
        stocks: ['TSLA', 'MSFT'],
      },
    ];

    // Clear the existing users collection (optional)
    await this.userModel.deleteMany();

    // Insert new users
    return this.userModel.insertMany(users);
  }

  // Helper function to hash the password
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
