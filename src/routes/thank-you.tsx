import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Clock3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/thank-you")({
  head: () => {
    const base = buildHead({
      title: "تم استلام شكواك بنجاح | منصة حماية المستهلك",
      description:
        "شكرًا لتقديم شكواك عبر منصة حماية المستهلك. تم استلام الطلب وبدأت عملية المراجعة.",
      path: "/thank-you",
    });

    // صفحة ما بعد الإرسال لا يجب أن تظهر في نتائج البحث
    return {
      ...base,
      meta: [
        ...(base.meta ?? []),
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: ThankYouPage,
});

type StepState = "done" | "active" | "pending";

const steps: {
  title: string;
  desc: string;
  icon: typeof Check;
  state: StepState;
}[] = [
  {
    title: "تم استلام الشكوى",
    desc: "تم تسجيل بياناتك بنجاح",
    icon: Check,
    state: "done",
  },
  {
    title: "قيد المراجعة",
    desc: "يتم التحقق من تفاصيل الشكوى",
    icon: Clock3,
    state: "active",
  },
  {
    title: "متابعة الحالة",
    desc: "ستصلك التحديثات عبر البريد",
    icon: Mail,
    state: "pending",
  },
];

const iconStyles: Record<StepState, string> = {
  done: "border-emerald-500 bg-emerald-500 text-white",
  active:
    "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  pending: "border-white/15 bg-white/5 text-gray-500",
};

const titleStyles: Record<StepState, string> = {
  done: "text-white",
  active: "text-white",
  pending: "text-gray-400",
};

function ThankYouPage() {
  return (
    <section
      dir="rtl"
      aria-labelledby="thanks-title"
      className="relative overflow-hidden bg-[#000000] pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-14 text-white sm:pt-20"
    >
      {/* إضاءات تتناغم مع الهيرو والفوتر (بدون شبكة) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute left-1/2 top-[-8rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)] sm:h-[34rem] sm:w-[34rem]" />
        <div className="absolute -bottom-24 right-[-4rem] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent)] sm:right-[10%] sm:h-80 sm:w-80" />
        <span className="absolute left-[16%] top-[14%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_12px_3px_rgba(255,255,255,0.35)]" />
        <span className="absolute right-[22%] top-[30%] h-1 w-1 rounded-full bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]" />
        <span className="absolute bottom-[22%] left-[38%] hidden h-1 w-1 rounded-full bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] sm:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6">
        {/* رسالة النجاح: تُقرأ تلقائياً لقارئات الشاشة */}
        <div role="status" className="text-center">
          <div className="relative mx-auto mb-7 grid h-24 w-24 place-items-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-emerald-500/15 blur-xl"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-emerald-500/30"
            />
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <Check className="h-8 w-8 text-white" strokeWidth={3} aria-hidden="true" />
            </span>
          </div>

          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
            تم تسجيل الطلب بنجاح
          </p>

          <h1
            id="thanks-title"
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white min-[400px]:text-4xl sm:text-5xl"
          >
            شكواك وصلت إلينا
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base font-normal leading-8 text-gray-300 sm:text-lg">
            شكرًا لثقتك بـ{" "}
            <span className="font-bold text-[var(--color-accent)]">
              منصة حماية المستهلك
            </span>
            . تم استلام شكواك بنجاح، وبدأت عملية مراجعتها.
          </p>
        </div>

        {/* بطاقة حالة الطلب */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7 sm:py-5">
            <div>
              <p className="text-xs font-medium text-gray-400">حالة الطلب</p>
              <p className="mt-1 flex items-center gap-2 text-lg font-extrabold text-white">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
                />
                قيد المراجعة
              </p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-accent)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          {/* الخطوات: عمودية على الموبايل، أفقية من md */}
          <ol className="grid grid-cols-1 px-5 py-6 sm:px-7 sm:py-7 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              const connector =
                step.state === "done" ? "bg-emerald-500/50" : "bg-white/15";

              return (
                <li
                  key={step.title}
                  className="relative flex gap-4 pb-7 last:pb-0 md:flex-col md:items-center md:gap-3 md:px-3 md:pb-0 md:text-center"
                  aria-current={step.state === "active" ? "step" : undefined}
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute right-5 top-10 h-[calc(100%-2.5rem)] w-px md:left-[-50%] md:right-1/2 md:top-5 md:h-px md:w-auto ${connector}`}
                    />
                  )}

                  <span
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border ${iconStyles[step.state]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <p className={`font-bold ${titleStyles[step.state]}`}>
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* تنبيه البريد */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3">
            <Mail
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-white">
                راجع بريدك الإلكتروني
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                سيصلك الرقم المرجعي والتحديثات المتعلقة بالشكوى.
              </p>
            </div>
          </div>

          <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 sm:self-center">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            خلال 24 ساعة عمل
          </p>
        </div>

        {/* الإجراء */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="group inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#121212] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90 sm:w-auto"
          >
            <span>العودة للصفحة الرئيسية</span>
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-medium text-gray-500">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          بياناتك محمية ويتم التعامل معها بسرية
        </p>
      </div>
    </section>
  );
}
