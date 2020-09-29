import {useEffect, useRef} from 'react';

function useKey(key, cb, level) {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    })

    useEffect(() => {
        function handle(event) {
            if (event.code === key && level === 0) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("keypress", handle);
        return () => document.removeEventListener("keypress", handle);
    }, [key, level])
}

export default useKey;