import { useSettings } from './SettingsContext';

export default function AddToBookmark({
  link,
  title,
}: {
  link: string;
  title: string;
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
      className={`btn btn-sm btn-outline ${
        isBookmarked ? 'btn-primary' : 'btn-secondary'
      }`}
      onClick={toggleBookmark}
    >
      {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
    </button>
  );
}
