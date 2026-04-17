import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'HUB 매뉴얼 - 게시판 메뉴관리',
    description: '관리자 - 게시판 메뉴관리 페이지',
};

export default function AdminMenuPage() {
    
    return (
        <div>
            <div onClick={() => {
                console.log('Button clicked');
            }}>
                broadcast button
            </div>
            <h1>Admin Menu Page</h1>
        </div>
    );
}