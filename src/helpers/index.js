import * as spaceship from './spaceship';

export const merge = (a, b) => ({...a, ...b});
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

export const helpers = {
    merge,
    reducer,
    spaceship,
};

export default helpers;