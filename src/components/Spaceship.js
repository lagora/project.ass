import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import navigation from '../redux/navigation';
// require('aframe-faceset-component');
// require('aframe-star-component');

import {
    xyzToString,
    extractDirectionFromKey,
    startWithArrow,
    includeDirection,
    filterForUpDownArrowsKeys,
    filterForOnlyArrowKeys,
    filterForValidation,
    filterForCancel,
    drawMenu,
} from '../helpers/spaceship';

export const Chair = position => <a-box position={position} height="2"/>

// export const Monitor = id => position => rotation =>
// (
//     <a-box
//         id={`${id} Monitor`}
//         position={position}
//         rotation={rotation}
//         width="0.5"
//         depth={depth}
//         material="color: #777"
//     />
// );

export const Screen = ({id, src}) => position => rotation =>
(
    <a-plane
        id={`${id} Screen`}
        position={position}
        rotation={rotation}
        width="0.75"
        height="0.5"
        material={`src: ${src}`}
    />
);

export const MenuScreen = ({id}) => 
(
    <a-entity id={id}>
        {/* {Monitor(id)('0.1 -1.7 -2.5')('-30 -15 0')} */}
        {Screen({id, src: '#canvas-menu'})('0 1.2 -2')('-30 -15 0')}
    </a-entity>
)

@autobind
class Spaceship extends Component {
    componentWillReceiveProps(nextProps) {
        const {camera} = nextProps.spaceship; 
        this.updateCanvas(nextProps);
        console.info('Spaceship', 'componentWillReceiveProps', camera);
    }
    updateCanvas(props) {
        drawMenu(props);
    }
    componentWillMount() {
        document.addEventListener('keyup', this.handleDirection);
    }
    componentDidMount() {
        this.updateCanvas(this.props);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleDirection);
    }
    getCurrentCamera() {
        return this.props.spaceship.camera;
    }
    getNextCamera(direction) {
        return this.props.spaceship.cameras[this.getCurrentCamera()].next[extractDirectionFromKey(direction)];
    }
    handleDirection({key}) {
        if (this.props.spaceship.camera === 'menu') {
            if (filterForCancel(key)) {
                this.props.actions.spaceship.setCamera('cockpit');
            }
            if (filterForValidation(key)) {
                
            }
            if (filterForUpDownArrowsKeys(key)) {
                this.props.actions.menu.setCursor({key});
            }
        } else 
        if (filterForOnlyArrowKeys(key)) {
            const nextCamera = this.getNextCamera(key);
            if  (nextCamera) {
                this.lookAt(nextCamera);
            }
        }
    }
    lookAt(cameraPreset) {
        this.props.actions.spaceship.setCamera(cameraPreset);
    }
    render() {
        const {spaceship} = this.props;
        const {camera, cameras, previousCamera} = spaceship;
        const cameraProps = {
            position: xyzToString(cameras[spaceship.camera].position),
            rotation: xyzToString(cameras[spaceship.camera].rotation),
        };
        return (
            <a-scene
                id="spaceship"
                embedded
                vr-mode-ui="enabled: false"
            >
                <a-assets>
                    <canvas id="canvas-menu" width="640" height="480"/>
                </a-assets>
                <a-box
                    id="cockpit-ground"
                    position="0 -0.5 0"
                    width="6" height="1" depth="7" material="color: #777"
                />

                <a-box
                    id="cockpit-wall-left"
                    position="-0.75 0 -3"
                    width="4.5" height="2" depth="1" material="color: #777"
                />
                <a-box
                    id="cockpit-wall-right"
                    position="-0.75 0 3"
                    width="4.5" height="2" depth="1" material="color: #777"
                />

                <a-box
                    id="board-front-down"
                    position="2 0.5 0"
                    rotation="0 0 -30"
                    width="2" height="0.75" depth="6" material="color: #777"
                />
                
                <Chair id="captain chair"/>
                {Chair('0 1 -1')}
                {Chair('0 1 1')}
                <MenuScreen id="Menu Screen"/>
                {camera === previousCamera ? (
                    <a-camera {...cameraProps}
                        look-controls-enabled="false"
                        wasd-controls-enabled="false"
                    />
                ) : (
                    <a-camera
                        look-controls-enabled="false"
                        wasd-controls-enabled="false"
                    >
                        {['position', 'rotation'].map(k => 
                            <a-animation
                                key={`camera-animation-${k}`}
                                attribute={k}
                                from={xyzToString(cameras[previousCamera][k])}
                                to={xyzToString(cameras[camera][k])}
                            />
                        )}
                    </a-camera>
                )}
                <a-sky color="#000">
                </a-sky>
                {/* <a-entity star="points: 23"></a-entity> */}
            </a-scene>
        );
    }
};

export default Spaceship;