import * as React from "react";
import { Button,  ButtonVariant, Flex, FlexItem} from '@patternfly/react-core';
import './counter.scss';

const Counter: React.FC = () => {
    return(
        
<div className="countdown">
  <svg viewBox="-50 -50 100 100" stroke-width="10">
    <circle r="45"></circle>
    <circle r="45" stroke-dasharray="282.7433388230814" stroke-dashoffset="282.7433388230814px"></circle>
  </svg>
</div>
    );
};

export default Counter;