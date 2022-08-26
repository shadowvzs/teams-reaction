import React from 'react';
import { styled } from '@mui/material';

import { MessageReactionItem } from './MessageReactionItem';
import type { ReactionTypes } from '../types/core';
import { observer } from 'mobx-react-lite';

interface MessageReactionListProps {
    currentUserId: string;
    reactions: Record<string, ReactionTypes>;
    onSetReaction?: (reaction: ReactionTypes) => void;
}

const getReactionGroups = (reactions: Record<string, string>): Record<ReactionTypes, string[]> => {
    const reactionMap = Object.entries(reactions).reduce((obj, data) => {
        const [userId, reaction] = data as unknown as [string, ReactionTypes];
        if (!obj[reaction]) { obj[reaction] = []; }
        obj[reaction].push(userId);
        return obj;
    }, {} as Record<ReactionTypes, string[]>);
    return reactionMap;
};

export const MessageReactionList = observer((props: MessageReactionListProps) => {
    const { currentUserId, reactions, onSetReaction } = props;
    const reactionGroups = React.useMemo(() => getReactionGroups(reactions), [reactions]);

    const onClick = React.useCallback((ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const id = ev.currentTarget.dataset.id;
        if (!id) { return; }
        if (typeof onSetReaction === 'function') { onSetReaction(id as ReactionTypes); }
    }, [onSetReaction]);

    return (
        <ReactionContainer>
            {Object.entries(reactionGroups).map(([reactionId, userIds], idx) => (
                <MessageReactionItem
                    key={idx}
                    reactionId={reactionId as ReactionTypes}
                    userIds={userIds}
                    myReactionId={userIds.includes(currentUserId) ? reactionId : undefined}
                    onClick={onClick}
                />
            ))}
        </ReactionContainer>
    );
});


const ReactionContainer = styled('ul')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    borderRadius: 4,
}));
