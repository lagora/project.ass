import React from 'react';

export const Ttls = props => {
    return (
        <a-sky color="#000">
            <a-animation attribute="material.color"
                dur="3000"
                from="#FFF"
                to="#000"
                repeat="0"/>
            <a-text
                text="Hello World;"
                material="color: #FFF"
            />
        </a-sky>
    );
};

export default Ttls;