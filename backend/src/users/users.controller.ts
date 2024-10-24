import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt')) // Protect this endpoint
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt')) // Protect this endpoint
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }


  @UseGuards(AuthGuard('jwt')) // Protect this endpoint
  @Put('stocks')
  async updateUserStocks(@Req() request: Request, @Body() body: { stocks: string[] }) {
    const userId = request.user['_id']; // Get the user ID from the request
    return this.usersService.updateStocks(userId, body.stocks);
  }

  @UseGuards(AuthGuard('jwt')) // Protect this endpoint
  @Get('me')
  async getCurrentUser(@Req() request: Request) {
    const userId = request.user['_id']; // Get the user ID from the request
    return this.usersService.findById(userId);
  }

}
