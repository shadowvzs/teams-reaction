import React from 'react';
import { styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface HoverPopoverProps {
    direction?: 'top' | 'bottom';
    children: JSX.Element;
    cmp: React.ReactNode;
}

export const HoverPopover = React.memo((props: HoverPopoverProps) => {
    const {
        children,
        cmp,
        direction
    } = props;

    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const bubbleRef = React.useRef<HTMLElement>(null);

    const onShow = React.useCallback((e: React.MouseEvent<any>) => { setAnchorEl(e.currentTarget); }, [anchorEl]);
    const onHide = React.useCallback((e: React.MouseEvent<any>) => { setAnchorEl(null); }, []);

    return (
        <PopoverRoot
            onMouseEnter={onShow}
            onMouseLeave={onHide}
        >
            {anchorEl && <PopoverBubble children={cmp} direction={direction} ref={bubbleRef} />}
            {children}
        </PopoverRoot>
    );
});

const PopoverRoot = styled('span', { shouldForwardProp: isPropValid })<{}>(({
    position: 'relative',
    display: 'flex',
}));

const PopoverBubble = styled('span', { shouldForwardProp: isPropValid })<{ direction: HoverPopoverProps['direction']; }>(({
    direction = 'top'
}) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    transform: { top: 'translateY(-75%)', bottom: 'translateY(25%)' }[direction],
    zIndex: 1,
}));
