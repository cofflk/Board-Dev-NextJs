import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'HUB 매뉴얼 - 게시판 메뉴관리',
    description: '관리자 - 게시판 메뉴관리 페이지',
};


export default function PostViewPage() {
    const post = await getPost(params.id);
    return (
        <div>
            <h1>게시판 메뉴관리</h1>
        </div>
    );
}