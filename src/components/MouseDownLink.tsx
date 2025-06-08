import {
  Link,
  LinkComponent,
  LinkComponentProps,
  useNavigate,
} from '@tanstack/react-router';

const MouseDownLink: LinkComponent<'a'> = ((props: LinkComponentProps) => {
  const navigate = useNavigate();
  return (
    <Link
      {...props}
      onMouseDown={async event => {
        if (event.button !== 0) return;
        if (event.ctrlKey || event.metaKey || event.shiftKey) return;
        event.preventDefault();
        await navigate({ to: props.to });
      }}
    />
  );
}) as LinkComponent<'a'>;

export default MouseDownLink;
