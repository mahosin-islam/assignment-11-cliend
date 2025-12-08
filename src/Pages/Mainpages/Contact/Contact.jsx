import React from 'react';
import { useLocation } from 'react-router';

const Contact = () => {
    const location=useLocation();
    console.log('location',location)
    return (
        <div>
            <h2>contact pages</h2>
        </div>
    );
};

export default Contact;