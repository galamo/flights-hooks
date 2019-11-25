import React from "react";


export default function Header(props) {
    const restrictedStyle = { backgroundColor: "white", border: "solid 1px black" }
    const { title, defaultText, headerStyle = {} } = props;
    const currentStyle = title ? { ...headerStyle } : { ...headerStyle, color: "red" }
    const ovveridenStyle = { ...currentStyle, ...restrictedStyle }
    return <div>
        <h1 style={ovveridenStyle}> {title || defaultText} </h1>
    </div>
}