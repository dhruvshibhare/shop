'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <Link href="/shop" className="inline-block">
              <h3 className="text-xl font-bold mb-4"><span className="text-primary">ShopVix</span></h3>
            </Link>
            <p className="text-muted-foreground mb-6">
              Creating exceptional digital experiences through innovative web development, design, and 3D interactions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/shop/services#web-development" className="text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/shop/services#interactive" className="text-muted-foreground hover:text-primary transition-colors">Interactive Experiences</Link></li>
              <li><Link href="/shop/services#design" className="text-muted-foreground hover:text-primary transition-colors">UX/UI Design</Link></li>
              <li><Link href="/shop/services#optimization" className="text-muted-foreground hover:text-primary transition-colors">Performance Optimization</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/shop/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/shop/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/shop/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/shop/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ShopVix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}