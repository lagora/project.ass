export const concat = (a, b) => a.concat(b);
export const merge = (a, b) => ({...a, ...b});
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;