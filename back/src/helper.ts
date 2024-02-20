import * as fs from 'fs';
import * as path from 'path';

/**
 * Clean all image linked with current userId(uuid)
 * @param filename
 */
export function cleanImageFile(filename: string) {
  const IMAGE_DIR_PATH = 'images/avatar/';
  const extensions = ['.png', '.jpg', '.jpeg', '.gif'];

  for (const extension of extensions) {
    const filePath = path.join(IMAGE_DIR_PATH, filename + extension);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
