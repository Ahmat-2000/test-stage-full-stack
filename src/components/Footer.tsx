import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-10 mb-5 text-sm text-center sm:text-base">
            <div className="py-2 ">
                <p className='text-gray-400'>&copy; {currentYear} Ahmat | All Rights Reserved.</p>
                <p className='text-gray-400'>Designed & Developed by Ahmat</p>
            </div>
        </footer>
    );
}

export default Footer;
