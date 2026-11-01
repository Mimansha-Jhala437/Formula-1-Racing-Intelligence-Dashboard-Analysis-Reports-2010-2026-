import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        src?: string;
        toolbar?: string;
        'hide-tabs'?: boolean | string;
        device?: string;
        class?: string;
        className?: string;
        onLoad?: () => void;
      };
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        src?: string;
        toolbar?: string;
        'hide-tabs'?: boolean | string;
        device?: string;
        class?: string;
        className?: string;
        onLoad?: () => void;
      };
    }
  }
}
