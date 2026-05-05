import { Users, Package, Award, Smile } from "lucide-react";

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "50k+", label: "Happy Customers" },
  { icon: <Package className="w-8 h-8" />, value: "10k+", label: "Medicines Available" },
  { icon: <Award className="w-8 h-8" />, value: "15+", label: "Years Experience" },
  { icon: <Smile className="w-8 h-8" />, value: "99%", label: "Positive Reviews" },
];

export function StatsSection() {
  return (
    <section className="w-7/12 mx-auto roundex-xl py-16 bg-teal-700 rounded-lg text-primary-foreground relative overflow-hidden mb-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</h3>
              <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
