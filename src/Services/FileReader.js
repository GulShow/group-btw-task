import fs from 'fs';

export default class FileReader {
  static read(path, encoding = 'utf-8') {
    return fs.readFileSync(path, { encoding });
  }

  static exists(path) {
    try {
      fs.accessSync(path);
      return true;
    } catch (e) {
      return false;
    }
  }
}
