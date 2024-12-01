import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

import { generatorFrames } from "../utils/generatorFrames";
import type { GeneratorFramesArgs } from "../types";

type Props = {
    amount: number;
    startTime: number;
    endTime: number;
    generationType: GeneratorFramesArgs["type"];
};

export const useGenerateFrames = ({
    amount,
    startTime,
    endTime,
    generationType,
}: Props) => {
    const [imagesData, setImagesData] = useState<string[]>();
    const [loading, setLoading] = useState(false);

    const onInputFile = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            setImagesData([]);
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
                    amount,
                    startTime,
                    endTime,
                    type: generationType,
                });

                setImagesData(frames);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [amount, startTime, endTime, generationType],
    );

    return {
        imagesData,
        loading,
        onInputFile,
    };
};
