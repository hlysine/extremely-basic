import { memo } from 'react';
import Markdown from 'markdown-to-jsx';
import './styledMarkdown.css';
import SkeletonImage from './SkeletonImage';

export interface MarkdownProps {
  children: string;
}

export default memo(function StyledMarkdown({ children }: MarkdownProps) {
  return (
    <Markdown
      className="markdown"
      options={{
        overrides: {
          img: SkeletonImage,
        },
      }}
    >
      {children}
    </Markdown>
  );
});
