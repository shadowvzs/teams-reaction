import React from 'react';
import { styled } from '@mui/material';
import { keyframes } from '@mui/system';
import isPropValid from '@emotion/is-prop-valid';

import assets from './assets';
import { observer } from 'mobx-react-lite';

export interface AnimatedIconData {
    url: string;
    frameCount: number;
    tooltip?: string;
}

export interface AnimatedIconProps extends Omit<React.ComponentProps<typeof AnimatedIconRoot>, keyof AnimatedIconRootProps> {
    iconData: keyof typeof assets | AnimatedIconData;
    size?: number;
    frameCount?: number;
}

const AnimatedIcon = observer((props: AnimatedIconProps) => {

    const { iconData, frameCount, ...rest } = props;
    const data = typeof iconData === 'string' ? assets[iconData] : iconData;

    return (
        <AnimatedIconRoot
            url={data.url}
            frameCount={frameCount ?? data.frameCount}
            title={data.tooltip}
            {...rest}
        />
    );
});

export default AnimatedIcon;

const backgroundTransitionKeyframes = keyframes`
    to { background-position: 100% 100%; }
`;

interface AnimatedIconRootProps {
    url: string;
    frameCount: number;
    size?: number;
}
const AnimatedIconRoot = styled('div', { shouldForwardProp: isPropValid })<AnimatedIconRootProps>(({
    url,
    frameCount,
    size,
}) => ({
    display: 'inline-block',
    width: size || 30,
    aspectRatio: '1',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
    background: `url("${url}") top left / cover`,
    '&:hover': {
        animation: `${backgroundTransitionKeyframes} 1.5s steps(${frameCount - 1}) infinite`,
    },
}));
