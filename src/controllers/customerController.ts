import prisma from '../../config/database';
const jwt = require('jsonwebtoken');

async function createCustomer(cpf: string, dataNasc: string, endereco: string, userId: number) {
    try {
        const customer = await prisma.customer.create({
            data: {
                cpf: cpf,
                dataNasc: new Date(dataNasc).toISOString(),
                endereco: endereco,
                userId: userId
            },
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

async function getCustomer(id: number) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                id: id
            }
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

async function getCustomers() {
    try {
        const customers = await prisma.customer.findMany();
        return customers;
    } catch (error) {
        throw error;
    }
}

async function updateCustomer(id: number, cpf: string, dataNasc: string, endereco: string) {
    try {
        const customer = await prisma.customer.update({
            where: {
                id: id
            },
            data: {
                cpf: cpf,
                dataNasc: dataNasc,
                endereco: endereco
            }
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

async function deleteCustomer(id: number) {
    try {
        const customer = await prisma.customer.delete({
            where: {
                id: id
            }
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

async function getSchedulingByUserId(userId: number) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                userId: userId
            }
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

async function getCustomerIdByUserId(userId: number) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                userId: userId
            }
        });
        return customer.id;
    } catch (error) {
        throw error;
    }
}

async function getCustomerByUserId(userId: number) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                userId: userId
            }
        });
        return customer;
    } catch (error) {
        throw error;
    }
}


export default {
    createCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getSchedulingByUserId,
    getCustomerIdByUserId,
    getCustomerByUserId
}