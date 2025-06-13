import { createFileRoute, redirect } from '@tanstack/react-router';

// Legacy redirect for drugs to treatments
export const Route = createFileRoute('/drugs/$')({
  beforeLoad: ({ params: { _splat = '' } }) => {
    return redirect({
      to: '/treatments/' + _splat,
    });
  },
});
