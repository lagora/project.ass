import { bindActionCreators } from 'redux';
import { merge } from './helpers';
import unbindedActions from './redux/actions';
import store from './redux/store';

console.warn('store', store);

// // console.info('unbindedActions', unbindedActions);
const actions = Object
.keys(unbindedActions)
.map(k => ({[k]: bindActionCreators(unbindedActions[k], store.dispatch)}))
.reduce(merge, {});

const loop = ({actions, store}) => () => {
    window.requestAnimationFrame(loop(({actions, store})));
};

const run = ({actions, store}) => {
    console.info('ready', store);  
    loop({actions, store})();
};

const boot = ({actions, store}) => () => {
    actions.gfx.init({width: 240, height: 140})
    .then(() => {
        run({actions, store});
    });
};

document.addEventListener('DOMContentLoaded', boot({actions, store}));