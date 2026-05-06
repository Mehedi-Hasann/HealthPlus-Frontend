import Link from "next/link";
import { Pill, HeartPulse, Stethoscope, Activity, Baby, Eye, Droplets, Thermometer } from "lucide-react";

const categories = [
  // { name: "Prescription", icon: <Pill className="w-8 h-8" />, color: "bg-blue-500/10 text-blue-600", link: "/shop?category=prescription" },
  { name: "Vitamins", icon: <Activity className="w-8 h-8" />, color: "bg-orange-500/10 text-orange-600", link: "/shop?category=Vitamin" },
  { name: "Heart Care", icon: <HeartPulse className="w-8 h-8" />, color: "bg-red-500/10 text-red-600", link: "/shop?category=Cardiovascular Agents" },
  { name: "Diabetes", icon: <Droplets className="w-8 h-8" />, color: "bg-teal-500/10 text-teal-600", link: "/shop?category=Diabetes" },
  { name: "Baby Care", icon: <Baby className="w-8 h-8" />, color: "bg-pink-500/10 text-pink-600", link: "/shop?category=Baby Care" },
  { name: "Eye Care", icon: <Eye className="w-8 h-8" />, color: "bg-indigo-500/10 text-indigo-600", link: "/shop?category=Analgesics" },
  { name: "Fever & Pain", icon: <Thermometer className="w-8 h-8" />, color: "bg-rose-500/10 text-rose-600", link: "/shop?category=fever" },
  { name: "First Aid", icon: <Stethoscope className="w-8 h-8" />, color: "bg-emerald-500/10 text-emerald-600", link: "/shop?category=firstaid" },
];

export function CategoriesSection() {
  return (
    <section className="w-full py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-xl">
              Browse through our wide range of medical categories to find exactly what you need quickly and easily.
            </p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex text-primary font-medium hover:underline items-center">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/shop" className="inline-flex text-primary font-medium hover:underline items-center">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
