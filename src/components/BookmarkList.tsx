import { settingsStore, useSettings } from './SettingsContext';
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '../utils/uiUtils';
import {
  FaBookMedical,
  FaCalculator,
  FaSearch,
  FaSyringe,
} from 'react-icons/fa';

if (settingsStore.get('bookmarks').length > 0) {
  Promise.all([
    import('../routes/calc/-list.gen.json'),
    import('../routes/conditions/-list.gen.json'),
    import('../routes/treatments/-list.gen.json'),
  ])
    .then(([calcList, conditionList, treatmentList]) => {
      const bookmarks = settingsStore.get('bookmarks');
      const mergedList = [
        ...calcList.default.map(item => ({
          link: '/calc/' + item.key,
          title: item.title,
        })),
        ...conditionList.default.map(item => ({
          link: '/conditions/' + item.key,
          title: item.title,
        })),
        ...treatmentList.default.map(item => ({
          link: '/treatments/' + item.key,
          title: item.title,
        })),
      ];
      const validBookmarks = bookmarks
        .filter(bookmark =>
          mergedList.find(item => item.link === bookmark.link)
        )
        .map(bookmark => {
          const matched = mergedList.find(item => item.link === bookmark.link);
          return {
            link: bookmark.link,
            title: matched ? matched.title : bookmark.title,
          };
        });
      settingsStore.set('bookmarks', validBookmarks);
    })
    .catch(console.error);
}

function BookmarkItem({ link, title }: { link: string; title: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Link
      ref={setNodeRef}
      preload="viewport"
      {...attributes}
      {...listeners}
      style={style}
      to={link}
      key={link}
      className={cn(
        'w-96 bg-base-200 text-base flex items-center gap-2 border-b border-neutral/30 py-3 px-6 hover:bg-base-300 transition-all cursor-pointer',
        isDragging && 'pointer-events-none'
      )}
    >
      {link.startsWith('/calc') ? (
        <FaCalculator />
      ) : link.startsWith('/conditions') ? (
        <FaBookMedical />
      ) : link.startsWith('/treatments') ? (
        <FaSyringe />
      ) : (
        <FaSearch />
      )}
      {title}
    </Link>
  );
}

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useSettings('bookmarks');
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="w-full max-w-250 flex flex-wrap items-center justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={event => {
          const { active, over } = event;
          if (!over) return;
          if (active.id !== over.id) {
            const oldIndex = bookmarks.findIndex(
              item => item.link === active.id
            );
            const newIndex = bookmarks.findIndex(item => item.link === over.id);
            setBookmarks(arrayMove(bookmarks, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext
          items={useMemo(
            () => bookmarks.map(bookmark => bookmark.link),
            [bookmarks]
          )}
          strategy={rectSortingStrategy}
        >
          {bookmarks.map(bookmark => (
            <BookmarkItem
              key={bookmark.link}
              link={bookmark.link}
              title={bookmark.title}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
