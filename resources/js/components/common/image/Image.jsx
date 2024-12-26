import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, className = '', alt = '', ...prop }) => {
    const imageDefault = `/assets/images/Placeholder.png`;

    return (
        <img 
            src={src ? `/storage/${src}` : imageDefault }
            alt={alt ? alt + ' image' : 'image default'}
            className={className}
            {...prop}
        />
    );
};

Image.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;
