
import React from 'react';

import { logger } from '@/logger';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("manual layout");
  logger.info('manual layout test111');
  logger.flush();

  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
