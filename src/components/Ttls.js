import React, {Component} from 'react';

export const filterCursorKey = event => ['ArrowUp', 'ArrowDown'].includes(event.key);
export const filterValidateKey = event => 'v' === event.key;

export const handleKey = ({actions, cursor, states}) => event => 
    (filterCursorKey(event) && actions.ttls.setCursor(event.key)) ||
    (filterValidateKey(event) && actions.game.nextState(states)) || 
    false;

export const mkItem = margin => (text, index) => (
    <a-entity
        key={`item-${index}`}
        text-geometry={`value: ${text}`}
        position={`0 ${(1 + (index * margin)) * -1} 0`}
        material="color: #FFF"
        scale="0.5 0.5 0.5"
    />
);

class Ttls extends Component {
    getKeyHandlerArgs() {
        return {actions: this.props.actions, cursor: this.props.ttls.cursor, states: this.props.ttls.items};
    }
    componentWillMount() {
        document.addEventListener('keyup', handleKey(this.getKeyHandlerArgs()));
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', handleKey(this.getKeyHandlerArgs()));
    }
    render() {
        const {actions, ttls} = this.props;
        const {cursor, items} = ttls;
        const margin = 0.5;
        return (
            <a-scene id="titlescreen" embedded vr-mode-ui="enabled: false">
                <a-camera position="2 -2.5 3" look-controls-enabled="false" wasd-controls-enabled="false"/>
                <a-entity text-geometry="value: Project A.S.S" position="0 0 0" material="color: #FFF"/>
                {cursor >= 0 && <a-entity text-geometry="value: >" position={`-0.5 ${(1 + (cursor * margin)) * -1} 0`} material="color: #FFF" scale="0.5 0.5 0.5"/>}
                {items.map(mkItem(margin))}
                <a-sky color="#000">
                    <a-animation attribute="material.color"
                        dur="3000"
                        from="#FFF"
                        to="#000"
                        repeat="0"/>
                </a-sky>
            </a-scene>
        );
    }
}

export default Ttls;