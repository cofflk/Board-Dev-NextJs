'use client';

import Image from "next/image";
import { useRef, useEffect } from "react";
import { logger, adminLogger } from '@/logger';

import { Provider } from 'react-redux'
import { store } from '@/redux/store'


import Upload from '@/designComponents/upload';
import createUploadForm from '@/designComponents/upload';


export default function Home() {
  // logger.info('page test222');
  const uploadContainerRef = useRef<HTMLDivElement>(null);

  const postId = "12868938913837";
  useEffect(() => {
    const container = uploadContainerRef.current;
    if (!container) return;
    const form = createUploadForm({
      multiple: true,
      onSuccess: (data: unknown) => console.log('업로드 성공', data),
      onError: (err: unknown) => console.error('업로드 실패', err),

      // 허용 파일 타입
      accept: 'image/*, .pdf, .doc, .bin',
      fileUrl: 'http://hubnx-pi.haeahn.com/be/common/board/post/file/' + postId,
      service: 'MANUAL',
    });
    container.appendChild(form);
    return () => {
      if (form.parentNode === container) {
        container.removeChild(form);
      }
    };
  }, []);

  return (
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div className="">
      <h1>게시판 메인</h1>

      {/* <UploadForm /> */}

      <div ref={uploadContainerRef} />
      

      <img src="http://hubnx-pi.be.haeahn.com/file/attach/view/temp/26559cff-8181-4abe-9eeb-66dcdbc02b8b" 
     alt="첨부이미지" 
     style={{width: '100%', maxWidth: '500px'}} />


      {/* <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main> */}
    </div>
  );
}
