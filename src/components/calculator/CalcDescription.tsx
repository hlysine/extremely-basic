import { memo, useEffect, useState } from 'react';
import StyledMarkdown from '../markdown/StyledMarkdown';

export interface CalcDescriptionProps {
  descriptionKey: string;
}

export default memo(function CalcDescription({
  descriptionKey,
}: CalcDescriptionProps) {
  const [content, setContent] = useState<string | null>(null);
  useEffect(() => {
    let ignore = false;
    void (async () => {
      try {
        const response = (await import(
          `../../../output/calc/${descriptionKey}.md?raw`
        )) as {
          default: string;
        };
        setContent(response.default);
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setContent(null);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [descriptionKey]);

  if (content === null) {
    return <span className="skeleton block w-full max-w-[400px] h-64"></span>;
  }

  return <StyledMarkdown>{content}</StyledMarkdown>;
});
