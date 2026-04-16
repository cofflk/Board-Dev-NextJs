// https://chatgpt.com/c/69cb75e4-62cc-8323-88bf-a083e19c2af4

import { notFound, redirect } from "next/navigation";

type Props = {
    params: {
      postId: string;
      postTitle: string;
    };
};

export function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_");
}


export default async function PostPage({ params }: Props) {
    const { postId, postTitle } = params;
  
    // 👉 실제 조회는 ID로만
    const post = await fetch(`https://api.example.com/posts/${postId``}`).then(res => res.json());
  
    if (!post) return notFound();
  
    // 👉 slug 검증 (선택)
    const correctTitle = slugify(postTitle);
  
    if (postTitle !== correctTitle) {
      // 👉 SEO를 위해 redirect (줈)
      return redirect(`/post/${postId}/${correctTitle}`);
    }
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
}