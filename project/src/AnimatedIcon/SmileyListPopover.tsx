import React from 'react';
import { styled } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import AnimatedIcon from '.';
import { HoverPopover } from '../common/HoverPopover';
import type { ReactionTypes } from '../types/core';


export interface SmileyListProps {
    items?: ReactionTypes[];
    selected?: ReactionTypes[];
    onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

const SmileyListPopOverBody = observer((props: SmileyListProps) => {
    const {
        selected = [],
        items = ['like', 'heart', 'laugh', 'surprised', 'sad', 'angry'],
        onClick
    } = props;

    return (
        <SmileyListContainer>
            {items.map(x => (
                <SmileyWrapper
                    key={x}
                    className={clsx('smiley-item', selected.includes(x) && 'selected-item')}
                >
                    <AnimatedIcon
                        iconData={x}
                        data-id={x}
                        onClick={onClick}
                        size={22}
                    />
                </SmileyWrapper>
            ))}
        </SmileyListContainer>
    );
});

interface SmileyListPopOverProps {
    children: JSX.Element;
    currentUserId: string;
    isDeleted?: boolean;
    reactions: Record<string, ReactionTypes>;
    onSetReaction?: (reaction: ReactionTypes) => void;
}
export const SmileyListPopover = (props: SmileyListPopOverProps) => {
    const {
        children,
        currentUserId,
        isDeleted,
        reactions = {},
        onSetReaction
    } = props;

    const onClick = React.useCallback((ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const id = ev.currentTarget.dataset.id;
        if (!id) { return; }
        if (typeof onSetReaction === 'function') { onSetReaction(id as ReactionTypes); }
    }, [onSetReaction]);

    if (isDeleted) { return children; }
    const selected: ReactionTypes[] = reactions[currentUserId] ? [reactions[currentUserId]] as ReactionTypes[] : [];

    return (
        <HoverPopover
            cmp={<SmileyListPopOverBody onClick={onClick} selected={selected} />}
            children={children}
        />
    );
};

export const SmileyListContainer = styled('ul')(({ theme }) => ({
    transform: 'translateY(-20px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: 'white',
    borderRadius: 4,
    boxShadow: '0 3px 3px 3px rgba(0,0,0,0.05)',
    padding: '4px 6px',
    '&:hover .smiley-item:not(:hover)': {
        opacity: 0.5
    }
}));

export const SmileyWrapper = styled('li')(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    margin: '2px 5px',
    height: 22,
    listStyle: 'none',
    '&.selected-item::after': {
        position: 'absolute',
        content: '""',
        bottom: -3,
        left: 5,
        right: 5,
        borderBottom: `2px solid rgb(0,0,200)`
    }
}));
