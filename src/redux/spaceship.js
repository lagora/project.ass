import {actions as bindedActions} from '../index';
import {reducer} from '../helpers';

const initialState = {
    camera: 'cockpit',
    cameras: {
        cockpit: {x: 0, y: 0, z: 0},
    },
    playerPosition: {x: 0, y: 0, z: 0},
};

const SET_CAMERA = 'SET_CAMERA';

export const setState = camera => (dispatch, getState) => 
typeof initialState[camera] !== 'undefined' && dispatch({type: SET_CAMERA, camera});

export const actions = {setState};

export const mapping = {
    [SET_CAMERA]: (state, {camera}) => ({...state, camera}),
};

export default reducer(mapping, initialState);