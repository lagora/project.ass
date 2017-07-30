import { bindActionCreators } from 'redux';
import { draw, init as initAll, merge, update } from './helpers';
import unbindedActions from './redux/actions';
import store from './redux/store';

let now = Date.now();
let time = 0;
let previous = now - 1;
let delta = now - previous;

const resetTime = () => {
    now = Date.now();
    time = 0;
    previous = now - 1;
    delta = now - previous;
    return true;
};

const actions = Object
.keys(unbindedActions)
.map(k => ({[k]: bindActionCreators(unbindedActions[k], store.dispatch)}))
.reduce(merge, {});

const keys = ['up', 'down', 'left', 'right', 'x', 'c']
.map(k => ({[k]: {is: {pressed: false}, was: {pressed: false}}}))
.reduce((a, b) => ({...a, ...b}), {});

const loCase = t => t.toLowerCase();
const mkKey = ({key}) => loCase( key.replace('Arrow', '').replace('Key', ''));
const isKey = ({key}) => !!keys[mkKey({key})];

const bindings = () => {
    document.addEventListener('keydown', event => {
        if (isKey(event)) {
            keys[mkKey(event)].was.pressed = false;
            keys[mkKey(event)].is.pressed = true;
        }
    });
    document.addEventListener('keyup', event => {
        if (isKey(event)) {
            keys[mkKey(event)].was.pressed = true;
            setTimeout(() => keys[mkKey(event)].was.pressed = false, 16);
            keys[mkKey(event)].is.pressed = false;
        }
    });
    return true;
};

const loop = ({actions, delta, store}) => () => {
    // actions.game.update({keys});
    update({actions, delta, keys, state: store.getState(), time});
    draw({delta, state: store.getState(), time});
    time = (now - store.getState().game.time) + delta;
    delta = now - previous;
    previous = now;
    now = Date.now();
    window.requestAnimationFrame(loop(({actions, delta, store})));
};

const run = ({actions, store}) => resetTime() && bindings() && loop({actions, delta, store})();

const init = ({actions, store}) => () => initAll(actions, true).then(() => run({actions, store}));

document.addEventListener('DOMContentLoaded', init({actions, store}));