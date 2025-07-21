import prisma from '../../config/database';

async function createEmployee(specialization: string, userId: string) {
    try {
        const employee = await prisma.employee.create({
            data: {
                specialization: specialization,
                userId: parseInt(userId)
            },
        });
        return employee;
    } catch (error) {
        throw error;
    }
}

async function getEmployee(id: number) {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });
        return employee;
    } catch (error) {
        throw error;
    }
}

async function getEmployees() {
    try {
        const employees = await prisma.employee.findMany();
        return employees;
    } catch (error) {
        throw error;
    }
}

async function updateEmployee(id: number, specialization: string) {
    try {
        const employee = await prisma.employee.update({
            where: {
                id: id
            },
            data: {
                specialization: specialization
            }
        });
        return employee;
    } catch (error) {
        throw error;
    }
}

async function deleteEmployee(id: number) {
    try {
        const employee = await prisma.employee.delete({
            where: {
                id: id
            }
        });
        return employee;
    } catch (error) {
        throw error;
    }
}

export default {
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
}