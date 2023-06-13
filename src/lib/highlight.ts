import { all, createStarryNight } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";
import * as fs from "node:fs/promises";
import path from "path";

let starryNight: Awaited<ReturnType<typeof createStarryNight>>;

export async function highlight(
  input: string,
  language: string
): Promise<string> {
  // Needed for Next.js to include the vendored `onig.wasm` file.
  // This code should have no effect in production.
  if (false) {
    fs.readFile(path.join(process.cwd(), "vendor/vscode-oniguruma/onig.wasm"));
  }

  if (!starryNight) {
    starryNight = await createStarryNight(all, {
      getOnigurumaUrlFs: async () => {
        return new URL(
          "./vendor/vscode-oniguruma/onig.wasm",
          `file://${process.cwd()}/`
        );
      },
    });
  }

  const scope = starryNight.flagToScope(language);

  if (!scope) {
    return "";
  }

  const tree = starryNight.highlight(input, scope);

  return toHtml(tree);
}
