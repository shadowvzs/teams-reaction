export type ReactionTypes = 'angry' | 'sad' | 'surprised' | 'laugh' | 'like' | 'heart';
export type UserStatus = 'online' | 'offline';

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    status?: UserStatus;
    avatarUrl?: string;
}

export interface IMessage {
    createBy: string;
    createdAt: Date;
    conversationId: string;
    id: string;
    isDeleted?: boolean;
    reactions: Record<string, ReactionTypes>;
    text: string;
}
