import React, {Component} from 'react';
import autobind from 'autobind-decorator';

export const Chair = () => <a-box position="0 -1.5 -1" height="2"/>

export const NavigationScreen = ({id}) => {
    return (
        <a-entity id={id}>
            <a-box position="0.1 0 -2.5" rotation="30 -15 0" width="2" depth="0.7" material="color: #777"/>
            <a-plane id="navigation screen" position="0 -0.2 -2" rotation="30 -15 0" width="2"/>
        </a-entity>
    )
};

export const ReportScreen = ({id}) => {
    return (
        <a-entity id={id}>
            <a-box position="0.1 -1.7 -2.5" rotation="-30 -15 0" width="2" depth="0.7" material="color: #777"/>
            <a-plane id="navigation screen" position="0 -1.5 -2" rotation="-30 -15 0" width="2"/>
        </a-entity>
    )
};

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
            >
                <a-box
                    id="cockpit"
                    material="side: back; color: #777"
                    position="0 2.5 0"
                    width="6" height="5" depth="6"
                >
                    <a-box id="board-front-down" position="2 -2 0" width="2" height="1" depth="6" material="color: #777"/>
                    
                    <a-box id="board-left-down" position="-1 -2 -2.75" width="5" height="1" depth="0.5" material="color: #777"/>
                    <a-box id="board-left-up" position="-1 1 -2" width="5" height="1" depth="2" material="color: #777"/>
                    
                    <a-box id="board-right-down" position="-1 -2 2.75" width="5" height="1" depth="0.5" material="color: #777"/>
                    <a-box id="board-right-up" position="-1 1 2" width="5" height="1" depth="2" material="color: #777"/>
                    
                    <Chair id="captain chair"/>
                    <ReportScreen id="Captain report Screen"/>
                    <NavigationScreen id="Captain Navigation Screen"/>
                </a-box>
                {/* <a-box position="0 1.5 0" material="color: red">
                    <a-animation attribute="rotation"
                        dur="5000"
                        from="0 0 0"
                        to="360 360 0"
                        direction="alternateReverse"
                        repeat="indefinite"/>
                </a-box> */}
                <a-camera position="0 0 -1" rotation="0 -90 0" wasd-controls-enabled="false"/>
                <a-sky color="#333">
                </a-sky>
            </a-scene>
        );
    }
};

export default Spaceship;