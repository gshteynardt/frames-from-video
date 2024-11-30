const now = new Date().toDateString();

export const getAnchorDownloadAttribute = (index: number) => {
    return `${now}-${index + 1}.png`;
};
