export type GeneratorFramesArgs = {
    videoUrl: string;
    startTime: number;
    endTime: number;
    amount: number;
    type: 'fps' | 'totalFrames';
}

export type ExtractFramesArgs = {
    video: HTMLVideoElement;
    startTime: number;
    endTime: number;
    amount: number;
    type: 'fps' | 'totalFrames';
}
