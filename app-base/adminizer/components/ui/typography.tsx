import * as React from 'react';

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  ...props
}) => {
  return (
    <h1
      style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, ...props.style }}
      className={className}
      {...props}
    />
  );
};

export const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...props
}) => {
  return (
    <p
      style={{ fontSize: '1rem', lineHeight: '1.5', color: '#4b5563', margin: 0, ...props.style }}
      className={className}
      {...props}
    />
  );
};
