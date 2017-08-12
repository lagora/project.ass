// import {reducer} from '../helpers';
export const reducer = (mapping, initialState) => (state = initialState, action) => action && action.type && mapping[action.type] ? mapping[action.type](state, action) : state;

const initialState = {
    camera: 'menu',
    previousCamera: 'cockpit',
    cameras: {
        cockpit: {
            position: {x: -1, y: 2, z: 0},
            rotation: {x: 0, y: -90, z: 0},
            fov: 120,
            zoom: 1,
            next: {
                left: 'menu',
                down: 'space',
                // right: 'sidekick',
                up: 'space',
            }
        },
        space: {
            position: {x: 0, y: 2, z: 0},
            rotation: {x: 0, y: -90, z: 0},
            fov: 120,
            zoom: 1,
            next: {
                left: 'menu',
                up: 'cockpit',
                down: 'cockpit',
            }
        },
        menu: {
            position: {x: -0.05, y: 1.4, z: -1.7},
            rotation: {x: -30, y: -15, z: 0},
            fov: 80,
            zoom: 2,
            next: {
                // up: 'navigation',
                right: 'cockpit',
                // down: 'cockpit',
                // left: 'cockpit',
            },
        },
        // navigation: {
        //     position: {x: -0.25, y: 2.1, z: -1.8},
        //     rotation: {x: 60, y: -15, z: -15},
        //     fov: 80,
        //     zoom: 1,
        //     next: {
        //         down: 'report',
        //         right: 'cockpit',
        //         left: 'cockpit',
        //         up: 'cockpit',
        //     },
        // },
        // dialog: {
        //     position: {x: 2.5, y: 2, z: 0},
        //     rotation: {x: 0, y: 90, z: 0},
        //     fov: 120,
        //     zoom: 1,
        //     next: {
        //         left: 'cockpit',
        //         down: 'cockpit',
        //         up: 'space',
        //         right: 'space',
        //     },
        // },
        // sidekick: {
        //     position: {x: -0.5, y: 2, z: -0.5},
        //     rotation: {x: 0, y: -160, z: 0},
        //     fov: 120,
        //     zoom: 1,
        //     next: {
        //         left: 'cockpit',
        //         right: 'dialog',
        //         down: 'cockpit',
        //         up: 'space',
        //     },
        // },
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