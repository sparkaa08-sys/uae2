import { Link } from "@tanstack/react-router";
import { Info, Mail } from "lucide-react";

const quickLinks = [
  { to: "/about", label: "من نحن" },
  { to: "/how-it-works", label: "كيف تعمل المنصة" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

const legalLinks = [
  { to: "/privacy", label: "سياسة الخصوصية" },
  { to: "/terms", label: "الشروط والأحكام" },
] as const;

const EMAIL = "uaeresolve.com@gmail.com";

const linkClass =
  "inline-flex min-h-9 items-center text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#000000]"
    >
      {/* خط ضوء علوي وتوهج خفيف يتناغم مع الهيرو */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute -top-24 left-[8%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] sm:h-80 sm:w-80" />
        <div className="absolute -bottom-24 right-[6%] h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent)]" />
      </div>

      <div className="container-page relative">
        {/* الأعمدة */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-x-10">
          {/* العلامة والوصف */}
          <div className="col-span-2 lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
            >
              <img
                src="/vs.png"
                alt="شعار منصة حماية المستهلك"
                width={44}
                height={44}
                loading="lazy"
                className="h-11 w-auto shrink-0"
              />
              <span className="text-lg font-extrabold text-white">
                منصة حماية المستهلك
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm font-normal leading-7 text-gray-400">
              منصة مستقلة تساعد المستهلكين في الإمارات على توثيق شكاواهم تجاه
              الشركات الخاصة ومتابعتها بوضوح وسهولة.
            </p>
          </div>

          {/* روابط سريعة */}
          <nav aria-label="روابط سريعة" className="col-span-1 lg:col-span-2">
            <h2 className="text-sm font-bold text-white">روابط سريعة</h2>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-6 rounded-full bg-[var(--color-accent)]"
            />
            <ul className="mt-4 space-y-1">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* قانوني */}
          <nav aria-label="روابط قانونية" className="col-span-1 lg:col-span-2">
            <h2 className="text-sm font-bold text-white">قانوني</h2>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-6 rounded-full bg-[var(--color-accent)]"
            />
            <ul className="mt-4 space-y-1">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* التواصل */}
          <div className="col-span-2 lg:col-span-3">
            <h2 className="text-sm font-bold text-white">تواصل معنا</h2>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-6 rounded-full bg-[var(--color-accent)]"
            />

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors duration-200 hover:border-[var(--color-accent)]/50 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[var(--color-accent)]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-gray-400">
                  البريد الإلكتروني
                </span>
                <span
                  dir="ltr"
                  className="block break-all text-start text-sm font-semibold text-white"
                >
                  {EMAIL}
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* تنويه قانوني واضح */}
        <div
          role="note"
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
            aria-hidden="true"
          />
          <p className="text-xs font-medium leading-6 text-gray-300 sm:text-sm sm:leading-7">
            منصة حماية المستهلك منصة مستقلة، وليست جهة حكومية، ولا تمثل أي جهة
            رسمية في الإمارات.
          </p>
        </div>

        {/* الشريط السفلي */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:flex-row sm:text-start">
          <p className="text-xs font-medium text-gray-500">
            © {currentYear} منصة حماية المستهلك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
