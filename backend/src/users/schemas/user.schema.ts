import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: [String],
        default: [],
        validate: {
            validator: function(value: string[]) {
                // Check for duplicate entries in the array
                return Array.isArray(value) && new Set(value).size === value.length;
            },
            message: 'Each stock symbol must be unique',
        },
    })
    stocks: string[]; // Stock symbols that user holds

    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware for hashing password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Add the comparePassword method to the schema's methods object
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save hook to ensure uniqueness of stocks before saving
UserSchema.pre('save', function (next) {
    this.stocks = [...new Set(this.stocks)]; // Remove duplicates before saving
    next();
});
