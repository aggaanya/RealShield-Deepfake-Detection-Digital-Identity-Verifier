import React from 'react';
import { Shield, Github, Twitter, Linkedin, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HexagonBackground } from './ui/Background';

const Footer = () => {
  return (
    <footer className="border-t border-blue-100/50 dark:border-blue-900/30 bg-white dark:bg-neutral-900 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 tech-bg-grid opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Shield className="h-7 w-7 text-blue-600 dark:text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="font-bold text-xl tech-gradient-text">
                Real<span className="tech-gradient-text">Shield</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Protecting digital truth with AI-powered deepfake detection and source verification technology.
            </p>
            
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                Contact Us
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/detect" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Deepfake Detection
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Source Verification
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-100/50 dark:border-blue-900/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RealShield. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:info@realshield.com" 
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
