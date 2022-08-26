import React from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { format, isSameDay } from 'date-fns';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

import type { IMessage, ReactionTypes } from '../types/core';
import { USER, users } from '../data/dummyData';
import UserAvatar from '../common/UserAvatar';
import { SmileyListPopover } from '../AnimatedIcon/SmileyListPopover';
import { MessageReactionList } from '../AnimatedIcon/MessageReactionList';

interface ChatBubbleProps {
    message: IMessage;
    onSetReaction: (reaction: ReactionTypes) => void;
}

const OtherUserBubble = observer(({ message, onSetReaction }: ChatBubbleProps) => {
    const commonProps = {
        currentUserId: USER.id,
        reactions: message.reactions,
        isDeleted: message.isDeleted,
        onSetReaction: onSetReaction
    };
    const sender = users.valueMap[message.createBy];

    return (
        <Grid container spacing={1}>
            <Grid item>
                <UserAvatar
                    src={sender.avatarUrl!}
                    status={sender.status!}
                    userName={sender.fullName}
                />
            </Grid>
            <Grid item>
                <ChatBubbleStyled style={{ justifyContent: 'flex-start' }}>
                    <SmileyListPopover {...commonProps}>
                        <HeaderStyled>
                            <AuthorStyled>
                                {sender.fullName}
                            </AuthorStyled>
                            <div style={{ paddingRight: 8 }}>
                                {!message.isDeleted && <MessageReactionList {...commonProps} />}
                            </div>
                            <DateStyled>
                                {format(message.createdAt, isSameDay(message.createdAt, Date.now()) ? 'p' : 'Pp')}
                            </DateStyled>
                        </HeaderStyled>
                    </SmileyListPopover>
                    <ContentStyled>
                        {message.text}
                    </ContentStyled>
                </ChatBubbleStyled>
            </Grid>
        </Grid>
    );
});

const MyBubble = observer(({ message, onSetReaction }: ChatBubbleProps) => {
    const commonProps = {
        currentUserId: USER.id,
        reactions: message.reactions,
        isDeleted: message.isDeleted,
        onSetReaction: onSetReaction
    };

    return (
        <ChatBubbleStyled style={{ backgroundColor: 'rgb(232, 235, 250)', marginLeft: 'auto' }}>
            <SmileyListPopover {...commonProps} >
                <HeaderStyled style={{ justifyContent: 'flex-start' }}>
                    <div style={{ paddingRight: 8 }}>
                        {!message.isDeleted && <MessageReactionList {...commonProps} />}
                    </div>
                    <DateStyled>
                        {format(message.createdAt, 'p')}
                    </DateStyled>
                </HeaderStyled>
            </SmileyListPopover>
            <ContentStyled>
                {message.text}
            </ContentStyled>
        </ChatBubbleStyled>
    );
});

export const ChatBubble = observer(({ message }: Omit<ChatBubbleProps, 'onSetReaction'>) => {
    const Cmp = USER.id === message.createBy ? MyBubble : OtherUserBubble;

    const onSetReaction = React.useCallback((reactionId: ReactionTypes) => {
        // because reaction is observable we need set data inside the runInAction
        runInAction(() => {
            const reactions = { ...message.reactions };
            if (message.reactions[USER.id] === reactionId) {
                Reflect.deleteProperty(reactions, USER.id);
                message.reactions = reactions;
            } else {
                message.reactions = { ...reactions, [USER.id]: reactionId };
            }
            console.log(message.reactions)
        });
    }, [message]);

    return (
        <Cmp message={message} onSetReaction={onSetReaction} />
    );
});

const ChatBubbleStyled = styled('section')({
    display: 'inline-block',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: '8px 16px 10px 16px',
    marginBottom: 16,
});

const HeaderStyled = styled('header')({
    display: 'flex',
    color: 'rgb(36, 36, 36)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
});

const AuthorStyled = styled('div')({
    fontWeight: 600,
    fontSize: 12,
    marginRight: 32
});

const DateStyled = styled('time')({
    color: 'rgb(97, 97, 97)',
    fontSize: 12
});

const ContentStyled = styled('main')({
    color: 'rgb(36, 36, 36)',
    fontSize: 14
});

export default ChatBubble;
