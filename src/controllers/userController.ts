import prisma from '../../config/database';
import bcrypt from 'bcrypt';

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

async function deleteUser(email: string) {
    try {
        const user = await prisma.user.delete({
            where: {
                email: email.toLowerCase()
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });
        return user;
    } catch (error) {
        return false;
    }
}

async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        return false;
    }
}


export default {
    createUser,
    userExists,
    isValidEmail,
    isValidPassword,
    deleteUser,
    getUser,
    getUsers
}