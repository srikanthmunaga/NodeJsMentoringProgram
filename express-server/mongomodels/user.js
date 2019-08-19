import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        return /^.+@.+\..+$/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        return /^\S{6,24}$/.test(value);
      },
      message: props => `${props.value} is not a valid password!`
    }
  },
  lastModifiedDate: Date
});

UserSchema.pre("save", function() {
  this["lastModifiedDate"] = new Date();
});

export const User = model("User", UserSchema);
