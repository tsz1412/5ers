import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [UsersModule], // Import UsersModule here
  providers: [SeederService],
  exports: [SeederService], // Optional: if you need to use SeederService in other modules
})
export class SeederModule {}
