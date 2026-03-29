const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const UserService = {
    register: async (userData) => {     
        const email = await User.findOne({where: {email: userData.email}});
        if(email){
            throw new Error("Email đã tồn tại!")
        }
        const hashPassword = await bcrypt.hash(userData.password, 10)
        const newUser = {
            username: userData.username,
            email: userData.email,
            password: hashPassword
        };
        await User.create(newUser);
        return{
            message: "Đăng kí thành công!"
        };
    },

    login: async (email, password) => {
        if(!email || !password){
            throw new Error("Email và Password là bắt buộc!")
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