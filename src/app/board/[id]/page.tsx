import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data (same as list for consistency in demo)
const posts = [
    { id: 1, title: "Next.js 15와 Clerk을 활용한 인증 구현", author: "김철수", date: "2024.05.10", views: 42, content: "Next.js 15와 Clerk을 결합하면 최고의 개발 경험을 누릴 수 있습니다. 서버 컴포넌트에서 currentUser()를 사용하는 법부터 미들웨어 설정까지 차근차근 알아봅시다..." },
    { id: 2, title: "Minimalist Sophistication 디자인 철학", author: "이영희", date: "2024.05.11", views: 128, content: "단순함은 궁극의 정교함입니다. 이번 포스트에서는 어떻게 하면 군더더기 없는 UI를 설계하면서도 고급스러운 느낌을 줄 수 있는지 디자인 가이드를 통해 설명합니다..." },
    { id: 3, title: "Tailwind CSS v4의 새로운 기능들", author: "박지민", date: "2024.05.12", views: 85, content: "Tailwind CSS v4가 드디어 나왔습니다! 더욱 빨라진 빌드 속도와 간소화된 설정 과정, 그리고 새롭게 추가된 여러 유틸리티 클래스들을 직접 사용해 본 후기입니다..." },
    { id: 4, title: "고급스러운 웹 디자인을 위한 팁", author: "최유진", date: "2024.05.13", views: 210, content: "색상 팔레트를 선택할 때 `#ffffff` 보다는 `#F9FAFB` 같은 미세한 오프화이트를 사용해 보세요. 또한 선(Border)을 최소화하고 그림자(Shadow)를 활용하는 것만으로도 분위기가 바뀝니다..." },
    { id: 5, title: "React 19 Server Components 이해하기", author: "정다운", date: "2024.05.14", views: 56, content: "React 19에서 서버 컴포넌트의 역할은 더욱 중요해졌습니다. 클라이언트 컴포넌트와의 경계를 명확히 하고 데이터를 효율적으로 전달하는 구조에 대해 깊이 있게 파헤쳐 봅니다..." },
];

export default async function BoardDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/board"
                    className="inline-flex items-center text-sm font-medium text-secondary hover:text-accent transition-colors mb-8 group"
                >
                    <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to list
                </Link>

                <article className="bg-card p-10 sm:p-16 rounded-[2.5rem] shadow-2xl border border-transparent overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-purple-500"></div>

                    <header className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 text-[10px] font-bold text-accent bg-accent/10 rounded-full tracking-widest uppercase">Community</span>
                            <span className="text-[11px] text-secondary font-medium tracking-tighter">No. {post.id.toString().padStart(2, '0')}</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between py-6 border-y border-secondary/5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                                    {post.author[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{post.author}</p>
                                    <p className="text-[11px] text-secondary font-medium uppercase tracking-wider">{post.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Views</p>
                                <p className="text-xl font-mono font-bold text-accent">{post.views}</p>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-slate max-w-none dark:prose-invert">
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-medium whitespace-pre-wrap">
                            {post.content}
                        </p>
                        <p className="mt-8 text-lg sm:text-xl leading-relaxed text-foreground/80 font-medium">
                            더 많은 내용을 작성하고 소통할 수 있는 공간입니다. 이 게시물은 디자인 시안을 위한 샘플 내용으로 구성되어 있습니다.
                        </p>
                    </div>

                    <footer className="mt-20 pt-10 border-t border-secondary/5 flex justify-between items-center">
                        <button className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Love
                        </button>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 bg-secondary/5 text-secondary text-sm font-bold rounded-xl hover:bg-secondary/10 transition-all">
                                Share
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}
