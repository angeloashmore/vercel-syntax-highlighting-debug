import { all, createStarryNight } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";
import fs from "fs";
import path from "path";

let starryNight: Awaited<ReturnType<typeof createStarryNight>>;

fs.readFile(path.join(process.cwd(), "src/onig.wasm"), () => {});

export async function highlight(
  input: string,
  language: string
): Promise<string> {
  if (!starryNight) {
    starryNight = await createStarryNight(all, {
      getOnigurumaUrlFs: async () => {
        return new URL("./src/onig.wasm", `file://${process.cwd()}/`);
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
