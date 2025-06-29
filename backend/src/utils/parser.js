import DatauriParser from 'datauri/parser.js';
import path from 'path';

const parser = new DatauriParser();

export default function getDataUri(file) {
  return parser.format(path.extname(file.originalname).toString(), file.buffer).content;
}
