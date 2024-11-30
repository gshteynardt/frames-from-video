import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

export const useFields = () => {
    const [time, setTime] = useState({
        start: '',
        end: '',
    });

    const startTime = time.start;
    const endTime = time.end;
    const startError = startTime && endTime && startTime > endTime;

    const handleChangeTime = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setTime((prev) => ({
            ...prev,
            [name]: Number(value),
        }))
    }, []);

    return {
        startTime,
        endTime,
        startError,
        handleChangeTime,
    }
};
