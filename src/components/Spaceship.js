import React, {Component} from 'react';
import autobind from 'autobind-decorator';

@autobind
class Spaceship extends Component {
    componentWillReceiveProps(nextProps) {
        console.info('Spaceship', 'componentWillReceiveProps', nextProps);
    }
    render() {
        return (
            <a-scene
                id="spaceship"
                embedded
                vr-mode-ui="enabled: false"
                effects="bloom, fxaa" bloom="radius: 0.66" fxaa
            >
                <a-box position="0 1.5 0" material="color: red">
                    <a-animation attribute="rotation"
                        dur="5000"
                        from="0 0 0"
                        to="360 360 0"
                        direction="alternateReverse"
                        repeat="indefinite"/>
                </a-box>
                <a-camera position="0 0 1.5" look-controls-enabled="false" wasd-controls-enabled="false"/>
                <a-sky color="#333">
                </a-sky>
            </a-scene>
        );
    }
};

export default Spaceship;