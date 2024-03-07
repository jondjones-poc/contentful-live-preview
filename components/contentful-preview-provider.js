'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export function ContentfulPreviewProvider({
  children,
  ...props
}) {
  return <ContentfulLivePreviewProvider {...props}>{children}</ContentfulLivePreviewProvider>;
}
