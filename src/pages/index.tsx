import { highlight } from "@/lib/highlight";
import { GetStaticPropsContext } from "next";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export default function Home({
  codeHTML,
  isPreviewMode,
  isDraftMode,
}: {
  codeHTML: string;
  isPreviewMode: boolean;
  isDraftMode: boolean;
}) {
  return (
    <main className="p-8 grid gap-6">
      <pre className="p-8 rounded bg-zinc-100 text-xs leading-relaxed">
        <code>
          {JSON.stringify(
            {
              isPreviewMode,
              isDraftMode,
            },
            null,
            2
          )}
        </code>
      </pre>
      <p>
        This code is highlighted using <code>@wooorm/starry-night</code>.
      </p>
      <pre className="p-8 rounded-lg bg-zinc-900 overflow-auto font-mono text-xs leading-relaxed text-white">
        <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
      </pre>
    </main>
  );
}

export async function getStaticProps({
  previewData,
  draftMode,
}: GetStaticPropsContext) {
  const contents = await fs.readFile(
    path.join(process.cwd(), "src/codesample.txt"),
    "utf8"
  );
  const highlighted = await highlight(contents, "tsx");

  return {
    props: {
      isPreviewMode: Boolean(previewData),
      isDraftMode: Boolean(draftMode),
      codeHTML: highlighted,
    },
  };
}
