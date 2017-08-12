import {reducer} from '../helpers';
import {types as intro} from './intro';
import {types as ttls} from './ttls';

const state = {
    bottom: -1, ctx: undefined,
    height: -1, left: 0,
    obj: [],
    palette: [
        '#000000',
        '#102853',
        '#7E2553',
        '#008751',
        '#AB5236',
        '#5F574F',
        '#C2C3C7',
        '#FFF1E8',
        '#FF004D',
        '#FFA300',
        '#FFEC27',
        '#00E436',
        '#29ADFF',
        '#83769C',
        '#FF77A8',
        '#FFCCAA',
        '#FFFFFF'
    ],
    right: -1,
    top: 0,
    width: -1,
};

const GFX_INIT = 'GFX_INIT';
const INIT = 'INIT';

const init = ({width, height}) => dispatch => {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.setAttribute('id', 'root');
    tmpCanvas.setAttribute('width', `${width}px`);
    tmpCanvas.setAttribute('height', `${height}px`);
    tmpCanvas.style.display = 'block';
    tmpCanvas.style.margin = 'auto';
    tmpCanvas.style.border = '1px solid red';
    document.querySelector('body').appendChild(tmpCanvas);
    document.querySelector('body').style.margin = '0';
    const ctx = tmpCanvas.getContext('2d');
    
    const bottom = height;
    const center = {x: width / 2, y: height / 2};
    const right = width;
    dispatch({bottom, center, right, type: GFX_INIT, ctx, height, width});
    return Promise.resolve({ctx, height, palette: state.palette, width});
};

export const actions = {
    init,
};

export const mapping = {
    [GFX_INIT]: (state, {ctx, height, width}) => ({...state, ctx, height, width}),
    [intro.INTRO_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({draw, state}) => ({draw, state})))}),
    [ttls.TTLS_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({draw, state}) => ({draw, state})))}),
};

export default reducer(mapping, state);