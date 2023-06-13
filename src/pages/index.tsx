import { highlight } from "@/lib/highlight";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export default function Home({ codeHTML }: { codeHTML: string }) {
  console.log({ codeHTML });

  return (
    <main className="p-8 grid gap-6">
      <p>
        This code is highlighted using <code>@wooorm/starry-night</code>.
      </p>
      <pre className="p-8 rounded-lg bg-zinc-900 overflow-auto font-mono text-xs leading-relaxed text-white">
        <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
      </pre>
    </main>
  );
}

export async function getStaticProps() {
  const contents = await fs.readFile(
    path.join(process.cwd(), "src/codesample.txt"),
    "utf8"
  );
  const highlighted = await highlight(contents, "tsx");

  return {
    props: {
      codeHTML: highlighted,
    },
  };
}
