## NextJs 16.2
##### File Conventions
- [프로젝트 구조](https://nextjs.org/docs/app/getting-started/project-structure)


```tsx
```

##### File Conventions
- loading.tsx
```tsx
export default function Loading() {
  // 또는 커스텀 로딩 스켈레톤 컴포넌트
  return <p>Loading...</p>
}
```

- error.tsx : https://nextjs-ko.org/docs/app/api-reference/file-conventions/error
```tsx
'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

- not-found.tsx : 404
```tsx
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```



=================================

##### 렌더링 검토
- nextjs: reactCompiler 사용
  - https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
  - useMemo, useCallback, React.memo => 최적화 자동 적용

- @welldone-software/why-did-you-render, Million.js
<!-- 
- https://github.com/welldone-software/why-did-you-render
- https://codesandbox.io/p/sandbox/why-did-you-render-nextjs-esmdk

pnpm add -D @welldone-software/why-did-you-render 
-->


=================================

##### 이미지 사용
```js
// next.config.js
const nextConfig = {
  images: {
    domains: ['hub.haeahn.com'],
  },

  // 또는 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hub.haeahn.com',
        pathname: '/Storage/**',
      },
    ],
  },
};
```