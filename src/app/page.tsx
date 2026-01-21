import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4 sm:p-8">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center space-y-10 py-12 px-6 sm:px-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="flex flex-col items-center gap-6 relative z-10 w-full">
          <div className="flex flex-col items-center gap-4">
            <Image
              className="dark:invert mb-2"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <span className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
              Dashboard / Overview
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 text-center mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {user ? (
                <>Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{user.firstName || 'User'}</span>!</>
              ) : (
                <>Secure <span className="text-blue-600">Authentication</span></>
              )}
            </h1>
            <p className="max-w-md text-base sm:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              {user
                ? "Your account is secure and your profile information is below."
                : "Sign in to access your personal dashboard and account settings."
              }
            </p>
          </div>

          {user && (
            <div className="w-full mt-8 p-1 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-700 rounded-3xl shadow-inner group">
              <div className="p-6 bg-white dark:bg-zinc-950 rounded-[1.4rem] transition-all">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover/avatar:opacity-75 transition duration-1000 group-hover/avatar:duration-200"></div>
                    <Image
                      src={user.imageUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-white dark:border-zinc-800 shadow-lg relative z-10"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                      <span className="px-3 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        ID: {user.id.substring(0, 15)}...
                      </span>
                      {user.username && (
                        <span className="px-3 py-1 text-[11px] font-mono bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900/30">
                          @{user.username}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="w-full mt-8 p-12 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl group hover:border-blue-300 dark:hover:border-blue-900 transition-colors">
              <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <div className="h-4 w-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse"></div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Please sign in to view your profile</p>
            </div>
          )}

          <div className="flex flex-col gap-6 w-full mt-4">
            <Link
              href="/board"
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Community Board
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
            <a
              href="https://clerk.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">Documentation →</span>
              <span className="text-sm text-zinc-500 mt-1">Implement advanced Clerk features today.</span>
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">Framework Guide →</span>
              <span className="text-sm text-zinc-500 mt-1">Build amazing apps with Next.js 15.</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
