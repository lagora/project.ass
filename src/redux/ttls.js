// import {reducer} from '../helpers';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;
// import { draw as menuDraw } from './menu';
// import { events, setState } from './game';

const state = {
    cursor: -1,
    items: [
        'new game', 'options'
    ]
};

// const SET_CURSOR = 'SET_CURSOR';

export const types = {
    // SET_CURSOR,
};

// export const ttlsKey = ({cursor, dispatch, length, type}) => ({
//     ArrowUp: () => dispatch({type, cursor: cursor === 0 ? length - 1 : cursor - 1}),
//     ArrowDown: () => dispatch({type, cursor: cursor === length - 1 ? 0 : cursor + 1}),
// });

// export const setCursor = (key) => (dispatch, getState) => {
//     const type = SET_CURSOR;
//     const {cursor, items} = getState().ttls;
//     const length = items.length;
//     if (cursor === -1) {
//         return dispatch({type, cursor: key === 'ArrowUp' ? length - 1 : 0});
//     }
    
//     if (['ArrowUp', 'ArrowDown'].includes(key)) {
//         return ttlsKey({cursor, dispatch, length, type})[key]();
//     }
// };

export const actions = {
    // setCursor,
};

export const mapping = {
    // [SET_CURSOR]: (state, {cursor}) => ({...state, cursor}),
};

export default reducer(mapping, state);