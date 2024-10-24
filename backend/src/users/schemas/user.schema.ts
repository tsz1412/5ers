import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], default: [] })
    stocks: string[]; // Stock symbols that user holds

    comparePassword: (candidatePassword: string) => Promise<boolean>;

}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware for hashing password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add the comparePassword method to the schema's methods object
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};