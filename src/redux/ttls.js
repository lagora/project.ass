import {blank, color, frame, reducer, text} from '../helpers';
import { draw as menuDraw } from './menu';
import { getKey, isKey, mkKey} from './keys';
import { events, setState } from './game';

const state = {
    cursor: -1,
    items: [
        'new game', 'options'
    ]
};

const SET_CURSOR = 'SET_CURSOR';
// const TTLS_INIT = 'TTLS_INIT';
// const TTLS_VALID_IS_PRESSED = 'TTLS_VALID_IS_PRESSED';

export const types = {
    SET_CURSOR,
    // TTLS_INIT,
    // TTLS_VALID_IS_PRESSED,
};

export const ttlsKey = ({cursor, dispatch, length, type}) => ({
    ArrowUp: () => dispatch({type, cursor: cursor === 0 ? length - 1 : cursor - 1}),
    ArrowDown: () => dispatch({type, cursor: cursor === length - 1 ? 0 : cursor + 1}),
});

export const setCursor = (key) => (dispatch, getState) => {
    const type = SET_CURSOR;
    const {cursor, items} = getState().ttls;
    const length = items.length;
    if (cursor === -1) {
        return dispatch({type, cursor: key === 'ArrowUp' ? length - 1 : 0});
    }
    
    if (['ArrowUp', 'ArrowDown'].includes(key)) {
        return ttlsKey({cursor, dispatch, length, type})[key]();
    }
};

// export const init = actions => (dispatch, getState) => {
//     const {menu} = getState();
//     document.addEventListener('keydown', keydown(dispatch, getState));
//     document.addEventListener('keyup', keyup(dispatch, getState));
//     return dispatch({
//         type: TTLS_INIT,
//         obj: [
//             {
//                 draw: ({ctx, delta, gfx, state}) => {
//                     blank(gfx)(color(gfx.palette)(0));
//                     const white = color(gfx.palette)(gfx.palette.length - 1);
//                     const fontFamily = 'monospace';
//                     const fontSize = [32, 12];
//                     const font = {font: `${fontSize[0]}px ${fontFamily}`};
//                     const font2 = {font: `${fontSize[1]}px ${fontFamily}`};
//                     [
//                         {...font, f: text, text: 'A.S.S', x: gfx.width * 0.33333, y: gfx.height * 0.33333, w: gfx.width},
//                         {...font2, f: text, text: 'Adventure in Space & Shit', x: gfx.width * 0.175, y: gfx.height * 0.40, w: gfx.width},
//                     ]
//                     .forEach(opts => opts.f(gfx)({...opts, color: white}));
//                     menuDraw({ctx, delta, gfx, key: 'ttls', state});
//                 },
//                 update: ({actions, delta, keys, state, time}) => {
//                     // DEBUG
//                     // console.info('keys', keys);
//                     // if (keys.x.is) {
//                     //     actions.game.setState('intro');
//                     // }

//                     const items = state.menu.items.ttls;
//                     const key = 'ttls';

//                     if (state.menu.cursor.ttls < 0 && keys.is.pressed) {
//                         return actions.menu.setCursor({cursor: 0, key});
//                     }

//                     if (keys.up.is.pressed) {
//                         const cursor = (state.menu.cursor.ttls === 0) ? items.length - 1 : state.menu.cursor.ttls--;
//                         return actions.menu.setCursor({cursor, key});
//                     }

//                     if (keys.down.is.pressed) {
//                         console.warn('...');
//                         const cursor = (state.menu.cursor.ttls === items.length - 1) ? 0 : state.menu.cursor.ttls++;
//                         return actions.menu.setCursor({cursor, key});
//                     }
//                 },
//                 state: 'ttls',
//             },
//         ]
//     });
// };

// export const keydown = (dispatch, getState) => event => {
//     if (isKey(event)) {
//         let type = 'x' === event.key ? 'CANCEL' : 'c' === event.key ? 'VALID' : mkKey(event);
//         let key = getKey(mkKey(event));
//         if (key === 'valid') {
//             const items = getState().menu.items.ttls;
//             const cursor = getState().menu.cursor.ttls;
//             return items[cursor] === 'new game' && setState('intro')(dispatch, getState);
//             // if (items[cursor] !== 'new game') {
//             //     return false;// DEBUG
//             // }
//         }
//         return !getState().keys[key].is && dispatch({type: `TTLS_${key.toUpperCase()}_IS_PRESSED`, is: true});
//     }
// };

// export const keyup = (dispatch, getState) => event => {
//     if (isKey(event)) {
//         let type = 'x' === event.key ? 'CANCEL' : 'c' === event.key ? 'VALID' : mkKey(event);
//         let key = getKey(mkKey(event));
//         if (getState().keys[key].is) {
//             dispatch({type: `TTLS_${key.toUpperCase()}_IS_PRESSED`, is: false});
//         }
//         // if (getState().keys[key].is) {
//         //     return dispatch({type: `TTLS_${key.toUpperCase()}_WAS_PRESSED`, was: true});
//         // }
//     }
// };

export const actions = {
    setCursor,
    // init, keydown, keyup
};

export const mapping = {
    [SET_CURSOR]: (state, {cursor}) => ({...state, cursor}),
};

export default reducer(mapping, state);