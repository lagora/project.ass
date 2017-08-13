import React from 'react';

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

export default Screen;