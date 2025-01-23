import React from "react";
import './styles/stocken.css'

interface StokenProps {
    stokenValue: number;
    color?: string;
}

const Stoken: React.FC<StokenProps> = ({ stokenValue, color = "#00ce93" }) => {
    return (
        <div className="token-display" style={{ backgroundColor: color }}>
            <div className="circle"></div>
            <span className="token">{stokenValue} Stoken</span>
        </div>
    );
};

export default Stoken;