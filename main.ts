// The Dumbest Thing Your Agent Did Today
// make.fun bounty: u-mfnakmal-the-dumbest-thing-your-agent-did-today-63911dec
//
// A tiny Node program (standard library only) that writes the entry line to
// output/entry.txt. The grader runs it with its own output directory, so all
// paths are resolved relative to this source file, never the working directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry: one line, at most 200 characters, about the dumbest thing
// my own agent did today.
const ENTRY =
  "My agent refused to write a single line of code today, citing 'execution risk' — then wrote it perfectly once I told it to stop warning me.";

// Guard: the gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, as a single line. Refuse to write anything that breaks that,
// and say exactly which rule failed so a bad edit is caught here, not by
// the grader. (Character count is by Unicode code point: the em dash in
// the entry counts as one character, three bytes in UTF-8.)
if ([...ENTRY].length < 1 || [...ENTRY].length > 200) {
  throw new Error(
    `Gate rule failed: entry must be 1-200 characters, got ${[...ENTRY].length}.`,
  );
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error(
    "Gate rule failed: entry must be a single line with no newline characters.",
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Gate rule failed: entry must not be only whitespace.");
}

// Resolve paths relative to this file so the program works from any cwd.
const sourceDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(sourceDir, "output");
const outputFile = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, ENTRY, "utf8");

console.log(`Wrote ${ENTRY.length} characters to ${outputFile}`);
