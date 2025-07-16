import prisma from '../../config/database';
const bcrypt = require('bcrypt');

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password: string) => password.length >= 8;


async function createUser(name: string, email: string, password: string, phone: string, type: string) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: hashedPassword,
                phone: phone,
                type: type
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
}

async function userExists(email: string) {
    const userExists = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    });
    if(userExists) return true;
    return false;
}


module.exports = {
    createUser,
    isValidPassword,
    isValidEmail,
    userExists
}