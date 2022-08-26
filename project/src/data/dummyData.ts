import { observable } from "mobx";
import type { IMessage, IUser } from "../types/core";

export const statusColor = {
    online: 'green',
    offline: 'red'
};

function createMap<T extends { id: string }>(items: T[], isObservable?: boolean): T[] & { valueMap: Record<string, T> } {
    const array = isObservable ? items.map(x => observable(x)) : [...items];

    return Object.assign(array, {
        valueMap: array.reduce((t, c) => {
            t[c.id] = c;
            return t;
        }, {} as Record<string, T>)
    })
}

export const users = createMap<IUser>([
    {
        id: '1000',
        fullName: 'Kis Pista',
        email: 'kis.pista@gmail.com',
        status: 'online',
        avatarUrl: `https://picsum.photos/200/300?random=${Math.round(Math.random() * 100)}`
    },
    {
        id: '2000',
        fullName: 'Gyurka Hurka',
        email: 'gyurka.hurka@gmail.com',
        status: 'offline',
        avatarUrl: `https://picsum.photos/200/300?random=${Math.round(Math.random() * 100)}`
    },
    {
        id: '3000',
        fullName: 'Hanta Bandi',
        email: 'hanta.bandi@gmail.com',
        status: 'online',
        avatarUrl: `https://picsum.photos/200/300?random=${Math.round(Math.random() * 100)}`
    },
]);


export const messages = createMap<IMessage>([
    {
        id: '1',
        conversationId: '1',
        text: 'Hello, are you here?',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        createBy: '1000',
        reactions: {},
    },
    {
        id: '2',
        conversationId: '1',
        text: 'Yes, how can I help you?',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        createBy: '2000',
        reactions: {
            '2000': 'surprised'
        },
    },
    {
        id: '3',
        conversationId: '1',
        text: 'Do you have time for a call?',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        createBy: '1000',
        reactions: {
            '2000': 'like',
            '3000': 'like'
        },
    }
], true);

export const USER = users[0];