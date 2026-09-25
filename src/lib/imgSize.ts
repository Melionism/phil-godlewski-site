import { readFileSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

/**
 * Real pixel dimensions of a file under public/, read once at build time.
 * Setting these as width/height attributes lets the browser reserve the
 * correctly-proportioned box before the file loads (CSS still controls the
 * final rendered size), instead of the layout jumping once it does.
 */
export function imgSize(publicPath: string): { width: number; height: number } {
  const abs = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
  const { width, height } = imageSize(readFileSync(abs));
  return { width, height };
}
