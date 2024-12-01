export const formatValue = (value: string) => {
    if (value === "") {
        return "";
    }

    return Number(value);
};
