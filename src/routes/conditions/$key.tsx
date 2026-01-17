import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';
import { useTextFragment } from '../../utils/uiUtils';
import AddToBookmark from '../../components/AddToBookmark';
import allEntries from './-list.gen.json';

function Condition() {
  const data = useLoaderData({ from: '/conditions/$key' });
  const params = useParams({ from: '/conditions/$key' });
  useTextFragment();
  return (
    <div className="flex-1 p-4 pt-0 overflow-y-auto self-center w-full max-w-[1000px]">
      <AddToBookmark
        link={`/conditions/${params.key}`}
        title={allEntries.find(entry => entry.key === params.key)?.title ?? ''}
        className="mt-2"
      />
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
