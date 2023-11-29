import React from "react";

type Props = {
    type?: string;
    size?: number;
};

export default function MiniLoader({ type = "warning", size = 100 }: Props) {
    return (
        <div
            className={`spinner-border text-${type} `}
            style={{ scale: `${size}%` }}>
            {" "}
        </div>
    );
}
