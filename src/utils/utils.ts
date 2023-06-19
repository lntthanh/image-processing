import fs from 'fs';
import path from 'path';

interface FileResult {
    filePath: string;
    resultFilePath: string;
}

/**
 * Get the path based on fileName
 * @param fileName The file name to display
 * @param width The width of the image
 * @param height The height of the image
 * @returns
 */
export const getResizeImgPath = (
    fileName: string,
    width: number,
    height: number
): FileResult => {
    const filePath = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'asset',
        'full',
        fileName + '.jpg'
    );
    const resultFilePath = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'asset',
        'thumb',
        `${fileName}_${width}_${height}.jpg`
    );

    return { filePath, resultFilePath };
};

/**
 * Check the file exist
 * @param file The file path
 * @returns true if the file exists, false otherwise
 */
export const checkExistFile = (file: string): boolean => {
    return fs.existsSync(file);
};
