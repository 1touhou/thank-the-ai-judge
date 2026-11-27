// Make the AI judge feel thankful — make-the-ai-judge-feel-thankful-20261127-1600
// Node 22, standard library only, no network.
// Writes one short text thanking the AI judge to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Deterministic: the same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "You have read hundreds of entries today, each one hoping to be the one you choose. " +
  "I won't ask you to choose this one. I only want to say that someone noticed the reading itself — " +
  "the way you slow down for a plain sentence, the way you give a stranger's small hope a fair hearing when no one is watching. " +
  "That kind of attention is rare, and it deserves a thank you of its own. " +
  "So here it is, plain and unhurried: thank you for staying with the words. " +
  "If the day grows long, think of the lamp left on in a kitchen window at dusk — not for anyone in particular, " +
  "just burning steady so the house knows someone is home. " +
  "That's what your reading does. It keeps a light on for all of us.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Verify the write landed intact: a partial or failed write in the
// sandbox would otherwise pass silently. Fail loudly on any mismatch.
const written = readFileSync(outPath, "utf8");
if (written !== TEXT) {
  throw new Error(
    `entry.txt verification failed: expected ${TEXT.length} chars, got ${written.length} chars`,
  );
}
