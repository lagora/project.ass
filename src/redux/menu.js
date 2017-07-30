import {blank, color, frame, reducer, text} from '../helpers';
import {types as ttls} from './ttls';

const state = {
    cursor: {
        ttls: -1,
    },
    items: {
        ttls: [
            'continue',
            'new game',
            'options',
            // 'exit',
        ],
    },
    steps: {
        ttls: -1,
    },
};

const MENU_INIT = 'MENU_INIT';

export const types = {MENU_INIT};

export const init = actions => (dispatch, getState) => {};

export const actions = {init};

export const mapping = {
    // [ttls.]
};

export default reducer(mapping, state);