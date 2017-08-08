import {combineReducers} from 'redux';
import game from './game';
import player from './player';
import spaceship from './spaceship';
import ttls from './ttls';

export const rootReducer = combineReducers({
    game,
    player,
    spaceship,
    ttls,
});

export default rootReducer;