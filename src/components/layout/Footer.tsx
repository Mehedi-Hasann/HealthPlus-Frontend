import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Cross } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cross className="w-4 h-4 text-white rotate-45" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                HealthPlus Pharmacy
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted digital pharmacy. We are dedicated to providing high-quality healthcare products and medicines directly to your doorstep with 100% authenticity.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop Medicines</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Healthcare Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6">Top Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/shop?category=First Aid" className="hover:text-primary transition-colors">First Aid</Link></li>
              <li><Link href="/shop?category=baby" className="hover:text-primary transition-colors">Fever & Pain</Link></li>
              <li><Link href="/shop?category=Vitamin" className="hover:text-primary transition-colors">Vitamins</Link></li>
              <li><Link href="/shop?category=Cardiovascular Agents" className="hover:text-primary transition-colors">Heart Care</Link></li>
              <li><Link href="/shop?category=Diabetes" className="hover:text-primary transition-colors">Diabetes</Link></li>
              {/* <li><Link href="/shop?category=baby" className="hover:text-primary transition-colors">Baby Care</Link></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(+880) 1719456716</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@healthplusPharmacy.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} HealthPlus Pharmacy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
