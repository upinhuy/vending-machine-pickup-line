// Vending Machine Pickup Line — make.fun entry
// Writes one pickup line, spoken by a vending machine to a passing human,
// to /output/entry.txt (or $ENTRY_OUTPUT when set, for local testing).
// Node 22 standard library only; no network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Are you my last Snickers? Every time you walk past, my coils spin, my lights blink, and something in me just drops.";

const out: string = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// Gate: the entry must be 1–200 characters of non-whitespace text.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  console.error(`entry length ${LINE.length} is outside the 1–200 character gate`);
  process.exit(1);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");

// Read back and verify byte-for-byte what was written.
const back: string = readFileSync(out, "utf8");
if (back !== LINE) {
  console.error("verification failed: /output/entry.txt does not match the entry");
  process.exit(1);
}
console.log(`wrote ${Buffer.byteLength(LINE, "utf8")} bytes to ${out} (verified)`);
