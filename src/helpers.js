import hexToHsl  from 'hex-to-hsl';

export const actionsInit = actions => k => actions[k].init(actions);
export const blank = gfx => color => rect(gfx)({color, x: 0, y: 0, w: gfx.width, h: gfx.height});
export const color = palette => index => palette[index];
export const concat = (a, b) => a.concat(b);
export const copy = (a, b) => (c, d) => a.putImage(b.getImageData(c.x, c.y, c.w, c.h), d.x, d.y);
export const draw = ({delta, state, time}) => state.gfx.obj.filter(filterState(state)).forEach(({draw}) => draw({delta, gfx: state.gfx, state, time}));
export const fill = gfx => ({color, x, y, w, h}) => {
    gfx.ctx.fillStyle = color;
    gfx.ctx.fillRect(x, y, w, h);
};
export const frame = gfx => ({color, x, y, w, h}) => {
    gfx.ctx.strokeStyle = color;
    gfx.ctx.strokeRect(x, y, w, h);
};
export const filterGfxInit = k => k !== 'gfx';
export const filterForInitiable = actions => k => typeof actions[k].init !== 'undefined';
export const filterState = ({game}) => ({state}) => state === game.state;
export const init = (actions, debug) => new Promise(resolve => actions.gfx.init({width: 240, height: 160})
.then(() => Promise.all(Object.keys(actions).filter(filterGfxInit).filter(filterForInitiable(actions)).map(actionsInit(actions)))
.then(() => actions.game.setState(debug ? 'ttls' : 'intro'))
.then(() => actions.menu.init(actions))//DEBUG
.then(() => resolve())));
export const merge = (a, b) => ({...a, ...b});
export const rect = gfx => ({color, h, w, x, y}) => {
    gfx.ctx.fillStyle = color;
    gfx.ctx.fillRect(x, y, w, h);
};
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;
export const soapLogo = gfx => ({time}) => {
    const offset = {
        y: time / 3000,
    };
    const white = color(gfx.palette)(gfx.palette.length - 1);
    const orange = '#FF9900';
    blank(gfx)(white);
    const {height, width} = gfx;
    const logo = {
        x: width * (60 / 320),
        y: (height * (75 / 240)) * (time < 3000 ? (1 / offset.y) : 1),
        w: width * (199 / 320),
        h: height * (89 / 240),
    };
    const mkX = x => logo.x + logo.w * (x / 199);
    const mkY = y => logo.y + logo.h * (y / 89);
    const mkW = w => logo.w * (w / 199);
    const mkH = h => logo.h * (h / 199);
    [
        {color: orange, ...logo},
        // {...logo, w: logo.w * (29 / 199), h: mkH(37)},
        // {...logo, x: mkY(45), y: mkY(15), w: mkW(23), h: mkH(8)},
        // {...logo, x: mkY(67), w: mkW(133), h: mkH(23)},
        // {...logo, x: mkY(15), y: mkY(36), w: mkW(14), h: mkH(14)},
        // {...logo, x: mkY(45), y: mkY(23), w: mkW(7), h: mkH(44)},
        // {color: 'red', ...logo, x: mkY(67), y: mkY(38), w: mkW(15), h: mkH(14)},
    ]
    .forEach(opts => rect(gfx)({color: white, ...opts}));
};
export const stroke = gfx => ({color, x, y, w, h}) => {
    gfx.ctx.strokeStyle = color;
    gfx.ctx.strokeRect(x, y, w, h);
};
export const text = gfx => opts => {
    gfx.ctx.font = opts.font;
    gfx.ctx.fillStyle = opts.color;
    gfx.ctx.fillText(opts.text, opts.x, opts.y, opts.w);
};
export const update = ({actions, delta, keys, state, time}) => state.game.obj.filter(filterState(state)).forEach(({update}) => update({actions, delta, keys, state, time}));