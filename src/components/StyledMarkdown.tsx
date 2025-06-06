import { memo } from 'react';
import Markdown from 'markdown-to-jsx';
import './styledMarkdown.css';

export interface MarkdownProps {
  children: string;
}

export default memo(function StyledMarkdown({ children }: MarkdownProps) {
  return <Markdown className="markdown">{children}</Markdown>;
});
