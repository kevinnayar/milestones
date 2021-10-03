import * as fs from 'fs';
import * as path from 'path';

function titleCase(text: string): string {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

function writeNotesToFile(outputFile: string, mutableCommentMap: { [k: string]: string[] }) {
  let notes = '# Notes\n\n';

  const keys = Object.keys(mutableCommentMap).sort();

  for (const key of keys) {
    const title = `#### ${titleCase(key)}`;

    const values = mutableCommentMap[key];
    const list = `${values.map((v) => `- ${v}`).join('\n')}`;

    notes += `${title}\n${list}\n\n`;
  }

  fs.writeFileSync(outputFile, notes);
}

function insertFileCommentsInMap(rawText: string, mutableCommentMap: { [k: string]: string[] }) {
  const identifier = '// @notes';
  const lines: string[] = rawText.split('\n');

  for (const l of lines) {
    const line = l.trim();

    if (line.startsWith(identifier)) {
      const regex = /\[(.*?)\]/;
      const namespace = regex.exec(line)[1];
      const comment = line.replace(`${identifier}[${namespace}] `, '');

      if (mutableCommentMap[namespace]) {
        mutableCommentMap[namespace].push(comment);
      } else {
        // eslint-disable-next-line no-param-reassign
        mutableCommentMap[namespace] = [comment];
      }
    }
  }
}

async function recursivelyInsertDirFileCommentsInMap(dirPath: string, mutableCommentMap: { [k: string]: string[] }) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const isDir = fs.lstatSync(filePath).isDirectory();
    const isFile = Boolean(!isDir && filePath.match('.ts'));

    if (isFile) insertFileCommentsInMap(fs.readFileSync(filePath).toString(), mutableCommentMap);
    if (isDir) await recursivelyInsertDirFileCommentsInMap(filePath, mutableCommentMap);
  }
}

async function main() {
  try {
    const dirPaths = ['./', '../client', '../server', '../common'];
    const outputFile = 'NOTES.md';
    const mutableCommentMap: { [k: string]: string[] } = {};

    // @notes[notes] Notes are generated off of any comment that starts with `// @notes[NAMESPACE]`
    // @notes[notes] Namespaces are there to group related comments under one title

    for (const dir of dirPaths) {
      const dirPath = path.join(__dirname, dir);
      await recursivelyInsertDirFileCommentsInMap(dirPath, mutableCommentMap);
      console.log(`    -> completed: ${dirPath}`);
    }

    writeNotesToFile(outputFile, mutableCommentMap);
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  try {
    await main();
    console.log('\n  ✅ Notes completed!\n');
  } catch (e) {
    console.log('Could not generate notes');
    console.error(e);
  }
})();

