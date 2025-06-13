import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';
import { useTextFragment } from '../../utils/uiUtils';

function Treatment() {
  const data = useLoaderData({ from: '/treatments/$key' });
  useTextFragment();
  return (
    <div className="flex-1 p-4 overflow-y-auto self-center w-full max-w-[1000px]">
      <StyledMarkdown>{data}</StyledMarkdown>
    </div>
  );
}

export const Route = createFileRoute('/treatments/$key')({
  component: Treatment,
  loader: async ({ params }) => {
    return (
      (await import(`../../content/treatments/${params.key}.md?raw`)) as {
        default: string;
      }
    ).default;
  },
});
