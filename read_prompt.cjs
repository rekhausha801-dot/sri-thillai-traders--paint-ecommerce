const fs = require('fs');
const readline = require('readline');

async function readPrompt() {
  const fileStream = fs.createReadStream('C:/Users/Devi/.gemini/antigravity/brain/2f1b9942-3e98-41c2-b781-33314415348c/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":4348')) {
      const obj = JSON.parse(line);
      console.log(obj.content);
    }
  }
}
readPrompt();
