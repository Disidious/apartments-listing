export const truncateString = (str: string, max: number) => {
    if (str.length > max) {
        return str.substring(0, Math.max(max - 3, 1)) + "..."
    }

    return str
}