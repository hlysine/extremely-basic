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
        event.preventDefault();
        await navigate({ to: props.to });
      }}
    />
  );
}) as LinkComponent<'a'>;

export default MouseDownLink;
