import * as fs from 'fs';
import * as path from 'path';

function getFileComments(text: string, commentMap: { [k: string]: string[] }): string[] {
  const identifier = '// @notes';
  const comments = [];
  const lines: string[] = text.split('\n');

  for (const _line of lines) {
    const line = _line.trim();
    if (line.trim().startsWith(identifier)) {
      const regex = /\[(.*?)\]/;
      const namespace = regex.exec(line)[1];
      const comment = line.replace(`${identifier}[${namespace}] `, '');

      if (commentMap[namespace]) {
        commentMap[namespace].push(comment);
      } else {
        // eslint-disable-next-line no-param-reassign
        commentMap[namespace] = [comment];
      }
    }
  }

  return comments;
}

async function getDirContents(dirPath: string, commentMap: { [k: string]: string[] }) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const isDir = fs.lstatSync(filePath).isDirectory();
    const isFile = Boolean(!isDir && filePath.match('.ts'));

    if (isFile) getFileComments(fs.readFileSync(filePath).toString(), commentMap);
    if (isDir) await getDirContents(filePath, commentMap);
  }
}

function createNotes(commentMap: { [k: string]: string[] }): string {
  let notes = '';
  const keys = Object.keys(commentMap).sort();

  for (const key of keys) {
    const title = `#### ${key[0].toUpperCase()}${key.slice(1).toLowerCase()}\n`;

    const values = commentMap[key];
    const list = `${values.map(v => `- ${v}`).join('\n')}\n\n`;

    notes += `${title}${list}`;
  }

  return notes ? `# Notes\n\n${notes}` : '';
}

async function main() {
  try {
    const commentMap: { [k: string]: string[] } = {};
    const dirPaths = ['./', '../client', '../server', '../shared'];

    // @notes[notes] Notes are generated off of any comment that starts with `@notes[NAMESPACE]`
    // @notes[notes] Namespaces are there to group related comments under one title

    for (const dir of dirPaths) {
      const dirPath = path.join(__dirname, dir);
      await getDirContents(dirPath, commentMap);
      console.log(`    -> completed: ${dirPath}`);
    }

    const notes = createNotes(commentMap);
    if (notes) fs.writeFileSync('NOTES.md', notes);
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  try {
    await main();
    console.log('\n  ✅ Notes completed!\n');
  } catch (e) {
    console.error(e);
  }
})();

