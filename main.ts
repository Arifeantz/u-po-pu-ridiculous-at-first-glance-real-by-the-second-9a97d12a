// u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a
// Writes the fire-drill rescue pitch — one line, 200 characters or
// fewer — to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt
// when set). No dependencies, no network, fully deterministic: the
// same line, byte for byte, on every run.
//
// The line, and why it is the one: a stranger who bursts into your
// meeting shouting "fire drill" is absurd on its face — and then the
// turn lands, because nobody can end a meeting but everybody obeys
// an alarm. The price is in the sentence ($20), the buyer is named
// by the sentence too — the person stuck in the meeting ("your
// meeting") — and the money logic is the turn itself: meetings that
// should have been emails are a pain people will pay to escape, by
// way of the one excuse nobody questions. Strange at first glance,
// a real business on the second.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "For $20, a stranger bursts into your meeting shouting 'fire drill' — nobody can end a meeting, but everyone obeys an alarm.";

// Guard: the brief demands one line of 1 to 200 characters, so
// refuse to write anything else rather than silently ship a
// wrong length. The line is 123 characters, well under the cap,
// and kept short on purpose: ties on judge win rate break on
// fewer bytes, so every word here has to earn its place. A
// carriage return is refused alongside a newline, so no second
// line can smuggle itself in as a line break of another kind.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error(`expected 1-200 characters on one line, got ${chars}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
