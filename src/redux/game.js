// import {reducer} from '../helpers';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

export const events = ['keydown', 'keyup'];

const initialState = {
    // state: 'new_game',
    // state: 'intro',
    state: 'new_game',
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