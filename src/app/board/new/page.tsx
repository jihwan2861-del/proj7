import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewPostPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
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

                <div className="bg-card p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-transparent">
                    <header className="mb-10">
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                            New Post
                        </h1>
                        <p className="mt-2 text-secondary font-medium">
                            여러분의 멋진 생각을 공유해 주세요.
                        </p>
                    </header>

                    <form className="space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-bold text-foreground/80 ml-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="제목을 입력하세요"
                                className="w-full px-6 py-4 bg-background border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none text-foreground placeholder:text-secondary/40 font-medium transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-bold text-foreground/80 ml-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                rows={10}
                                placeholder="어떤 이야기를 들려주실 건가요?"
                                className="w-full px-6 py-4 bg-background border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none text-foreground placeholder:text-secondary/40 font-medium transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href="/board"
                                className="px-8 py-3 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-all font-sans"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-10 py-3 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                            >
                                Post Reply
                            </button>
                        </div>
                    </form>

                    <footer className="mt-10 pt-10 border-t border-secondary/5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <img src={user.imageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-foreground">작성자: {user.firstName || user.username}</p>
                            <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">{user.emailAddresses[0]?.emailAddress}</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
