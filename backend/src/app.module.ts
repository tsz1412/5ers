import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load0 environment variables
    MongooseModule.forRoot(process.env.MONGO_URI), // MongoDB connection using the MONGO_URI from .env
    SeederModule, // Seeder module for populating the database
    AuthModule, // Import AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
