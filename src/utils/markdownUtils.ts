/* eslint-disable @typescript-eslint/no-use-before-define */
import { marked, Renderer, Tokens } from 'marked';
import { r } from 'readable-regexp';

class TextRenderer extends Renderer {
  code(tokens: Tokens.Code) {
    return tokens.text;
  }

  blockquote({ text }: Tokens.Blockquote) {
    return (
      markdownToText(text)
        .trim()
        .split('\n')
        .map(line => `> ${line}`)
        .join('\n') + '\n'
    );
  }

  html({ text }: Tokens.HTML) {
    return text === '<br>' ? ' ' : '';
  }

  heading(tokens: Tokens.Heading) {
    const text = tokens.text;
    return `${text}\n`;
  }

  hr() {
    return '\n';
  }

  list({ items }: Tokens.List) {
    return `${items.map(item => this.listitem(item)).join('\n')}\n`;
  }

  listitem({ text }: Tokens.ListItem) {
    return `  ${markdownToText(text).trim()}`;
  }

  checkbox() {
    return '';
  }

  paragraph({ tokens }: Tokens.Paragraph) {
    return `${this.parser.parseInline(tokens)}\n`;
  }

  table(tokens: Tokens.Table) {
    return `${tokens.header.map(cell => this.tablecell(cell)).join('\n')}\n${tokens.rows
      .map(row => row.map(cell => this.tablecell(cell)).join('\n'))
      .join('\n')}\n`;
  }

  tablerow({ text }: Tokens.TableRow) {
    return text;
  }

  tablecell({ text }: Tokens.TableCell) {
    return markdownToText(text).trim();
  }

  strong({ text }: Tokens.Strong) {
    return markdownToText(text).trim();
  }

  em({ text }: Tokens.Em) {
    return markdownToText(text).trim();
  }

  codespan({ text }: Tokens.Codespan) {
    return text;
  }

  br() {
    return '\n';
  }

  del(tokens: Tokens.Del) {
    return tokens.text;
  }

  link(tokens: Tokens.Link) {
    return tokens.text;
  }

  image(tokens: Tokens.Image) {
    return tokens.text;
  }

  text(tokens: Tokens.Text) {
    return tokens.text;
  }
}

const renderer = new TextRenderer({
  async: false,
  gfm: true,
  breaks: true,
});

const frontMatterRegex = r
  .match(
    r.lineStart,
    r.exactly`---`,
    r.zeroOrMore.whitespace,
    r.lineEnd,
    r.zeroOrMoreLazily.char,
    r.lineStart,
    r.exactly`---`,
    r.zeroOrMore.whitespace,
    r.lineEnd,
    r.capture.zeroOrMore.char
  )
  .toRegExp('ms');

const options = {
  renderer: renderer as Renderer,
  async: false,
  gfm: true,
  breaks: true,
} as const;

export function markdownToText(markdown: string): string {
  const frontMatterMatch = markdown.match(frontMatterRegex);
  if (frontMatterMatch) {
    markdown = frontMatterMatch[1].trim();
  }
  return marked(markdown, options);
}
