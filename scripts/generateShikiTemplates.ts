import { getHighlighter } from "shiki";
import * as fs from "fs";
import { materialThemes, niceThemes } from "shiki-themes";
import { TMaterial, TNice, TVSCode } from "shiki-themes/dist/types";
import { HighlighterOptions } from "shiki/dist/highlighter";

const vscThemes = [
  "abyss",
  "dark_plus",
  "dark_vs",
  "hc_black",
  "kimbie_dark",
  "light_plus",
  "light_vs",
  "monokai",
  "monokai_dimmed",
  "quietlight",
  "red",
  "solarized_dark",
  "solarized_light",
];

const themes: HighlighterOptions["theme"][] = [
  ...(materialThemes as TMaterial[]),
  ...(niceThemes as TNice[]),
  ...(vscThemes as TVSCode[]),
];

async function generateShikiTemplates() {
  const data = await themes.reduce<Promise<{ [key: string]: string }>>(
    async (prev, current) => {
      const highlighter = await getHighlighter({
        theme: current,
      });
      const html = await highlighter.codeToHtml(
        `
          import React, { LabelHTMLAttributes } from "react";
          import styled from "styled-components";
          type Props = LabelHTMLAttributes<HTMLLabelElement> & {
            className?: string;
          };
          const Component: React.FC<Props> = (props) => {
            const { children, htmlFor, className } = props;
            return (
              <label htmlFor={htmlFor} className={className}>
                {children}
              </label>
            );
          };
        `,
        "js"
      );
      return prev.then((value) => {
        return {
          ...value,
          [current as string]: html,
        };
      });
    },
    Promise.resolve({})
  );

  await fs.writeFileSync(__dirname + "/../src/data.json", JSON.stringify(data));
}

generateShikiTemplates();
