import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import React, { forwardRef } from 'react';

const Button = forwardRef(function Button(
    {
        to,
        href,
        filled = false,
        outline = false,
        rounded = false,
        disable = false,
        small = false,
        large = false,
        children,
        className,
        leftIcon,
        rightIcon,
        onClick,
        ...passProps
    },
    ref 
) {
    let Component = 'button';
    const props = {
        onClick,
        ref,
        ...passProps,
    };
    if (disable) {
        delete props.onClick;
    }
    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = [
        'btn-wrapper',
        className,
        filled ? 'filled' : '',
        outline ? 'outline' : '',
        rounded ? 'rounded' : '',
        disable ? 'disable' : '',
        small ? 'small' : '',
        large ? 'large' : '',
    ]
    .filter(Boolean)
    .join(' ');

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className="btn-icon">{leftIcon}</span>}
            <span className="btn-title flex-1">{children}</span>
            {rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </Component>
    );
});

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    filled: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
