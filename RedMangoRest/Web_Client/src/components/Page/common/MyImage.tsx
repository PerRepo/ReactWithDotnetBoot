import React from "react";

type Props = {
    src: string;
    alt?: string;
    width?: string;
    className?: string;
    style?: {};
};

export default function MyImage({
    src = "",
    alt = "Img",
    width,
    className,
    style,
}: Props) {
    return (
        <img
            src={src}
            onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
            }}
            alt={alt}
            width={width}
            className={`${className}`}
            style={style}
        />
    );
}
