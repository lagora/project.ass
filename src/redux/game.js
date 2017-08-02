import {blank, rect, reducer} from '../helpers';
import {actions as bindedActions, resetTime} from '../index';
import {types as intro} from './intro';
import {types as ttls} from './ttls';
import {forEach} from 'most';

export const events = ['keydown', 'keyup'];

const initialState = {
    state: undefined,
    time: 0,
    next: {
        intro: 'ttls',
        ttls: 'intro',// DEBUG
    },
    obj: [],
};

const GAME_INIT = 'GAME_INIT';
const INIT = 'INIT';
const SET_STATE = 'SET_STATE';

export const setState = newState => (dispatch, getState) => {
    // const oldState = getState().game.state;
    // if (!!oldState && getState().menu.cursor[oldState]) {
    //     bindedActions.menu.setCursor({cursor: -1, key: oldState});
    // }
    dispatch({type: SET_STATE, state: newState, time: Date.now()});
    resetTime();
};

export const actions = {setState};

export const mapping = {
    [GAME_INIT]: (state, action) => ({...state, state: action.state}),
    [intro.INTRO_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({state, update}) => ({state, update})))}),
    [ttls.TTLS_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({state, update}) => ({state, update})))}),
    // [ttls.TTLS_VALID_IS_PRESSED]: (state) => ({...state, state: initialState.next.ttls, time: 0}),
    [SET_STATE]: (state, action) => ({...state, state: action.state, time: action.time}),
};

export default reducer(mapping, initialState);