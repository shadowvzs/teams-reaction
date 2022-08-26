import React from 'react';
import { Grid, styled, Typography } from '@mui/material';
import clsx from 'clsx';

import AnimatedIcon from '.';

import { HoverPopover } from '../common/HoverPopover';
import UserAvatar from '../common/UserAvatar';
import { users } from '../data/dummyData';
import type { ReactionTypes } from '../types/core';

interface MessageReactionProps {
    myReactionId?: string;
    reactionId: ReactionTypes;
    userIds: string[];
    onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

const UserReaction = ({ userId }: { userId: string; }) => {

    const user = users.valueMap[userId];

    return (
        <Grid container alignItems='center' spacing={1}>
            <Grid item>
                <UserAvatar
                    src={user.avatarUrl!}
                    status={user.status!}
                    userName={user.fullName}
                    style={{ height: 24, width: 24, marginRight: 4 }}
                />
            </Grid>
            <Grid item>
                <Typography variant='body2' children={user.fullName} />
            </Grid>
        </Grid>
    );
};

const UserPopover = ({ userIds, reactionId }: Pick<MessageReactionProps, 'userIds' | 'reactionId'>) => {
    return (
        <UserList>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Grid container alignItems={'center'}>
                        <Grid item>
                            <AnimatedIcon iconData={reactionId} size={18} />
                        </Grid>
                        <Grid item>
                            <Typography variant='body2' children={reactionId} style={{ marginLeft: 4 }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {userIds.map(x => <UserReaction userId={x} key={x} />)}
                </Grid>
            </Grid>
        </UserList>
    );
};


export const MessageReactionItem = (props: MessageReactionProps) => {
    const { reactionId, userIds, myReactionId, onClick } = props;
    return (
        <HoverPopover direction='bottom' cmp={<UserPopover userIds={userIds} reactionId={reactionId} />}>
            <ReactionItem>
                <AnimatedIcon iconData={reactionId} size={18} onClick={onClick} frameCount={0} data-id={myReactionId} />
                <Typography className={clsx('reaction-counter', myReactionId && 'selected')} children={userIds.length} />
            </ReactionItem>
        </HoverPopover>
    );
};

const ReactionItem = styled('li')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 4,
    cursor: 'pointer',
    padding: 0,
    listStyle: 'none',
    '& .reaction-counter': {
        marginLeft: 4,
        color: '#242424',
        fontSize: 12,
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Web",sans-serif',
        fontWeight: 400,
        '&.selected': {
            color: '#5b5fc7',
            fontWeight: 700,
        }
    },
    '&:hover .reaction-counter:not(.selected)': {
        color: '#424242',
        textShadow: '0 0 1px #424242'
    }
}));

const UserList = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    minWidth: 200,
    flexBasis: 200,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 3px 3px rgba(0,0,0,0.05)',
    borderRadius: 4
}));