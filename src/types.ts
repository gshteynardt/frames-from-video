export type GeneratorFramesArgs = {
    startTime?: number;
    endTime?: number;
    videoUrl: string;
    amount: number;
    type: "fps" | "totalFrames";
};

export type ExtractFramesArgs = {
    startTime?: number;
    endTime?: number;
    video: HTMLVideoElement;
    amount: number;
    type: "fps" | "totalFrames";
};

export type SettingsState = {
    start: string | number;
    end: string | number;
    amount: string | number;
};
