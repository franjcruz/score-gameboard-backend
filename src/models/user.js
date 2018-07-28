import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import mongoosePaginate from 'mongoose-paginate';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: { type: String, required: true },
  role: ['admin', 'user'],
  entryDate: { type: Date, default: Date.now },
  active: Boolean
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = candidatePassword => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return err;
    }

    return isMatch;
  });
};

export default mongoose.model('user', userSchema);
