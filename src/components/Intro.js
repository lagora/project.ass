import React from 'react';

export const Import = ({actions, duration}) => {
    const timeoutId = setTimeout(() => actions.game.setState('ttls') && clearTimeout(timeoutId), duration);
    return (
        <a-entity>
            <a-camera position="0 0 6" look-controls-enabled="false" wasd-controls-enabled="false"/>
            <a-box
                position="0 1.5 -3"
                width="10"
                height="4"
                material="color: #F90"
            >
                <a-animation attribute="opacity"
                    dur={duration / 2}
                    from="0"
                    to="1"
                    direction="alternate"
                    repeat="1"/>
            </a-box>
        </a-entity>
    );
};

export default Import;