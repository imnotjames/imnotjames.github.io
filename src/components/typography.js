import React from 'react';
import styled from 'styled-components';

const Heading1 = styled.h1`
  font-size: 1.85rem;
  text-align: ${({ center }) => center ? 'center' : 'left'};
`;

const Heading2 = styled.h2`

`;

const Heading3 = styled.h3`
  font-size: 1.15rem;
  text-align: ${({ center }) => center ? 'center' : 'left'};
`;


const LevelToElement = {
    1: Heading1,
    2: Heading2,
    3: Heading3,
}

const Heading = ({
    level = 1,
    center = false,
    children
}) => {
    const Element = LevelToElement[level] ?? Heading3

    return (
        <Element center={center}>
            {children}
        </Element>
    )
}

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6rem;
  text-align: ${({ center }) => center ? 'center' : 'left'};
`;

export {
    Heading,
    Text,
}