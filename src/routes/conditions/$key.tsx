import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';
import { useTextFragment } from '../../utils/uiUtils';

function Condition() {
  const data = useLoaderData({ from: '/conditions/$key' });
  useTextFragment();
  return (
    <div className="flex-1 p-2 overflow-y-auto self-center w-full max-w-[1000px]">
      <StyledMarkdown>{data}</StyledMarkdown>
    </div>
  );
}

export const Route = createFileRoute('/conditions/$key')({
  component: Condition,
  loader: async ({ params }) => {
    return (
      (await import(`../../content/conditions/${params.key}.md?raw`)) as {
        default: string;
      }
    ).default;
  },
});
