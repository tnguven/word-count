import fs from 'node:fs';
import readline from 'node:readline';
import path from "node:path"

async function countText(filePath: string): Promise<Record<string, number>> {
  return new Promise((resolve, reject) => {
    const result = {
      lineCount: 0,
      wordCount: 0,
      charCount: 0,
    };
    const stream = fs.createReadStream(path.resolve(filePath));
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      result.lineCount += 1;
      result.charCount += line.length;
      result.wordCount += line.split(' ').filter(Boolean).length;
    });

    rl.on('close', () => {
      resolve(result);
    });

    stream.on('error', reject);
  });
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }

  try {
    const result = await countText(filePath);
    console.log(
      Object.entries(result).reduce(
        (text, [key, val]) => `${text ? ` ${text} ` : ''}${key}: ${val}`,
        ''
      )
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

void main();
