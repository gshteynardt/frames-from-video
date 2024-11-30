import { useState, useCallback } from 'react'
import type { ChangeEvent } from 'react';

import { generatorFrames } from '../utils/generatorFrames';

export const useGenerateFrames = () => {
    const [images, setImages] = useState<string[]>();
    const [loading, setLoading] = useState(false);

    const onInputFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        setImages([]);
        setLoading(true);

        const fileList = event.target.files;

        if (!fileList) {
            return;
        }

        const [file] = fileList;
        const fileUrl = URL.createObjectURL(file);

        try {
            const frames = await generatorFrames({
                videoUrl: fileUrl,
                amount: 100,
                startTime: 0,
                endTime: 30,
                type: "totalFrames",
            });

            setImages(frames);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }        
    }, []);

    return  {
        images,
        loading,
        onInputFile,
    }
};
