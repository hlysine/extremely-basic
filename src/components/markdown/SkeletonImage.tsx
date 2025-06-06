import { useState } from 'react';
import { cn } from '../../utils/uiUtils';

export interface SkeletonImageProps {
  title?: string;
  className?: string;
  alt?: string;
  src?: string;
}

// million-ignore
export default function SkeletonImage({
  title,
  className,
  alt,
  src,
  ...rest
}: SkeletonImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div
        className={cn(
          'skeleton w-full max-w-[400px] h-64',
          className,
          isLoading || 'hidden'
        )}
      ></div>
      <img
        className={cn(className, isLoading && 'hidden')}
        loading="eager"
        src={src}
        alt={alt}
        title={title}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        {...rest}
      />
    </>
  );
}
