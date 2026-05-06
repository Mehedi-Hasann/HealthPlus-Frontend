export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-primary/5 py-20 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <span className="inline-block py-1.5 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Dedicated to Your Health & Well-being
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            HealthPlus Pharmacy was founded with a simple mission: to make high-quality healthcare accessible, affordable, and convenient for everyone. We believe that getting your essential medicines should not be a hassle.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are a digital-first pharmacy connecting certified sellers and pharmacies with customers who need genuine medical products. With a robust verification system, we ensure that every product sold on our platform meets the highest standards of safety and efficacy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need prescription medicines, over-the-counter drugs, or wellness supplements, HealthPlus Pharmacy provides a seamless ordering experience and fast delivery straight to your door.
              </p>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden border border-border shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974&auto=format&fit=crop" 
                alt="Pharmacy Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-muted-foreground text-sm">We strictly verify all sellers to ensure 100% genuine medical products.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-muted-foreground text-sm">Making healthcare products accessible to everyone, anywhere, anytime.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-muted-foreground text-sm">Fast, secure, and reliable delivery right to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
