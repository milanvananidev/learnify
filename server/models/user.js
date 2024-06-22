import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide user first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide user last name']
    },
    userName: {
        type: String,
        required: [true, 'Please provide user name'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
}, { timestamps: true });

// To hash password
schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// To compare password
schema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Sign access token
schema.methods.signAccessToken = async function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET)
}

export default mongoose.model("user", schema);