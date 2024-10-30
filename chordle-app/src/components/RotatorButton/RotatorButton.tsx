import React from 'react';
import './RotatorButton.css';


type RotatorButtonProps = {
  onClick: () => void;
};

const RotatorButton: React.FC<RotatorButtonProps> = ({ onClick }) => {
  return (
    <div>
      <div className="example-wrap">
        <div className="button-wrap-1 example">
          <button className="clicker" onClick={onClick}>Play</button>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default RotatorButton;
