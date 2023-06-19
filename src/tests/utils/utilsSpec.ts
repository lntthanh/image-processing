import { checkExistFile, getResizeImgPath } from '../../utils/utils';
import path from 'path';

const getInputFilePath = (fileName: string): string =>
    path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'asset',
        'full',
        fileName + '.jpg'
    );

const getOutputPath = (
    fileName: string,
    width: number,
    height: number
): string =>
    path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'asset',
        'thumb',
        `${fileName}_${width}_${height}.jpg`
    );

describe('FileUtils Test', () => {
    it('getResizeImagePath: Get system file name', () => {
        const fileName = 'image_1';
        const width = 200;
        const height = 200;
        const result = getResizeImgPath(fileName, 200, 200);
        const expectedInputPath = getInputFilePath(fileName);
        const expectedOutputPath = getOutputPath(fileName, width, height);

        expect(result.filePath).toEqual(expectedInputPath);
        expect(result.resultFilePath).toEqual(expectedOutputPath);
    });

    it('checkExistFile: exist file image_1', () => {
        const file = getInputFilePath('image_1');
        const isExist = checkExistFile(file);

        expect(isExist).toBe(true);
    });

    it('checkExistFile: not exist file image99', () => {
        const file = getInputFilePath('image99');
        const isExist = checkExistFile(file);
        expect(isExist).toBe(false);
    });
});
