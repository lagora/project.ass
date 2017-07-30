import {blank, rect, reducer} from '../helpers';
import {types as intro} from './intro';
import {types as ttls} from './ttls';

const state = {
    state: undefined,
    time: 0,
    obj: [],
};

const GAME_INIT = 'GAME_INIT';
const INIT = 'INIT';
const SET_STATE = 'SET_STATE';

export const setState = state => dispatch => dispatch({type: SET_STATE, state, time: Date.now()});

export const actions = {setState};

export const mapping = {
    [GAME_INIT]: (state, action) => ({...state, state: action.state}),
    [intro.INTRO_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({state, update}) => ({state, update})))}),
    [ttls.TTLS_INIT]: (state, {obj}) => ({...state, obj: state.obj.concat(obj.map(({state, update}) => ({state, update})))}),
    [SET_STATE]: (state, action) => ({...state, state: action.state, time: action.time}),
};

export default reducer(mapping, state);