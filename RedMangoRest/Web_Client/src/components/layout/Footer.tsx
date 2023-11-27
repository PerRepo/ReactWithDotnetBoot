import React from "react";

type Props = {};

export default function Footer({}: Props) {
    return (
        <div className=" footer fixed-bottom text-center p-3 bg-dark text-white">
            &copy;Made with <i className="bi bi-heart-fill"></i> by Per
        </div>
    );
}
