export const xyzToString = ({x, y, z}) => `${x} ${y} ${z}`;

export const extractDirectionFromKey = key => key.replace('Arrow', '').toLowerCase();

export const startWithArrow = key => key.indexOf('Arrow') === 0;

export const includeDirection = text => ['left', 'right', 'up', 'down'].includes(text);

export const includeUpDown = text => ['up', 'down'].includes(text);

export const filterForOnlyArrowKeys = key => startWithArrow(key) && includeDirection(extractDirectionFromKey(key));

export const filterForUpDownArrowsKeys = key => startWithArrow(key) && includeUpDown(extractDirectionFromKey(key));

export const filterForValidation = key => key === 'v';

export const filterForCancel = key => key === 'c';

export const drawMenuBackground = ({canvas, ctx}) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export const drawMenuNavKeys = ({ctx, keys}) => {
    ctx.fillStyle = '#fff';
    ctx.font = '48px monospace';
    ctx.fillText(keys, 8, 48);
};

export const makeMenuNavKeys = keys => {
    return Object.keys(keys).map(k => `${k}:${keys[k]}`).join(' ');
};

export const drawMenuItems = ({canvas, ctx, cursor, items}) => {
    ctx.font = '48px monospace';
    items.forEach((item, index) => {
        if (index === cursor) {
            ctx.fillStyle = '#f90';
            ctx.fillRect(0, 64 + (index * 64), canvas.width, 64);
            ctx.fillStyle = '#000';
        } else {
            ctx.fillStyle = '#fff';
        }
        ctx.fillText(item, 8, 104 + (index * 64));
    });
};

export const drawMenu = props => {
    const {menu} = props;
    const {current, cursor} = menu;
    const items = menu.items[current];
    const keys = menu.keys[current];
    const next = menu.next[current];
    // console.info('drawMenu', current, items, keys, next);
    console.info('drawMenu', current, items, keys, next);
    const canvas = document.querySelector('#canvas-menu');
    const ctx = canvas.getContext('2d');

    drawMenuBackground({canvas, ctx});
    drawMenuNavKeys({ctx, keys: makeMenuNavKeys(keys)})
    drawMenuItems({canvas, ctx, cursor, items});

    console.info('keysHelps', makeMenuNavKeys(keys));
    // ctx.fillText(', 8, 64);
};