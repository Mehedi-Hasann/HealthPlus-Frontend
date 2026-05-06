import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <section className="w-full bg-primary/5 py-16 border-b border-border/50 mb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions or need assistance? We are here to help you 24/7.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you have a question about an order, need help finding a medicine, or want to provide feedback, our support team is always ready to assist you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <MapPin className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-1">Our Location</h3>
              <p className="text-sm text-muted-foreground">123 Health Avenue,<br />Medical District, Dhaka, Bangladesh</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <Phone className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-1">Phone Number</h3>
              <p className="text-sm text-muted-foreground">(+880) 1784-937263<br />(+880) 1988-47463</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <Mail className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-1">Email Address</h3>
              <p className="text-sm text-muted-foreground">support@healthplusPharmacy.com<br />contact@healthplusPharmacy.com</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <Clock className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
              <p className="text-sm text-muted-foreground">Monday - Sunday<br />24/7 Support Available</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
          <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
              <input type="text" id="name" className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" placeholder="John Doe" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
              <input type="email" id="email" className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
              <input type="text" id="subject" className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" placeholder="How can we help?" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <textarea id="message" rows={5} className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none" placeholder="Write your message here..."></textarea>
            </div>
            
            <button type="button" className="w-full h-12 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
