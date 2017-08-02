import {
    blank, color, frame, rect, 
    reducer, soapLogo, 
    text
} from '../helpers';

const state = {};

const INTRO_INIT = 'INTRO_INIT';

export const types = {INTRO_INIT};

export const init = actions => (dispatch, getState) => {
    return dispatch({
        type: INTRO_INIT,
        obj: [
            {
                draw: ({ctx, delta, gfx, time}) => soapLogo(gfx)({time}),
                update: ({actions, delta, state, time}) => time > 5000 && actions.menu.setCursor({cursor: -1, key: 'ttls'}) && actions.game.setState('ttls'),
                state: 'intro',
            }
        ]
    });
};

export const actions = {init};

export const mapping = {};

export default reducer(mapping, state);