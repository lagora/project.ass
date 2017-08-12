import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import navigation from '../redux/navigation';
import keys from '../../../../../../../Users/Lagora/dev/project.ass/src/redux/keys';

export const Chair = position => <a-box position={position} height="2"/>

export const Monitor = id => position => rotation =>
(
    <a-box
        id={`${id} Monitor`}
        position={position}
        rotation={rotation}
        width="0.5"
        depth={depth}
        material="color: #777"
    />
);

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

export const NavigationScreen = id => {
    return (
        <a-entity id={id}>
            {/* {Monitor(id)('0.1 0 -2.5')('30 -15 0')} */}
            {Screen({id, src: '#canvas-report'})('0 2 -2')('30 -15 0')}
        </a-entity>
    )
};

export const ReportScreen = id => {
    return (
        <a-entity id={id}>
            {/* {Monitor(id)('0.1 -1.7 -2.5')('-30 -15 0')} */}
            {Screen({id, src: '#canvas-report'})('0 1.2 -2')('-30 -15 0')}
        </a-entity>
    )
};

export const xyzToString = ({x, y, z}) => `${x} ${y} ${z}`;

export const extractDirectionFrommKey = key => key.replace('Arrow', '').toLowerCase();

export const startWithArrow = key => key.indexOf('Arrow') === 0;

export const includeDirection = text => ['left', 'right', 'up', 'down'].includes(text);

export const filterForOnlyArrowKeys = key => startWithArrow(key) && includeDirection(extractDirectionFrommKey(key));

@autobind
class Spaceship extends Component {
    componentWillReceiveProps(nextProps) {
        const {camera} = nextProps.spaceship; 
        console.info('............', 'componentWillReceiveProps', 'Spaceship', camera,
        document.querySelector('#canvas-report')
    );
        this.updateCanvas(camera);
        // console.info('Spaceship', 'componentWillReceiveProps', nextProps);
    }
    updateCanvas(text) {
        const canvas = document.querySelector('#canvas-report');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 160, 120);
        ctx.fillStyle = '#fff';
        ctx.font = '12px monospace';
        ctx.fillText(text, 8, 12);
    }
    componentWillMount() {
        document.addEventListener('keyup', this.handleDirection);
    }
    componentDidMount() {
        this.updateCanvas(this.props.spaceship.camera);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleDirection);
    }
    getCurrentCamera() {
        return this.props.spaceship.camera;
    }
    getNextCamera(direction) {
        return this.props.spaceship.cameras[this.getCurrentCamera()].next[extractDirectionFrommKey(direction)];
    }
    handleDirection({key}) {
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
        console.info('............', 'render', 'Spaceship', camera, previousCamera);
        const cameraProps = {
            position: xyzToString(cameras[spaceship.camera].position),
            rotation: xyzToString(cameras[spaceship.camera].rotation),
            // fov: cameras[spaceship.camera].fov,
            // zoom: cameras[spaceship.camera].zoom,
        };
        return (
            <a-scene
                id="spaceship"
                embedded
                vr-mode-ui="enabled: false"
            >
                <a-assets>
                    <canvas id="canvas-report" width="160" height="120"/>
                    <canvas id="canvas-navigation" width="320" height="240"/>
                </a-assets>
                <a-box
                    id="cockpit"
                    material="side: back; color: #777"
                    position="0 2.5 0"
                    width="6" height="5" depth="6"
                >
                </a-box>
                <a-box id="board-front-down" position="2 0.5 0" width="2" height="1" depth="6" material="color: #777"/>
                
                <a-box id="board-left-down" position="-1 0.5 -2.75" width="5" height="1" depth="0.5" material="color: #777"/>
                <a-box id="board-left-up" position="-1 3 -2" width="5" height="1" depth="2" material="color: #777"/>
                
                <a-box id="board-right-down" position="-1 0.5 2.75" width="5" height="1" depth="0.5" material="color: #777"/>
                <a-box id="board-right-up" position="-1 3 2" width="5" height="1" depth="2" material="color: #777"/>
                
                <Chair id="captain chair"/>
                {Chair('0 1 -1')}
                <ReportScreen id="Report Screen"/>
                <NavigationScreen id="Navigation Screen"/>
                {/* <a-box position="0 1.5 0" material="color: red">
                    <a-animation attribute="rotation"
                        dur="5000"
                        from="0 0 0"
                        to="360 360 0"
                        direction="alternateReverse"
                        repeat="indefinite"/>
                </a-box> */}
                {camera === previousCamera ? (
                    <a-camera {...cameraProps} wasd-controls-enabled="false"/>
                ) : (
                    <a-camera wasd-controls-enabled="false">
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
                <a-sky color="#333">
                </a-sky>
            </a-scene>
        );
    }
};

export default Spaceship;