import { Schema, model } from "mongoose";
export interface IUser{
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    isAdmin: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals:true,
        }
    }
    
)

export const UserModel = model<IUser>('user', UserSchema);

