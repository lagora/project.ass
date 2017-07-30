import {blank, color, frame, reducer, text} from '../helpers';

const state = {};

const TTLS_INIT = 'TTLS_INIT';

export const types = {TTLS_INIT};

export const init = actions => (dispatch, getState) => {
    const {menu} = getState();
    return dispatch({
        type: TTLS_INIT,
        obj: [
            {
                draw: ({ctx, delta, gfx}) => {
                    blank(gfx)(color(gfx.palette)(0));
                    const white = color(gfx.palette)(gfx.palette.length - 1);
                    const fontFamily = 'monospace';
                    const fontSize = [8, 12, 16, 24, 32];
                    const font = {font: `${fontSize[0]}px ${fontFamily}`};
                    const font2 = {font: `${fontSize[4]}px ${fontFamily}`};
                    const font3 = {font: `${fontSize[1]}px ${fontFamily}`};
                    [
                        {...font, f: text, text: 'ttls', x: 16, y: 24, w: gfx.width},
                        {...font2, f: text, text: 'A.S.S', x: gfx.width * 0.33333, y: gfx.height * 0.33333, w: gfx.width},
                        {...font3, f: text, text: 'Adventure in Space & Shit', x: gfx.width * 0.175, y: gfx.height * 0.40, w: gfx.width},
                    ]
                    .forEach(opts => opts.f(gfx)({...opts, color: white}));
                    // text(gfx)({color: white, font, text: 'ttls', x: 16, y: 24, w: gfx.width});
                    // text(gfx)({color: white, font2, text: 'ASS', x: gfx.width / 2, y: gfx.height / 2, w: gfx.width});
                    // text(gfx)({color: white, font2, text: 'ASS', ...gfx.center, w: gfx.width});
                },
                update: ({actions, delta, keys, state, time}) => {
console.info('update', keys.x.is.pressed);
                    if (keys.x.was.pressed) {
                        actions.game.setState('intro');
                    }
                },
                state: 'ttls',
            },
        ]
    });
};

export const actions = {init};

export const mapping = {};

export default reducer(mapping, state);