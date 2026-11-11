import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

/* TODO: غيّر الدومين إلى دومين موقعك الفعلي (بدون / في النهاية) */
const SITE_URL = "https://YOUR-DOMAIN.com";

const SITE_NAME = "منصة الشكاوى المستقلة";
const TITLE = "منصة الشكاوى المستقلة | توثيق شكاوى المستهلكين في الإمارات";
const DESCRIPTION =
  "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق شكاواهم تجاه الشركات الخاصة بشكل بسيط وسريع. غير تابعة لأي جهة حكومية.";

/* TODO: الأفضل رفع صورة 1200×630 داخل public واستبدال الرابط بـ `${SITE_URL}/og-image.jpg` */
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/20faf45e-3ae3-44db-b298-b400eb4e72c6";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "UAE Complaints Platform",
  url: SITE_URL,
  logo: `${SITE_URL}/kk.png`,
  description:
    "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق الشكاوى تجاه الشركات الخاصة ومتابعتها. غير تابعة لأي جهة حكومية.",
  areaServed: "AE",
  inLanguage: "ar",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#000000] px-4 py-20 text-center text-white">
      <div className="max-w-md">
        <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-4xl font-extrabold text-[var(--color-accent)]">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-white">الصفحة غير موجودة</h1>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          الرابط الذي فتحته غير صحيح أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية
          والبدء من جديد.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#121212] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  // الخطأ قد يكون من أي نوع، فنحوّله إلى Error مرة واحدة فقط
  const err = useMemo(
    () => (error instanceof Error ? error : new Error(String(error))),
    [error],
  );

  useEffect(() => {
    console.error(err);
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
  }, [err]);

  return (
    <main className="container-page grid min-h-[60vh] place-items-center bg-[#000000] py-20 text-center text-white">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-white">حدث خطأ غير متوقع</h1>
        <p className="mt-3 text-gray-300">
          يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#121212] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
          >
            حاول مجددًا
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#000000" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "UAE Complaints Platform" },

      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_AE" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/kk.png", type: "image/png" },
      // يوحّد الروابط التي تحمل UTM من الحملات الإعلانية
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@500;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSON_LD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        تخطي إلى المحتوى الرئيسي
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
