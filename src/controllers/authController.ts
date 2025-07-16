import prisma from '../../config/database';
import dotenv from "dotenv";
const { compare } = require("bcrypt"); 
const { signToken } = require("../middlewares/auth");
dotenv.config();

async function authenticate(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    });
    if(!user) return false;
    
    if(!(await compare(password, user.password))) {
        return false;
    }
    
    try {
        const token = await signToken({id: user.id, email: user.email}, process.env.JWT_TOKEN, {expiresIn: "1d"});
        return token;
    } catch (error) {
        return false;
    }
}

module.exports = {
    authenticate
}
