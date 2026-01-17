import { cn } from '../utils/uiUtils';
import { useSettings } from './SettingsContext';
import { MdBookmark, MdBookmarkAdd } from 'react-icons/md';

export default function AddToBookmark({
  link,
  title,
  className,
}: {
  link: string;
  title: string;
  className?: string;
}) {
  const [bookmarks, setBookmarks] = useSettings('bookmarks');
  const isBookmarked = bookmarks.some(b => b.link === link);

  function toggleBookmark() {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.link !== link));
    } else {
      setBookmarks([...bookmarks, { link, title }]);
    }
  }

  return (
    <button
      className={cn(
        `w-full btn btn-sm btn-ghost`,
        isBookmarked && 'btn-secondary',
        className
      )}
      onClick={toggleBookmark}
    >
      {isBookmarked ? <MdBookmark size={16} /> : <MdBookmarkAdd size={16} />}
      {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
    </button>
  );
}
