// import {reducer} from '../helpers';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

const initialState = {
    name: 'cockpit',
    score: 0,
    money: 0,
};

const SET_NAME = 'SET_NAME';
const SET_SCORE = 'SET_SCORE';
const SET_MONEY = 'SET_MONEY';

export const type = {
    SET_NAME,
    SET_SCORE,
    SET_MONEY,
};

export const setName = name => (dispatch, getState) => dispatch({type: SET_NAME, name});
export const setScore = score => (dispatch, getState) => dispatch({type: SET_SCORE, score});
export const setMoney = money => (dispatch, getState) => dispatch({type: SET_MONEY, money});

export const actions = {setName, setScore, setMoney};

export const mapping = {
    [SET_NAME]: (state, {name}) => ({...state, name}),
    [SET_SCORE]: (state, {score}) => ({...state, score}),
    [SET_MONEY]: (state, {money}) => ({...state, money}),
};

export default reducer(mapping, initialState);