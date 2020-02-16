import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div>
        <h3>We couldn't find what you were looking for: </h3>
        <Link to="/">Here you can browse the registered classes</Link>
    </div>
);

export default NotFound;