import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router';
import StyledMarkdown from '../../components/markdown/StyledMarkdown';
import { useTextFragment } from '../../utils/uiUtils';
import AddToBookmark from '../../components/AddToBookmark';
import allEntries from './-list.gen.json';

function Treatment() {
  const data = useLoaderData({ from: '/treatments/$key' });
  const params = useParams({ from: '/treatments/$key' });
  useTextFragment();
  return (
    <div className="flex-1 p-4 overflow-y-auto self-center w-full max-w-250">
      <AddToBookmark
        link={`/treatments/${params.key}`}
        title={allEntries.find(entry => entry.key === params.key)?.title ?? ''}
        className="mt-2"
      />
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
