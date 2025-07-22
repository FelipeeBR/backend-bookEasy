import prisma from '../../config/database';

async function createService(name: string, duration: number, price: number, description: string, employeeId: number) {
    try {
        const service = await prisma.service.create({
            data: {
                name: name,
                duration: duration,
                price: price,
                description: description,
                employeeId: employeeId
            },
        });
        return service;
    } catch (error) {
        throw error;
    }
}

async function createServiceTime(startTime: string, serviceId: number) {
    try {
        const time = await prisma.time.create({
            data: {
                startTime: startTime,
                serviceId: serviceId
            },
        });
        return time;
    } catch (error) {
        throw error;
    }
}

async function getService(id: number) {
    try {
        const service = await prisma.service.findUnique({
            where: {
                id: id
            },
            include: {
                time: true
            }
        });
        return service;
    } catch (error) {
        throw error;
    }
}

async function getServices() {
    try {
        const services = await prisma.service.findMany({
            include: {
                time: true
            }
        });
        return services;
    } catch (error) {
        throw error;
    }
}

export default {
    createService,
    createServiceTime,
    getService,
    getServices
}