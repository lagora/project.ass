import {reducer} from '../helpers';
const uuidv4 = require('uuid/v4');

const state = {
    ctx: undefined,
    height: -1,
    layers: [],
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
        '#FFCCAA'
    ],
    width: -1,
};

const ADD_LAYER = 'ADD_LAYER';
const INIT = 'INIT';
const REMOVE_LAYER = 'REMOVELAYER';

const addLayer = layer => (dispatch, getState) => dispatch({type: ADD_LAYER, layers: getState().gfx.layers.concat([{...layer, id: uuidv4()}])}) && Promise.resolve(layer);
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
    
    dispatch({type: INIT, ctx, height, width});
    return Promise.resolve({width, height});
};
const removeLayer = layer => (dispatch, getState) => dispatch({type: REMOVE_LAYER, layers: getState().gfx.layers.filter(({id}) => id !== layer.id)}) && Promise.resolve(layer);

export const actions = {addLayer, init, removeLayer};

export const mapping = {
    [INIT]: (state, {ctx, height, width}) => ({...state, ctx, height, width}),
    [ADD_LAYER]: (state, {layers}) => ({...state, layers}),
    [REMOVE_LAYER]: (state, {layers}) => ({...state, layers}),
};

export default reducer(mapping, state);