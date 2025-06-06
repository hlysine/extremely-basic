import { memo } from 'react';
import Markdown from 'markdown-to-jsx';
import './styledMarkdown.css';
import SkeletonImage from './SkeletonImage';
import makeClickableHeading from './ClickableHeading';

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
          h1: makeClickableHeading('h1'),
          h2: makeClickableHeading('h2'),
          h3: makeClickableHeading('h3'),
          h4: makeClickableHeading('h4'),
          h5: makeClickableHeading('h5'),
          h6: makeClickableHeading('h6'),
        },
      }}
    >
      {children}
    </Markdown>
  );
});
