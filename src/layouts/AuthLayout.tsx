import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{ colorScheme: 'dark' }} className="min-h-dvh bg-[#080c14] font-sans text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-12">
        <Link
          to="/"
          aria-label="ShopZone home"
          className="inline-flex items-center gap-2.5 rounded-lg text-2xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
        >
          <svg
            aria-hidden="true"
            width="27"
            height="29"
            viewBox="0 0 24 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-indigo-400"
          >
            <path d="M5 8h14l1 14H4L5 8Z" />
            <path d="M8 9V6a4 4 0 0 1 8 0v3" />
          </svg>
          ShopZone<span className="-ml-2 text-indigo-400">.</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex shrink-0 items-center gap-2 rounded-md px-1 py-2 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
        >
          <span aria-hidden="true">&larr;</span> Back to store
        </Link>
      </header>
      <main className="mx-auto grid w-full max-w-7xl items-stretch px-6 pb-8 sm:px-10 lg:min-h-[calc(100dvh-100px)] lg:grid-cols-2 lg:px-12 lg:pb-12">
        <aside className="relative hidden flex-col justify-between rounded-l-3xl border border-r-0 border-slate-800 bg-[#111827] p-10 lg:flex xl:p-14">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Everyday, thoughtfully chosen
          </div>
          <div className="py-14">
            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight xl:text-6xl">
              Shop smarter.
              <br />
              <span className="text-indigo-400">Live better.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-slate-400">
              Discover the pieces that make everyday life a little better. Curated quality. Honest
              pricing. All in one place.
            </p>
            <div className="mt-10 h-px max-w-sm bg-slate-700/70" />
            <p className="mt-7 max-w-xs text-sm leading-6 text-slate-300">
              Your cart, your orders, your next favorite find. Make it yours with a ShopZone
              account.
            </p>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 text-indigo-300">
              <svg
                aria-hidden="true"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="M3 10h18M7 15h3" />
              </svg>
            </span>
            <div>
              <p className="font-medium text-slate-200">Cash on delivery</p>
              <p className="mt-1 text-xs text-slate-400">
                Find what you love. Pay when it arrives.
              </p>
            </div>
          </div>
        </aside>
        <section
          aria-label="Customer authentication"
          className="flex min-w-0 items-center justify-center rounded-2xl border border-slate-800 bg-[#0d131f] px-5 py-9 sm:px-10 sm:py-12 lg:rounded-l-none lg:rounded-r-3xl lg:px-10 xl:px-14"
        >
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </section>
      </main>
      <footer className="px-6 pb-6 text-center text-xs text-slate-500">
        ShopZone &middot; A little better, every day.
      </footer>
    </div>
  );
}
