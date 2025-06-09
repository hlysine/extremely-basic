import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';

function Condition() {
  const data = useLoaderData({ from: '/drugs/$key' });
  return (
    <div className="flex-1 p-2 overflow-y-auto self-center w-full max-w-[1000px]">
      <StyledMarkdown>{data}</StyledMarkdown>
    </div>
  );
}

export const Route = createFileRoute('/drugs/$key')({
  component: Condition,
  loader: async ({ params }) => {
    return (
      (await import(`../../content/drugs/${params.key}.md?raw`)) as {
        default: string;
      }
    ).default;
  },
});
