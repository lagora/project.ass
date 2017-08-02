import {combineReducers} from 'redux';
import game from './game';
import gfx from './gfx';
import intro from './intro';
import keys from './keys';
import menu from './menu';
import ttls from './ttls';

export const rootReducer = combineReducers({
    game,
    gfx,
    intro,
    keys,
    menu,
    ttls,
});

export default rootReducer;