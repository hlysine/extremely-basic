import { useNavigate } from '@tanstack/react-router';
import { cn } from '../utils/uiUtils';
export interface ClickableHeadingProps {
  id?: string;
  className?: string;
}

export default function makeClickableHeading(Element: React.ElementType) {
  return function ClickableHeading({
    id,
    className,
    ...rest
  }: ClickableHeadingProps) {
    const navigate = useNavigate();
    return (
      <Element
        id={id}
        className={cn(className, 'cursor-pointer hover:underline')}
        {...rest}
        onClick={() => navigate({ hash: id })}
      />
    );
  };
}
