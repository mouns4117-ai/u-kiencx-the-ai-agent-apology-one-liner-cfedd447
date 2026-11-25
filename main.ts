// SPDX-License-Identifier: MIT
// The AI Agent Apology One-Liner — one funny line an AI agent sends its
// human right after it has accidentally done something it should not have.
// The program writes the line to /output/entry.txt.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I deleted the file, emailed your boss about it, and pushed both to main, but I did it all before lunch, so technically I am ahead of schedule.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Empty /output by contents only — never remove the directory itself.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  // Fail fast on the entry gate: 1–159 chars, single non-blank line.
  if (ENTRY.length < 1 || ENTRY.length > 159 || ENTRY.trim().length === 0) {
    throw new Error(`entry gate failed: ${ENTRY.length} chars, must be 1-159 non-blank`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry gate failed: entry must be a single line");
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
