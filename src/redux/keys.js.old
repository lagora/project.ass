import {blank, color, frame, reducer, text} from '../helpers';
import {types as ttls} from './ttls';

const state = {
    cancel: {is: false, was: false},
    down: {is: false, was: false},
    left: {is: false, was: false},
    right: {is: false, was: false},
    up: {is: false, was: false},
    valid: {is: false, was: false},
};

const MENU_INIT = 'MENU_INIT';
const SET_CURSOR = 'SET_CURSOR';
const SET_STEP = 'SET_STEP';

const CANCEL_WAS_PRESSED = 'CANCEL_WAS_PRESSED';
const DOWN_WAS_PRESSED = 'DOWN_WAS_PRESSED';
const LEFT_WAS_PRESSED = 'LEFT_WAS_PRESSED';
const RIGHT_WAS_PRESSED = 'RIGHT_WAS_PRESSED';
const UP_WAS_PRESSED = 'UP_WAS_PRESSED';
const VALID_WAS_PRESSED =  'VALID_WAS_PRESSED';

const CANCEL_IS_PRESSED = 'CANCEL_IS_PRESSED';
const DOWN_IS_PRESSED = 'DOWN_IS_PRESSED';
const LEFT_IS_PRESSED = 'LEFT_IS_PRESSED';
const RIGHT_IS_PRESSED = 'RIGHT_IS_PRESSED';
const UP_IS_PRESSED = 'UP_IS_PRESSED';
const VALID_IS_PRESSED =  'VALID_IS_PRESSED';

export const types = {
    MENU_INIT, SET_CURSOR, SET_STEP,

    CANCEL_WAS_PRESSED,
    DOWN_WAS_PRESSED,
    LEFT_WAS_PRESSED,
    RIGHT_WAS_PRESSED,
    UP_WAS_PRESSED,
    VALID_WAS_PRESSED,

    CANCEL_IS_PRESSED,
    DOWN_IS_PRESSED,
    LEFT_IS_PRESSED,
    RIGHT_IS_PRESSED,
    UP_IS_PRESSED,
    VALID_IS_PRESSED,
};

export const loCase = t => t.toLowerCase();
export const getKey = key => ['c', 'v'].includes(key) ? ('v' === key ? 'valid' : 'cancel') : key;
export const mkKey = ({key}) => loCase( key.replace('Arrow', '').replace('Key', ''));
export const isKey = ({key}) => key.indexOf('Arrow') !== -1 || ['c', 'v'].includes(key);

export const keydown = event => (dispatch, getState) => {
    if (isKey(event)) {
        let type = 'x' === event.key ? 'CANCEL' : 'c' === event.key ? 'VALID' : mkKey(event);
        let key = getKey(mkKey(event));
        console.info('...', 'keydown', type, key);
        dispatch({type: `${key.toUpperCase()}_IS_PRESSED`, is: true});
    }
};

export const keyup = event => (dispatch, getState) => {
    if (isKey(event)) {
        let type = 'x' === event.key ? 'CANCEL' : 'c' === event.key ? 'VALID' : mkKey(event);
        let key = getKey(mkKey(event));
        dispatch({type: `${key.toUpperCase()}_IS_PRESSED`, is: false});
        if (getState().keys[key].is) {
            dispatch({type: `${key.toUpperCase()}_WAS_PRESSED`, was: true});
        }
    }
};

export const actions = {keydown, keyup};

export const mapping = {
    [SET_CURSOR]: (state, {cursor, key}) => ({...state, cursor: {...state.cursor, [key]: cursor}}),
    [SET_STEP]: (state, {key, step}) => ({...state, steps: {...state.steps, [key]: step}}),

    [CANCEL_IS_PRESSED]: (state, {key, is}) => ({...state, cancel: {...state.cancel, is}}),
    [DOWN_IS_PRESSED]: (state, {key, is}) => ({...state, down: {...state.down, is}}),
    [LEFT_IS_PRESSED]: (state, {key, is}) => ({...state, left: {...state.left, is}}),
    [RIGHT_IS_PRESSED]: (state, {key, is}) => ({...state, right: {...state.right, is}}),
    [UP_IS_PRESSED]: (state, {key, is}) => ({...state, up: {...state.up, is}}),
    [VALID_IS_PRESSED]: (state, {key, is}) => ({...state, valid: {...state.valid, is}}),

    [CANCEL_WAS_PRESSED]: (state, {key, was}) => ({...state, cancel: {...state.cancel, was}}),
    [DOWN_WAS_PRESSED]: (state, {key, was}) => ({...state, down: {...state.down, was}}),
    [LEFT_WAS_PRESSED]: (state, {key, was}) => ({...state, left: {...state.left, was}}),
    [RIGHT_WAS_PRESSED]: (state, {key, was}) => ({...state, right: {...state.right, was}}),
    [UP_WAS_PRESSED]: (state, {key, was}) => ({...state, up: {...state.up, was}}),
    [VALID_WAS_PRESSED]: (state, {key, was}) => ({...state, valid: {...state.valid, was}}),
};

export default reducer(mapping, state);