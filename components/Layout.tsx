import Head from "next/head";

export const Layout: React.FC<{ children: any }> = ({ children }) => (
  <>
    <Head>
      <title>Rob Falken</title>
      <meta name="description" content="Rob Falken" />
      <link rel="icon" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className="max-w-3xl mx-auto">
      <aside className="mt-10 mb-12">
        <a href="/">
          <div className="flex items-center">
            <img src="/avatar.png" className="w-10 rounded-full mr-3" />
            <div>
              <div className="bg-gradient-to-br from-amber-400 to-rose-400 bg-clip-text text-transparent inline font-bold text-sm">
                Rob Falken
              </div>
              <div className="text-xs text-slate-500">
                Random ideas and thoughts.
              </div>
            </div>
          </div>
        </a>
      </aside>
      <main>{children}</main>
    </div>
  </>
);
