import React from 'react';
import MenuScreen from './MenuScreen';
import {xyzToString} from '../helpers/spaceship';

export const Chair = position => <a-box position={position} height="2"/>

export const Spaceship = props => {
    const {spaceship} = props;
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
                <canvas id="canvas-menu" width="240" height="160"/>
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
            <MenuScreen id="Menu Screen" {...props}/>
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
            <a-sky color="#000"></a-sky>
        </a-scene>
    );
};

export default Spaceship;