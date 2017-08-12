import {actions as bindedActions} from '../index';
import {reducer} from '../helpers';
import {left, right} from 'aframe';

const initialState = {
    camera: 'report',
    previousCamera: 'cockpit',
    cameras: {
        cockpit: {
            position: {x: 0, y: 1.6, z: -1},
            rotation: {x: 0, y: -90, z: 0},
            zoom: 1,
            next: {
                left: 'report',
                up: 'navigation',
            }
        },
        report: {
            position: {x: -0.05, y: 1.4, z: -1.7},
            rotation: {x: -30, y: -15, z: 0},
            zoom: 2,
            next: {
                up: 'navigation',
                right: 'cockpit',
            },
        },
        navigation: {
            position: {x: -0.05, y: 1.8, z: -1.7},
            rotation: {x: 30, y: -15, z: 0},
            zoom: 1,
            next: {
                down: 'report',
                right: 'cockpit'
            },
        },
    },
    playerPosition: {x: 0, y: 0, z: 0},
};

const SET_PREVIOUS_CAMERA = Symbol('Set the previous camera').toString();
const SET_CAMERA = Symbol('Set the current camera').toString();

export const setPreviousCamera = previousCamera => (dispatch, getState) => {
    return dispatch({type: SET_CAMERA, previousCamera});
};

export const setCamera = nextCamera => (dispatch, getState) => {
    const {spaceship} = getState();
    const {camera} = spaceship;
    console.warn('SetCamera', camera, nextCamera, spaceship);
    dispatch({type: SET_PREVIOUS_CAMERA, previousCamera: camera})
    dispatch({type: SET_CAMERA, camera: nextCamera});
};

export const actions = {setCamera};

export const mapping = {
    [SET_PREVIOUS_CAMERA]: (state, {previousCamera}) => ({...state, previousCamera}),
    [SET_CAMERA]: (state, {camera}) => ({...state, camera}),
};

export default reducer(mapping, initialState);