import {blank, rect, reducer} from '../helpers';
import {actions as bindedActions, resetTime} from '../index';
import {types as intro} from './intro';
import {types as ttls} from './ttls';
import {forEach} from 'most';

export const events = ['keydown', 'keyup'];

const initialState = {
    state: 'ttls',// 'intro',
    mode: 'pixel' // modes: pixel OR vr
};

const SET_STATE = 'SET_STATE';

export const nextState = states => (dispatch, getState) => {
    const {cursor} = getState().ttls;
    return states[cursor] && dispatch({type: SET_STATE, state: states[cursor].replace(' ', '_').toLowerCase()});
};

export const setState = newState => (dispatch, getState) => 
dispatch({type: SET_STATE, state: newState, time: Date.now()});

export const actions = {nextState, setState};

export const mapping = {
    [SET_STATE]: (state, action) => ({...state, state: action.state, time: action.time}),
};

export default reducer(mapping, initialState);