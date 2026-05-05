import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Find Your Medicine",
    description: "Search for your required medicines or upload your prescription.",
  },
  {
    icon: <ShoppingCart className="w-10 h-10 text-primary" />,
    title: "Add to Cart",
    description: "Add the medicines to your cart and proceed to checkout securely.",
  },
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Fast Delivery",
    description: "Get your medicines delivered right to your doorstep in no time.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
          Getting your medicines is as easy as 1-2-3. Follow these simple steps to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
