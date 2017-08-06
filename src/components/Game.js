import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../redux/actions';

import Intro from './Intro';
import Ttls from './Ttls';

export const Game = props => {
    const {actions, game} = props;
    const {state} = game;
    const ttlsProps = {...props};
    if (typeof state === 'undefined') {
        actions.game.setState('intro');
    }
    return (
        state === 'intro' ? <Intro actions={actions} duration={6000}/> : 
        state === 'ttls' ? <Ttls {...ttlsProps}/> : 
        false
    );
};

export const binder = dispatch => (a, k) => ({...a, [k]: bindActionCreators(actions[k], dispatch)});
export const binding = (actions, binder, dispatch) => ({actions: Object.keys(actions).reduce(binder(dispatch), {})});

export default connect(
    state => ({...state}),
    dispatch => binding(actions, binder, dispatch)
)(Game);