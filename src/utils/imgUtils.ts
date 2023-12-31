import { checkExistFile, getResizeImgPath } from './utils';
import sharp from 'sharp';

/**
 * Image size
 */
interface SizeImg {
  width: number;
  height: number;
}

/**
 * Image resize options
 */
interface ResizeImgOps {
  size: SizeImg;
}

/**
 * Resize image, if image was resized, use image in cache folder
 *
 * @param fileName The file name to resize
 * @param options The options to apply to the resize
 * @returns image URL
 */
export const resizeImg = async (fileName: string, options: ResizeImgOps): Promise<string> => {
  const image = getResizeImgPath(fileName, options.size.width, options.size.height);

  // Check source image exists
  if (!checkExistFile(image.filePath)) {
    throw new Error('Image was not found!');
  }

  // Check result image exists, if not, resize the image
  if (!checkExistFile(image.resultFilePath)) {
    try {
      await sharp(image.filePath)
        .resize(options.size.width, options.size.height)
        .jpeg()
        .toFile(image.resultFilePath);
      console.log(
        `${fileName} was resized to {${options.size.width}, ${options.size.height}}`
      );
    } catch (err: unknown) {
      console.log('Cannot resize image, error', err);
      throw new Error(`Unable to resize the image with the given dimensions`);
    }
  }
  console.log(`File Path: ${image.resultFilePath}`);

  // Return result image path
  return image.resultFilePath;
};
