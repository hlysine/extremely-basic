import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';

function Condition() {
  const data = useLoaderData({ from: '/conditions/$key' });
  return (
    <div className="flex-1 p-2 overflow-y-auto self-center w-full max-w-[1000px]">
      <StyledMarkdown>{data}</StyledMarkdown>
    </div>
  );
}

export const Route = createFileRoute('/conditions/$key')({
  component: Condition,
  loader: async ({ params }) => {
    const content = (
      (await import(`../../content/conditions/${params.key}.md?raw`)) as {
        default: string;
      }
    ).default;
    const metadataMatch = /^---\s*$.+^---\s*$(.*)/ms.exec(content);
    if (!metadataMatch) {
      return content;
    }
    const metadataStripped = metadataMatch[1];
    return metadataStripped;
  },
});
