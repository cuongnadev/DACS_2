import { forwardRef, useEffect, useRef } from 'react';

const Input =  forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'input-wrapper ' +
                className
            }
            ref={input}
        />
    );
});

export default Input;