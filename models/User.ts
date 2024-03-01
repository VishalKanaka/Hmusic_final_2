import { Schema, model, Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default model<UserDocument>('User', UserSchema);
