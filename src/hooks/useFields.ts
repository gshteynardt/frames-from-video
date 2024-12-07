import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

import type { SettingsState, GeneratorFramesArgs } from "../types";

export const useFields = () => {
    const [settings, setSettings] = useState<SettingsState>({
        start: "",
        end: "",
        amount: "",
    });

    const [generationType, setGenerationtype] =
        useState<GeneratorFramesArgs["type"]>("totalFrames");

    const startTimeValue = settings.start;
    const endTimeValue = settings.end;
    const amountValue = settings.amount;
    const fpsType = generationType === 'fps';
    const startTime = (startTimeValue === "" ? 0 : startTimeValue) as number;
    const endTime = (endTimeValue === "" ? 0 : endTimeValue) as number;
    const amount = (amountValue === "" || fpsType ? 10 : amountValue) as number;

    const startError =
        typeof startTime === "number" &&
        typeof endTime === "number" &&
        startTime > endTime;

    const handleChangeSettings = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.currentTarget.name;
            let value = e.currentTarget.value;

            if (value.startsWith("-")) {
                return;
            }

            if (fpsType && name === 'amount' && Number(value) > 5) {
                value = '5';
            }

            setSettings((prev) => ({
                ...prev,
                [name]: value === "" ? "" : Number(value),
            }));
        },
        [fpsType],
    );

    const handleChangeType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setGenerationtype(value as GeneratorFramesArgs["type"]);
    }, []);

    return {
        startTimeValue,
        endTimeValue,
        amountValue,
        amount,
        startTime,
        endTime,
        startError,
        generationType,
        handleChangeSettings,
        handleChangeType,
    };
};
