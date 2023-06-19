/**
 * Validate number greater than zero
 * @param value The number to check
 * @returns true if the value is number and greater than zero
 */
export const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value) && Number.parseInt(value) > 0;
};

/**
 * The method from fileName-reserved-regex
 * @returns
 */
export default function fileNameReservedRegex(): RegExp {
    // eslint-disable-next-line no-control-regex
    return /[<>:"/\\|?*\u0000-\u001F]/g;
}

/**
 * The method from fileName-reserved-regex
 * @returns
 */
export function windowsReservedNameRegex(): RegExp {
    return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
}

/**
 * The method to check valid file name
 * @param fileName The fileName to check valid
 * @returns
 */
export const isValidFileName = (fileName: string): boolean => {
    if (!fileName || fileName.length > 255) {
        return false;
    }

    if (fileNameReservedRegex().test(fileName) || windowsReservedNameRegex().test(fileName)) {
        return false;
    }

    return !(fileName === '.' || fileName === '..');
};
