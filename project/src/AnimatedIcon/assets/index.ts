/// <reference path="./index.d.ts" />
import likeImg from './30_anim_f_like.png';
import heartImg from './30_anim_f_heart.png';
import laughImg from './30_anim_f_laugh.png';
import surprisedImg from './30_anim_f_surprised.png';
import sadImg from './30_anim_f_sad.png';
import angryImg from './30_anim_f_angry.png';

import type { ReactionTypes } from '../../types/core';

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

export const iconTypes = Object.keys(icons) as ReactionTypes[];

export default icons;
