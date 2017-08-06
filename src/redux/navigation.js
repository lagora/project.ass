import {blank, color, frame, reducer, text} from '../helpers';

const state = {
    locations: {},
    position: {},
};


export const types = {};

// export const init = actions => (dispatch, getState) => 
// // console.info('menu', 'init', actions.menu);
// //DEBUG
// actions.menu.setItems({items: state.items.ttls.slice(1), key: 'ttls'});

export const draw = ({ctx, delta, gfx, key, state}) => {
};

export const update = ({actions, delta, keys, state, time}) => {};

export const actions = {};

export const mapping = {
};

export default reducer(mapping, state);