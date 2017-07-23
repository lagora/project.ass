console.info('proto.js');

const palette = [
    '#000000',
    '#102853',
    '#7E2553',
    '#008751',
    '#AB5236',
    '#5F574F',
    '#C2C3C7',
    '#FFF1E8',
    '#FF004D',
    '#FFA300',
    '#FFEC27',
    '#00E436',
    '#29ADFF',
    '#83769C',
    '#FF77A8',
    '#FFCCAA'
];
const layers = [];

const addLayer = layer => layers.push(layer) && layers.length;
const setLayer = (layer, i) => layers[i] = layer;
const removeLayer = ii => layers = layers.filter((l, i) => i == ii);

const color = (pal = palette) => index => pal[index];

const layerId = addLayer({
    draw: ({ctx, w, h}) => {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(
            Math.round(Math.random() * (w / 2)),
            Math.round(Math.random() * (h / 2)),
            Math.round(Math.random() * (w / 2) + Math.random() * (w / 2)),
            Math.round(Math.random() * (h / 2) + Math.random() * (h / 2))
        )
    }
})

console.info('layerId', layerId);

const draw = ({layers, ctx, w, h}) =>
layers.filter(({draw}) => draw && typeof draw === 'function').forEach(layer => {
    layer.draw({ctx, w, h});
});

const update = ({layers, ctx, w, h}) => 
layers.filter(({update}) => update && typeof update === 'function').forEach(layer => {
    layer.update({ctx, w, h});
});

const loop = data => () => {
    // console.info('loop');
    draw(data);
    update(data);
    window.requestAnimationFrame(loop(data));
};

const run = ({layers, ctx, w, h}) => {
    console.info('ready');
    loop({layers, ctx, w, h})();
};

const boot = () => {
    const w = 240;
    const h = 160;
    console.info('boot');
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.setAttribute('id', 'root');
    tmpCanvas.setAttribute('width', `${w}px`);
    tmpCanvas.setAttribute('height', `${h}px`);
    tmpCanvas.style.display = 'block';
    tmpCanvas.style.margin = 'auto';
    tmpCanvas.style.border = '1px solid red';
    document.querySelector('body').appendChild(tmpCanvas);
    document.querySelector('body').style.margin = '0';
    const ctx = tmpCanvas.getContext('2d');
    run({layers, ctx, w, h});
};

document.addEventListener('DOMContentLoaded', boot);