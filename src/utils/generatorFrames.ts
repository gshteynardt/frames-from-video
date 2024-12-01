import { GeneratorFramesArgs, ExtractFramesArgs } from "../types";

export const loadVideo = (videoUrl: string): Promise<HTMLVideoElement> => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.crossOrigin = "Anonymous";
    video.src = videoUrl;

    return new Promise((resolve, reject) => {
        video.addEventListener("loadeddata", () => resolve(video), {
            once: true,
        });

        video.addEventListener("error", () => reject("Failed to load video"), {
            once: true,
        });
    });
};

export const extractFrame = async (
    video: HTMLVideoElement,
    time: number,
): Promise<string> => {
    video.currentTime = time;

    return new Promise((resolve, reject) => {
        const eventCallback = () => {
            video.removeEventListener("seeked", eventCallback);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (!context) {
                reject("Failed to extract ");
                return;
            }

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
        };

        video.addEventListener("seeked", eventCallback, { once: true });
    });
};

export const extractFrames = async ({
    video,
    amount,
    startTime,
    endTime,
    type,
}: ExtractFramesArgs): Promise<string[]> => {
    const duration = video.duration;

    if (startTime && startTime > duration) {
        startTime = duration;
    }

    if (!endTime || endTime > duration) {
        endTime = duration;
    }

    const timeRange = endTime - (startTime ?? 0);

    const totalFrames =
        type === "fps"
            ? timeRange * amount
            : Math.min(amount, Math.floor(timeRange * video.duration));

    const frames: string[] = [];

    for (let time = 0; time < duration; time += duration / totalFrames) {
        try {
            const frame = await extractFrame(video, time);
            frames.push(frame);
        } catch (error) {
            console.error(error);
        }
    }

    return frames;
};

/**
 * Main function to extract frames from a video by URL.
 * @param videoUrl The URL of the video file.
 * @param amount The number of frames to extract (per second or total).
 * @param method The method of extraction (fps or totalFrames).
 * @returns An array of base64 strings representing the extracted frames.
 */
export const generatorFrames = async ({
    videoUrl,
    startTime,
    endTime,
    amount,
    type,
}: GeneratorFramesArgs): Promise<string[]> => {
    const video = await loadVideo(videoUrl);
    return extractFrames({ video, amount, startTime, endTime, type });
};
