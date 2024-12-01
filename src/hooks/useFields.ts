import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

import type { SettingsState, GeneratorFramesArgs } from "../types";
import { isNegative } from "../utils/isNegative";
import { formatValue } from "../utils/formatValue";

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

    const startTime = (startTimeValue === "" ? 0 : startTimeValue) as number;
    const endTime = (endTimeValue === "" ? 0 : endTimeValue) as number;
    const amount = (amountValue === "" ? 10 : amountValue) as number;

    const startError =
        typeof startTime === "number" &&
        typeof endTime === "number" &&
        startTime > endTime;

    const handleChangeSettings = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.currentTarget;

            if (isNegative(value)) {
                return;
            }

            setSettings((prev) => ({
                ...prev,
                [name]: formatValue(value),
            }));
        },
        [],
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
