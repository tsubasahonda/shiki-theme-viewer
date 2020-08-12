import { fstat } from "fs";

const shiki = require("shiki");
const fs = require('fs');

shiki
  .getHighlighter({
    theme: 'min-light'
  })
  .then(highlighter => {
    const html = highlighter.codeToHtml(`
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
    `, 'js');
    const out = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      ${html}
      </body>
      </html>
    `;
    fs.writeFileSync(__dirname + '/../src/index.html', out);
  });
