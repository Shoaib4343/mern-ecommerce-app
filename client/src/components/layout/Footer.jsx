import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Main Footer Content */}
      <div className="container-custom px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Elon store logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-2xl font-light tracking-wide text-gray-900">
                Elon
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover quality products that enhance your lifestyle. We're committed to delivering excellence in every purchase.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-gray-900 font-medium mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-medium mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-medium mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} strokeWidth={1.5} className="text-gray-600 mt-0.5" />
                <a
                  href="mailto:support@elon.com"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  support@elon.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} strokeWidth={1.5} className="text-gray-600 mt-0.5" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.5} className="text-gray-600 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  123 Commerce Street,<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-100">
        <div className="container-custom px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-gray-900 font-medium mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-6">
              Get the latest updates on new products and exclusive offers.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container-custom px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Elon. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;