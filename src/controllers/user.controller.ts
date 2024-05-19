import express from 'express';
import prisma from '../database/db.config';

// create user
export const createUser = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, email, phone } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser) {
        return res.status(400).json({
            message: 'Email already taken please use another email address',
        });
    }
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            phone: phone,
        },
    });
    const serializedUser = {
        ...newUser,
        phone: newUser.phone?.toString(),
        id: newUser.id.toString(),
        created_at: newUser.created_at.toISOString(),
    };
    return res
        .status(201)
        .json({ data: serializedUser, message: 'new user has been created' });
};

// update a user

export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const { name, email, phone } = req.body;
    await prisma.user.update({
        where: {
            id: Number(userId), // convert to the Number
        },
        data: {
            name,
            email,
            phone,
        },
    });
    return res
        .status(201)
        .json({ data: updateUser, message: 'userdata  has been updated' });
};

// get all users

export const getAllUser = async (
    req: express.Request,
    res: express.Response
) => {
    const users = await prisma.user.findMany({});

    const usersWithSerializedBigInt = users.map((user) => ({
        ...user,
        phone: user.phone?.toString(),
    }));

    return res
        .status(200)
        .json({ message: 'All users data ', data: usersWithSerializedBigInt });
};

// find a user

export const findAUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId),
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userWithSerializedBigInt = {
        ...user,
        id: user.id.toString(),
        phone: user.phone ? user.phone.toString() : null,
    };

    return res.status(200).json({ data: userWithSerializedBigInt });
};
//delete a user

export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.id;
    const user = await prisma.user.delete({
        where: {
            id: Number(userId),
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userWithSerializedBigInt = {
        ...user,
        id: user.id.toString(),
        phone: user.phone ? user.phone.toString() : null,
    };
    return res.status(200).json({ message: 'user deleted' });
};
