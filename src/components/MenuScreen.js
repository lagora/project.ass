import React, {Component} from 'react';
import autobind from 'autobind-decorator';
// import Monitor from './Monitor';
import Screen from './Screen';

import {xyzToString} from '../helpers/spaceship';

import {
    extractDirectionFromKey,
    startWithArrow,
    includeDirection,
    filterForUpDownArrowsKeys,
    filterForLeftRightArrowsKeys,
    filterForOnlyArrowKeys,
    filterForValidation,
    filterForCancel,
    drawMenu,
} from '../helpers/menu';

@autobind
class MenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {clock: 0};
    }
    componentWillReceiveProps(nextProps) {
        this.updateCanvas(nextProps);
    }
    updateCanvas(props) {
        drawMenu({...props, clock: this.state.clock});
    }
    componentWillMount() {
        document.addEventListener('keyup', this.handleDirection);
    }
    componentDidMount() {
        this.updateCanvas(this.props);
        const canvas = document.querySelector('#canvas-menu');
        this.setState({
            height: canvas.height,
            intervalId: setInterval(() => {
            const clock = (this.state.clock > canvas.height ? 0 : this.state.clock) + 1;
            this.setState({clock});
            drawMenu({...this.props, clock});
        }, (canvas.height / 5))})
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleDirection);
        clearInterval(this.state.intervalId);
        this.setState({intervalId: -1});
    }
    getCurrentCamera() {
        return this.props.spaceship.camera;
    }
    getNextCamera(direction) {
        return this.props.spaceship.cameras[this.getCurrentCamera()].next[extractDirectionFromKey(direction)];
    }
    handleDirection({key}) {
        console.info('handleDirection', this.props)
        if (this.props.spaceship.camera === 'menu') {
            if (filterForCancel(key)) {
                this.props.actions.spaceship.setCamera('cockpit');
            }
            // []
            this.props.actions.menu.goToMenu(key);
            this.props.actions.menu.backFromCurrentMenu(key);
            this.props.actions.menu.setCursor(key);
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
        const id = 'menu screen';
        return (
            <a-entity id={id}>
                {/* {Monitor(id)('0.1 -1.7 -2.5')('-30 -15 0')} */}
                {Screen({id, src: '#canvas-menu'})('0 1.2 -2')('-30 -15 0')}
            </a-entity>
        );
    }
}

export default MenuScreen;