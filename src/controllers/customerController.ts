import prisma from '../../config/database';

async function createCustomer(cpf: string, dataNasc: string, endereco: string, userId: string) {
    try {
        const customer = await prisma.customer.create({
            data: {
                cpf: cpf,
                dataNasc: dataNasc,
                endereco: endereco,
                userId: parseInt(userId)
            },
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

export default {
    createCustomer
}