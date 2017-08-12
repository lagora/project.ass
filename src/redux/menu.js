import {extractDirectionFromKey} from '../helpers/spaceship';
// import {reducer} from '../helpers/index';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

const state = {
    current: 'main',
    cursor: 0,
    items: {
        main: [
            'navigation',
            'jobs',
            'report',
            'cargo',
        ],
        cargo: ['free', 'used', 'total'],
        jobs: ['current', 'done'],
        navigation: ['systems'],
        report: [],
    },
    keys: {
        main: {
            'c': 'exit',
            'v': 'select',
        },
        cargo: {
            'c': 'main',
        },
        jobs: {
            'c': 'main',            
        },
        navigation: {
            'c': 'main',            
        },
        report: {
            'c': 'main',            
        },
    },
    next: {

    },
};

const SET_CURSOR = Symbol('Set menu cursor');
const SET_CURRENT_MENU = Symbol('Set current menu');

export const types = {
    SET_CURSOR,
    SET_CURRENT_MENU,
};

export const setCursor = ({key}) => (dispatch, getState) => {
    key = extractDirectionFromKey(key);
    const {menu} = getState();
    const {current, cursor} = menu;
    const items = menu.items[current];
    let nextCursor = cursor;
    if (key === 'up') {
        nextCursor = cursor === 0 ? items.length -1 : cursor - 1;
    } else if (key === 'down') {
        nextCursor = cursor < items.length - 1 ? cursor + 1 : 0;
    }
    dispatch({type: SET_CURSOR, payload: nextCursor});
};

export const setCurrentMenu = () => {
    // const {''''}
};

export const actions = {
    setCursor, setCurrentMenu
};

export const mapping = {
    [SET_CURSOR]: (state, {payload}) => ({...state, cursor: payload}),
};

export default reducer(mapping, state);