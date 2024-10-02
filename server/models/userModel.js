const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: 'https://www.bing.com/images/search?view=detailV2&ccid=i%2fbpSvfG&id=6B618C5C8401D226376ABB57A39421CE9CC8D120&thid=OIP.i_bpSvfG5T2Ekf3xGuqQMwHaH_&mediaurl=https%3a%2f%2fcdn3.vectorstock.com%2fi%2f1000x1000%2f30%2f97%2fflat-business-man-user-profile-avatar-icon-vector-4333097.jpg&exph=1080&expw=1000&q=Profile+Image+Icon&simid=608052956370068649&FORM=IRPRST&ck=12CF03518022561467FD72C13C568523&selectedIndex=13&itb=0',
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

const User = new mongoose.model("User", UserSchema);

module.exports = { User };
