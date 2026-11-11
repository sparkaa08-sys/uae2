import {
  Smartphone,
  ShoppingCart,
  Building2,
  Plane,
  CreditCard,
  Wrench,
  Truck,
  Users,
  LucideIcon,
} from "lucide-react";

export interface CategoryItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const categories: CategoryItem[] = [
  { icon: Smartphone, title: "شكاوى الاتصالات والإنترنت", desc: "عقود الهواتف، مشاكل التغطية، ورسوم الخدمات المضافة بدون إذن." },
  { icon: ShoppingCart, title: "التسوق الإلكتروني والمتاجر", desc: "المتاجر الإلكترونية، التأخر في التوصيل، وسياسات الإرجاع المضللة." },
  { icon: Building2, title: "العقارات والوساطة التجارية", desc: "خلافات شركات إدارة العقارات، الرسوم الإدارية، وعقود الوساطة." },
  { icon: Plane, title: "السفر والحجوزات السياحية", desc: "إلغاء وتأخير الرحلات، مشكلات حجوزات الفنادق، والشركات السياحية." },
  { icon: CreditCard, title: "البنوك والخدمات المالية", desc: "الرسوم المجحفة، المعاملات غير المصرح بها، والخدمات المصرفية." },
  { icon: Wrench, title: "الصيانة والخدمات المنزلية", desc: "عقود الصيانة، الأجهزة الكهربائية، والخدمات الفنية غير المطابقة." },
  { icon: Truck, title: "تطبيقات التوصيل والنقل", desc: "تطبيقات التوصيل الذكية، طلبات الطعام، وخدمات النقل الخاص." },
  { icon: Users, title: "خدمات القطاع الخاص الأخرى", desc: "الشكاوى العامة ضد الشركات والمراكز التجارية الخاصة بالدولة." },
];

export function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-slate-navy py-20 md:py-28 text-white">
      {/* تأثير توهج خلفي باللون الذهبي الشامبين */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-accent/10 blur-[120px] rounded-full" 
      />

      <div className="container-page relative z-10">
        {/* العنوان والوصف */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-semibold text-accent border border-accent/20 mb-3">
            القطاعات المشمولة
          </span>
          <h2 className="text-3xl font-extrabold md:text-4xl text-white tracking-tight">
            مجالات الشكاوى التجارية
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">
            نغطي مختلف القطاعات التجارية الخاصة لضمان وصول صوتك وحماية حقوقك الشاملة.
          </p>
        </div>

        {/* شبكة البطاقات الداكنة */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, idx) => (
            <article
              key={idx}
              className="group relative rounded-2xl border border-white/10 bg-slate-dark/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:bg-slate-dark/90 hover:shadow-2xl hover:shadow-accent/10"
            >
              {/* أيقونة العناصر مع تأثيرات الذهبي عند التأشير */}
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-slate-dark group-hover:scale-110">
                <c.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              </div>

              {/* عنوان الشكوى */}
              <h3 className="mt-5 text-base font-bold text-white transition-colors duration-200 group-hover:text-accent">
                {c.title}
              </h3>

              {/* الشرح */}
              <p className="mt-2 text-xs leading-6 text-white/60 transition-colors duration-200 group-hover:text-white/80">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}