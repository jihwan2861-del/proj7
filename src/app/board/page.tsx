import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

// Mock data
const posts = [
    { id: 1, title: "Next.js 15와 Clerk을 활용한 인증 구현", author: "김철수", date: "2024.05.10", views: 42 },
    { id: 2, title: "Minimalist Sophistication 디자인 철학", author: "이영희", date: "2024.05.11", views: 128 },
    { id: 3, title: "Tailwind CSS v4의 새로운 기능들", author: "박지민", date: "2024.05.12", views: 85 },
    { id: 4, title: "고급스러운 웹 디자인을 위한 팁", author: "최유진", date: "2024.05.13", views: 210 },
    { id: 5, title: "React 19 Server Components 이해하기", author: "정다운", date: "2024.05.14", views: 56 },
];

export default async function BoardPage() {
    const user = await currentUser();

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                            Posts
                        </h1>
                        <p className="mt-2 text-secondary font-medium">
                            정갈하고 미니멀한 커뮤니티 공간입니다.
                        </p>
                    </div>
                    {user && (
                        <Link
                            href="/board/new"
                            className="px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                        >
                            New Post
                        </Link>
                    )}
                </header>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/board/${post.id}`}
                            className="block group"
                        >
                            <div className="bg-card p-6 rounded-2xl border border-transparent shadow-sm hover:shadow-xl hover:translate-y-[-2px] hover:border-accent/10 transition-all duration-300">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-secondary uppercase opacity-60">
                                                No. {post.id.toString().padStart(2, '0')}
                                            </span>
                                            <span className="h-1 w-1 rounded-full bg-secondary/30"></span>
                                            <span className="text-[11px] font-medium text-secondary">
                                                {post.date}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-semibold text-foreground">
                                            {post.author}
                                        </p>
                                        <p className="text-[11px] text-secondary mt-1">
                                            {post.views} views
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {!user && (
                    <div className="mt-12 p-8 bg-card/50 border border-dashed border-secondary/20 rounded-3xl text-center">
                        <p className="text-secondary font-medium">로그인하시면 글을 작성할 수 있습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
