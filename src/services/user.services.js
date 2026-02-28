const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const UserService = {
    register: async (userData) => {
        const existingUser = await UserModel.findByEmail(userData.email)
        if(existingUser){
            throw new Error("Email đã tồn tại!")
        }
        
        const hashPassword = await bcrypt.hash(userData.password, 10)
        const newUser = {
            username: userData.username,
            email: userData.email,
            password: hashPassword
        };
        await UserModel.create(newUser);
        return{
            message: "Đăng kí thành công!"
        };
    },

    login: async (email, password) => {
        if(!email || !password){
            throw new Error("Email và Password là bắt buộc!")
        }

        const user = await UserModel.findByEmail(email)
        if(!user){
            throw new Error("Email không tồn tại!")
        }

        const passwordUser = await bcrypt.compare(password, user.password)
        if(!passwordUser){
            throw new Error("Sai mật khẩu!")
        }

        const token = jwt.sign(
            {user_id: user.id},
            JWT_SECRET,
            {expiresIn: "1d"}
        )

        return {
            message: "Đăng nhập thành công!",
            token
        };
    }
}
module.exports = UserService;