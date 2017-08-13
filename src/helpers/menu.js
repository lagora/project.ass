export const extractDirectionFromKey = key => key.replace('Arrow', '').toLowerCase();

export const startWithArrow = key => key.indexOf('Arrow') === 0;

export const includeUpDown = text => ['up', 'down'].includes(text);

export const includeLeftRight = text => ['left', 'right'].includes(text);

export const includeDirection = text => includeLeftRight(text) || includeUpDown(text);

export const filterForOnlyArrowKeys = key => startWithArrow(key) && includeDirection(extractDirectionFromKey(key));

export const filterForUpDownArrowsKeys = key => startWithArrow(key) && includeUpDown(extractDirectionFromKey(key));

export const filterForLeftRightArrowsKeys = key => startWithArrow(key) && includeLeftRight(extractDirectionFromKey(key));

export const filterForValidation = key => key === 'v';

export const filterForCancel = key => key === 'c';

export const drawMenuBackground = ({canvas, ctx}) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export const drawMenuGlitch = ({canvas, ctx, glitchLevel, clock}) => {
    if (glitchLevel === 0) {
        const rgb = Math.round(128 * Math.random());
        ctx.fillStyle = 'rgba(' + [255, 255, 255, Math.random() * (clock < 24 ? 1 : 0.25),
        ].join(', ') + ')';
        ctx.fillRect(0, clock, canvas.width, 1);
    } else
    if (glitchLevel === 1) {
        ctx.fillStyle = 'rgba(' + 
        [
            Math.round(128 * Math.random()),
            Math.round(128 * Math.random()),
            Math.round(128 * Math.random()),
            Math.random()
        ].join(',') + ')';
        ctx.fillRect(
            0, clock * Math.random(),
            canvas.width, Math.round(Math.random() * (canvas.height / 4)) + 1
        );
    } else
    if (glitchLevel == 2) {
        ctx.fillStyle = 'rgba(' + 
        [
            127 + Math.round(128 * Math.random()),
            127 + Math.round(128 * Math.random()),
            127 + Math.round(128 * Math.random()),
            Math.random()
        ].join(',') + ')';
        ctx.fillRect(
            Math.random() * canvas.width, clock * Math.random(),
            Math.random() * canvas.width, Math.round(Math.random() * (canvas.height / 4)) + 1
        );
    }
};

export const drawMenuForeground = ({canvas, ctx, clock}) => {
    // let gradient = ctx.createRadialGradient(
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     canvas.width / 2,
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     0
    // )
    // gradient.addColorStop(0, '#000');
    // gradient.addColorStop(1, '#fff');
    // ctx.fillStyle = 'gradient';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export const getFontSizeFromScreenSize = canvas => (canvas.width / 10) / 1.25;

export const getLineHeightFromScreenSize = canvas => (canvas.width / 10) / 1.25;

export const drawMenuNavKeys = ({canvas, ctx, keys}) => {
    const fontSize = getFontSizeFromScreenSize(canvas);
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = '#09f';
    ctx.fillRect(0, 0, canvas.width, getLineHeightFromScreenSize(canvas) * 1.25);
    ctx.fillStyle = '#fff';
    ctx.fillText(keys, 8, fontSize);
};

export const makeMenuNavKeys = ({keys, level}) => {
    keys = level > 0 ? {...keys, '←': 'back'} : keys;
    return Object.keys(keys).map(k => `${k}:${keys[k]}`).join(' | ');
};

export const drawMenuItems = ({canvas, ctx, cursor, items, news}) => {
    const fontSize = getFontSizeFromScreenSize(canvas);
    ctx.font = `${fontSize}px monospace`;
    const height = fontSize;
    items.forEach((item, index) => {
        if (index === cursor) {
            ctx.fillStyle = '#f90';
            ctx.fillRect(
                0,
                (getLineHeightFromScreenSize(canvas) * 1.25) + (index * fontSize),
                canvas.width, 
                getLineHeightFromScreenSize(canvas)
            );
            ctx.fillStyle = '#000';
        } else {
            ctx.fillStyle = '#fff';
        }
        const hasNews = news[item] > 0;
        const itemNews = hasNews ? ` [${news[item]} new${news[item] > 1 ? 's' : ''}]` : '';
        const itemDisplayed = `${item}${itemNews}`;
        ctx.fillText(
            itemDisplayed,
            8,
            (getLineHeightFromScreenSize(canvas) * 2) + (index * fontSize)
        );
    });
    for (let i = 0; i < canvas.height; i += 2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, i, canvas.width, 1);
    }
    for (let i = 0; i < canvas.width; i += 2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(i, 0, 1, canvas.height);
    }
};

export const drawMenu = props => {
    const {menu, clock} = props;
    const {current, cursor, news, level} = menu;
    const items = menu.items[current];
    const keys = menu.keys[current] ? menu.keys[current] : menu.keys.default;
    const next = menu.next[current];
    const glitchLevel = 0;
    const canvas = document.querySelector('#canvas-menu');
    const ctx = canvas.getContext('2d');

    drawMenuBackground({canvas, ctx});
    drawMenuNavKeys({canvas, ctx, keys: makeMenuNavKeys({keys, level})})
    drawMenuGlitch({canvas, ctx, glitchLevel, clock});
    drawMenuItems({canvas, ctx, cursor, items, news});
    // drawMenuForeground({canvas, ctx, clock});
};

export const findPreviousCursor = v => v !== -1;
export const mapForPreviousCursor = current => (sub, cursor) => sub === current ? cursor : -1;
export const getPreviousCursor = ({current, item, items}) => items[item].map(mapForPreviousCursor(current)).find(findPreviousCursor);
export const filterPreviousMenu = ({current, items}) => item => items[item].includes(current) ? ({current: item, cursor: getPreviousCursor({current, item, items})}) : false;
export const filterNullMenu = a => a !== false;