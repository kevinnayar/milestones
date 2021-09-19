import * as fs from 'fs';
import * as path from 'path';

function getFileComments(text: string, commentMap: { [k: string]: string[] }): string[] {
  const notePrefix = 'NOTES:';
  const identifier = `// [${notePrefix}`;
  const comments = [];
  const lines: string[] = text.split('\n');

  for (const line of lines) {
    if (line.trim().startsWith(identifier)) {
      const regex = /\[(.*?)\]/;
      const key = regex.exec(line)[1].replace(notePrefix, '');
      const value = line.split('] ')[1];

      if (commentMap[key]) {
        commentMap[key].push(value);
      } else {
        // eslint-disable-next-line no-param-reassign
        commentMap[key] = [value];
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

  for (const [header, values] of Object.entries(commentMap)) {
    const title = `## ${header[0].toUpperCase()}${header.slice(1).toLowerCase()}\n`;
    const list = `${values.map(v => `- ${v}`).join('\n')}\n\n`;
    notes += `${title}${list}`;
  }

  return notes ? `# Notes\n${notes}` : '';
}

async function main() {
  try {
    const commentMap: { [k: string]: string[] } = {};
    const dirPaths = [
      './',
      '../client',
      '../server',
      '../shared',
    ];

    for (const dir of dirPaths) {
      const dirPath = path.join(__dirname, dir);
      await getDirContents(dirPath, commentMap);
      console.log(`    -> completed: ${dirPath}`);
    }

    const notes = createNotes(commentMap);
    if (notes) fs.writeFileSync('notes.md', notes);
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

