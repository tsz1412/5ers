import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service'; // Make sure this service exists
import { UsersController } from './users.controller'; // Make sure this controller exists
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User model
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [MongooseModule, UsersService], // Export MongooseModule and UsersService
})
export class UsersModule {}