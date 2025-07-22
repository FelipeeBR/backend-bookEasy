import prisma from '../../config/database';
const jwt = require('jsonwebtoken');

async function createScheduling(serviceId: number, status: string, timeId: number, customerId: number) {
    try {
        const scheduling = await prisma.scheduling.create({
            data: {
                date: new Date().toISOString(),
                status: status,
                serviceId: serviceId,
                timeId: timeId,
                customerId: customerId,
            }
        });
        await prisma.time.update({
            where: { id: timeId },
            data: { isBusy: true }
        });
        return scheduling;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteScheduling(id: number) {
    try {
        const scheduling = await prisma.scheduling.delete({
            where: {
                id: id
            }
        });
        return scheduling;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getScheduling(costumerId: number) {
    try {
        const scheduling = await prisma.scheduling.findMany({
            where: {
                customerId: costumerId
            }
        });
        return scheduling;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createScheduling,
    deleteScheduling,
    getScheduling   
}