import { Truck, ShieldCheck, Clock, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "Free Delivery",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure Payment",
    description: "100% secure payment with SSL encryption",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Delivery",
    description: "Round the clock delivery for emergencies",
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-primary" />,
    title: "24/7 Support",
    description: "Dedicated support team available 24/7",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
