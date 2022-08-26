# teams-reaction

## <ins>Documentation</ins>

### <ins>Intro</ins>

#### Goal
   * create smooth animation with sprite image + keyframe with React


#### Basic commands:
   * yarn start      = start frontend

#### Technologies
 * Frontend: 
      * Typescript
      * ReactJS
      * Material UI / styled component

#### Basic Concept
 * need an image where sane thing is repeated multiple times (vertically or horizontally) with minor difference (why 1 image and not 30? because faster to load it, handle it)
 * use this bigger images like background image with smaller image element dimension (example if image height is 2100 and width 30 then image element should show 30x30)
 * we must set the animation duration
 * stepper split the animation into steps/frames, example if we have an image with 30x2100 size then the animation should be 2100/30 - 1 = 69 step (= 70 frames), so the animation in first frame will show the image at 0x0-30x30 then 30x30-30x60, then 30x60-30x90 etc till 30x2070-30x2100...
 
 ```react
 // final component
const AnimatedIcon = observer((props: AnimatedIconProps) => {
    const { iconData, frameCount, ...rest } = props;
    const data = assets[iconData];
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

// we scroll the big image from 0,0 (x, y) position to the 100%, 100%
const backgroundTransitionKeyframes = keyframes`
    to { background-position: 100% 100%; }
`;

// styled component which use background image with animation when user hover to it
// animation explanation:
// - keyframe scrolling till the end of the image
// - duration of animation is 1.5 second
// - stepper must be the height/width - 1 (if it is vertical image)
// - infinite animation = loop
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

interface AnimatedIconRootProps {
    url: string;
    frameCount: number;
    size?: number;
}

 export interface AnimatedIconData {
    url: string;
    frameCount: number;
    tooltip?: string;
}

export interface AnimatedIconProps extends Omit<React.ComponentProps<typeof AnimatedIconRoot>, keyof AnimatedIconRootProps> {
    iconData: keyof typeof assets;
    size?: number;
    frameCount?: number;
}
 ```
 
 ##### Assets & FrameCounts
 
 ```react
import likeImg from './30_anim_f_like.png';
import heartImg from './30_anim_f_heart.png';
import laughImg from './30_anim_f_laugh.png';
import surprisedImg from './30_anim_f_surprised.png';
import sadImg from './30_anim_f_sad.png';
import angryImg from './30_anim_f_angry.png';

 const icons = {
    like: {
        url: likeImg,
        frameCount: 1530 / 30,
        tooltip: 'Like'
    },
    heart: {
        url: heartImg,
        frameCount: 2190 / 30,
        tooltip: 'Heart'
    },
    laugh: {
        url: laughImg,
        frameCount: 1530 / 30,
        tooltip: 'Laugh'
    },
    surprised: {
        url: surprisedImg,
        frameCount: 2190 / 30,
        tooltip: 'Surprised'
    },
    sad: {
        url: sadImg,
        frameCount: 2160 / 30,
        tooltip: 'Sad'
    },
    angry: {
        url: angryImg,
        frameCount: 2160 / 30,
        tooltip: 'Angry'
    },
};
 
 ```
 
 #### Related informations:
[https://css-tricks.com/using-multi-step-animations-transitions/](https://css-tricks.com/using-multi-step-animations-transitions/)
 
 #### example image:
 
 [vertical image](https://github.com/shadowvzs/teams-reaction/blob/master/project/src/AnimatedIcon/assets/30_anim_f_laugh.png)
