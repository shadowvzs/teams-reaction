import React from 'react';
import { styled } from '@mui/system';
import type { UserStatus } from '../types/core';
import { statusColor } from '../data/dummyData';

interface UserAvatarProps {
    src: string;
    status: UserStatus;
    userName?: string;
    style?: React.CSSProperties;
}

const UserStatusDot = ({ status }: Pick<UserAvatarProps, 'status'>) => {
    return (
        <StatusDotStyled color={statusColor[status]} title={status} />
    );
};

const UserAvatar = ({ userName, src, status, style }: UserAvatarProps) => {

    return (
        <UserAvatarContainerStyled>
            <UserAvatarStyled src={src} title={userName} style={style} />
            <UserStatusDot status={status} />
        </UserAvatarContainerStyled>
    );
};

const UserAvatarStyled = styled('img')({
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer'
});

const UserAvatarContainerStyled = styled('div')({
    position: 'relative'
});

const StatusDotStyled = styled('div')(({ color }: { color: string }) => ({
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderRadius: '50%',
    backgroundColor: color,
    height: 14,
    width: 14,
    border: '2px solid white'
}));

export default UserAvatar;
