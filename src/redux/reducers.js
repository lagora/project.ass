import {combineReducers} from 'redux';
import game from './game';
import menu from './menu';
import player from './player';
import spaceship from './spaceship';
import ttls from './ttls';

export const rootReducer = combineReducers({
    game,
    menu,
    player,
    spaceship,
    ttls,
});

export default rootReducer;