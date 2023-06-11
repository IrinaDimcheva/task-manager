import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUserAttrs {
  name: string;
  email: string;
  password: string;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

interface IUserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (pass: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, 'Name should be at least 4 characters'],
    maxlength: [20, 'Name shouldn\'t exceed 20 characters'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: props => `${props.value} must contains only latin letters and digits!`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters'],
    maxlength: [35, 'Password shouldn\'t exceed 35 characters'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: props => `${props.value} must contains only latin letters and digits!`
    }
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre<IUserDoc>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User, IUserModel };
