// import {reducer} from '../helpers/index';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

// import {
//     extractDirectionFromKey,
//     startWithArrow,
//     includeDirection,
//     filterForUpDownArrowsKeys,
//     filterForLeftRightArrowsKeys,
//     filterForOnlyArrowKeys,
//     filterForValidation,
//     filterForCancel,
//     drawMenu,
// } from '../helpers/menu';
import * as helper from '../helpers/menu';

const state = {
    current: 'main',
    cursor: 0,
    level: 0,
    commands: {
        main: {
            '<': {
                spaceship: {
                    setCamera: 'cockpit'
                }
            }
        },
    },
    items: {
        cargo: ['free', 'used', 'total'],
        comm: ['messages'],
        jobs: ['current', 'done'],
        locations: [
            ' ҈'
        ],
        main: [
            'navigation',
            'jobs',
            'report',
            'cargo',
            'comm',
        ],
        messages: ['unread', 'read'],
        navigation: [
            'locations',
            'galaxies',
            'systems',
            'planets',
            'moons'
        ],
        report: [],
    },
    keys: {
        default: {
            // 'c': 'exit',
            '←': 'exit',
            '→': 'select',
        },
        // cargo: {},
        // comm: {},
        // jobs: {},
        // main: {},
        // messages: {},
        // navigation: {},
        // report: {},
    },
    news: {
        jobs: 1,
    },
    next: {

    },
};

const MENU_CURSOR = 'MENU_CURSOR';//Symbol('Set menu cursor');
const MENU_CURSOR_UP = 'MENU_CURSOR_UP';//Symbol('Set menu cursor up');
const MENU_CURSOR_DOWN = 'MENU_CURSOR_DOWN';//Symbol('Set menu cursor down');
const GO_TO_MENU = 'GO_TO_MENU';//Symbol('Set current menu');
const BACK_FROM_CURRENT_MENU = 'BACK_FROM_CURRENT_MENU';//Symbol('Back from current menu');

export const types = {
    MENU_CURSOR,
    MENU_CURSOR_UP,
    MENU_CURSOR_DOWN,
    GO_TO_MENU,
    BACK_FROM_CURRENT_MENU,
};

export const setCursor = key => (dispatch, getState) => new Promise(resolve => {
    key = helper.extractDirectionFromKey(key);
    const {menu} = getState();
    const {current, cursor} = menu;
    const items = menu.items[current];
    let nextCursor = cursor;
    return  key === 'up' ? setCursorUp({cursor, items})(dispatch) :
            key === 'down' ? setCursorDown({cursor, items})(dispatch) :
            resolve(dispatch({type: MENU_CURSOR, payload: nextCursor}));

});

export const setCursorUp = ({cursor, items}) => dispatch => new Promise(resolve => 
    dispatch({
        type: MENU_CURSOR_UP,
        payload: cursor === 0 ? items.length -1 : cursor - 1
    })
);

export const setCursorDown = ({cursor, items}) => dispatch => new Promise(resolve =>
    dispatch({
        type: MENU_CURSOR_DOWN,
        payload: cursor < items.length - 1 ? cursor + 1 : 0
    })
);

export const backFromCurrentMenu = key => (dispatch, getState) =>new Promise(resolve => {
    const {menu} = getState();
    const {current, cursor, items} = menu;
    if (!helper.filterForLeftRightArrowsKeys(key) || key !== 'ArrowLeft' || current === 'main') {
        resolve(false);
    } else {
        const payload = Object.keys(items).map(helper.filterPreviousMenu({current, items})).find(helper.filterNullMenu);
        if (payload) {
            const level = payload.current === 'main' ? 0 : 1;
            resolve(dispatch({type: BACK_FROM_CURRENT_MENU, payload: {...payload, level}}));
        } else {
            resolve();
        }
    }
});

export const goToMenu = key => (dispatch, getState) => new Promise(resolve => {
    if (!helper.filterForLeftRightArrowsKeys(key) || key !== 'ArrowRight') {
        resolve(false);
    } else {
        const {menu} = getState();
        const {current, cursor, items} = menu;
        const payload = {current: items[current][cursor], level};
        const level = payload.current === 'main' ? 0 : 1;
        resolve(dispatch({type: GO_TO_MENU, payload: {...payload, level}}));
    }
});

export const actions = {setCursor, goToMenu, backFromCurrentMenu};

export const mapping = {
    [MENU_CURSOR]: (state, {payload}) => ({...state, cursor: payload}),
    [MENU_CURSOR_UP]: (state, {payload}) => ({...state, cursor: payload}),
    [MENU_CURSOR_DOWN]: (state, {payload}) => ({...state, cursor: payload}),
    [GO_TO_MENU]: (state, {payload}) => ({...state, cursor: 0, ...payload}),
    [BACK_FROM_CURRENT_MENU]: (state, {payload}) => ({...state, ...payload}),
};

export default reducer(mapping, state);