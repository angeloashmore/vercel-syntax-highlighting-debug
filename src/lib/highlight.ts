import { all, createStarryNight } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";

let starryNight: Awaited<ReturnType<typeof createStarryNight>>;

export async function highlight(
  input: string,
  language: string
): Promise<string> {
  if (!starryNight) {
    starryNight = await createStarryNight(all);
  }

  const scope = starryNight.flagToScope(language);

  if (!scope) {
    return "";
  }

  const tree = starryNight.highlight(input, scope);

  return toHtml(tree);
}
