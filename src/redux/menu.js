import {blank, color, frame, reducer, text} from '../helpers';

const state = {
    cursor: {
        ttls: -1,
    },
    fonts: {
        size: {
            ttls: 16,
        },
        family: {
            ttls: 'monospace',
        }
    },
    items: {
        ttls: [
            'continue',
            'new game',
            'options',
            // 'exit',
        ],
    },
    margin: {
        ttls: {y: 16},
    },
    offsets: {
        ttls: {x: 0.4, y: 2 / 3},
    },
    steps: {
        ttls: -1,
    },
};

const MENU_INIT = 'MENU_INIT';
const SET_CURSOR = 'SET_CURSOR';
const SET_ITEMS = 'SET_ITEMS';
const SET_STEP = 'SET_STEP';

const TTLS_UP_IS_PRESSED = 'TTLS_UP_IS_PRESSED';
const TTLS_DOWN_IS_PRESSED = 'TTLS_DOWN_IS_PRESSED';
const TTLS_VALID_IS_PRESSED = 'TTLS_VALID_IS_PRESSED';
const TTLS_CANCEL_IS_PRESSED = 'TTLS_CANCEL_IS_PRESSED';

export const types = {MENU_INIT, SET_CURSOR, SET_ITEMS, SET_STEP};

export const init = actions => (dispatch, getState) => 
// console.info('menu', 'init', actions.menu);
//DEBUG
actions.menu.setItems({items: state.items.ttls.slice(1), key: 'ttls'});

export const draw = ({ctx, delta, gfx, key, state}) => {
    const white = color(gfx.palette)(gfx.palette.length - 1);
    const font = {font: `${state.menu.fonts.size[key]}px ${state.menu.fonts.family[key]}`};
    const margin = state.menu.margin[key].y;
    const offset = {
        x: gfx.width * state.menu.offsets[key].x,
        y: gfx.height * state.menu.offsets[key].y,
    };
    state.menu.items[key].forEach((line, i) => {
        [
            {...font, f: text, text: line, x: offset.x, y: offset.y + (i * margin), w: gfx.width},
        ]
        .forEach(opts => opts.f(gfx)({...opts, color: white}));
        if (state.menu.cursor[key] >= 0) {
            text(gfx)({...font, text: '>', x: offset.x - 16, y: offset.y + state.menu.cursor[key] * state.menu.fonts.size[key]});
        }
    });
};

export const update = ({actions, delta, keys, state, time}) => {};

export const setCursor = ({cursor, key}) => dispatch => dispatch({type: SET_CURSOR, cursor, key});

export const setItems = ({items, key}) => dispatch => dispatch({type: SET_ITEMS, items, key});

export const setStep = ({key, step}) => dispatch => dispatch({type: SET_STEP, key, step});

export const actions = {init, draw, update, setCursor, setItems, setStep};

export const mapping = {
    [TTLS_UP_IS_PRESSED]: (state, {is}) => is ? ({...state, cursor: {...state.cursor, ttls: state.cursor.ttls <= 0 ? state.items.ttls.length - 1 : state.cursor.ttls - 1}}) : state,
    [TTLS_DOWN_IS_PRESSED]: (state, {is}) => is ? ({...state, cursor: {...state.cursor, ttls: state.cursor.ttls < 0 || state.cursor.ttls > state.items.ttls.length - 2 ? 0 : state.cursor.ttls + 1 }}) : state,
    [SET_CURSOR]: (state, {cursor, key}) => ({...state, cursor: {...state.cursor, [key]: cursor}}),
    [SET_ITEMS]: (state, {items, key}) => ({...state, items: {...state.items, [key]: items}}),
    [SET_STEP]: (state, {key, step}) => ({...state, steps: {...state.steps, [key]: step}}),
};

export default reducer(mapping, state);