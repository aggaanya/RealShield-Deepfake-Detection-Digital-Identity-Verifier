import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Check, Globe, Users, Lock, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="container py-16">
      {/* Hero section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-shield-100 dark:bg-shield-900/50 p-4 rounded-full">
            <Shield className="h-12 w-12 text-shield-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6">About RealShield</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to protect digital trust with AI-powered deepfake detection 
          and source verification in an era of synthetic media.
        </p>
      </motion.div>
      
      {/* Our story */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          
          <p className="text-lg mb-6">
            RealShield is founded in 2025 by a team of AI researchers, cybersecurity experts, and media professionals 
            united by a common concern: the growing threat of deepfakes and synthetic media to public trust.
          </p>
          
          <p className="text-lg mb-6">
            As AI-generated content became increasingly sophisticated and accessible, we recognized the urgent need 
            for robust detection technologies that could help individuals and organizations verify the authenticity 
            of digital media.
          </p>
          
          <p className="text-lg mb-6">
            What began as a research project at a leading technical university has evolved into a comprehensive 
            platform that combines cutting-edge AI detection algorithms with innovative source verification methods, 
            designed to serve journalists, content creators, social media platforms, and everyday users concerned 
            about media integrity.
          </p>
          
          <p className="text-lg">
            Today, RealShield is at the forefront of the battle against misinformation, providing accessible tools 
            that help maintain trust in our increasingly digital world.
          </p>
        </div>
      </motion.section>
      
      {/* Our mission */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-24 bg-shield-50 dark:bg-shield-900/10 py-16 px-4 rounded-2xl"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          
          <p className="text-lg mb-8">
            To empower people with the tools and knowledge needed to distinguish between authentic and 
            synthetic media, protecting truth in the digital age.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-shield-900/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-shield-100 dark:bg-shield-900 rounded-full mr-4">
                  <Lock className="h-5 w-5 text-shield-500" />
                </div>
                <h3 className="font-semibold text-lg">Trust Protection</h3>
              </div>
              <p className="text-muted-foreground">
                Safeguarding public trust in visual and audio media through accessible verification tools.
              </p>
            </div>
            
            <div className="bg-white dark:bg-shield-900/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-shield-100 dark:bg-shield-900 rounded-full mr-4">
                  <Zap className="h-5 w-5 text-shield-500" />
                </div>
                <h3 className="font-semibold text-lg">Innovation</h3>
              </div>
              <p className="text-muted-foreground">
                Continuously advancing our detection technologies to keep pace with evolving synthetic media capabilities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-shield-900/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-shield-100 dark:bg-shield-900 rounded-full mr-4">
                  <Globe className="h-5 w-5 text-shield-500" />
                </div>
                <h3 className="font-semibold text-lg">Accessibility</h3>
              </div>
              <p className="text-muted-foreground">
                Making advanced detection technology available to everyone, not just specialized institutions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-shield-900/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-shield-100 dark:bg-shield-900 rounded-full mr-4">
                  <Users className="h-5 w-5 text-shield-500" />
                </div>
                <h3 className="font-semibold text-lg">Education</h3>
              </div>
              <p className="text-muted-foreground">
                Raising awareness about deepfakes and promoting digital literacy in an age of synthetic media.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Team section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                <img 
                  src="public\patterns\aanya.jpeg" 
                  alt="Aanya Aggarwal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Aanya Aggarwal</h3>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                <img 
                  src="public\patterns\saumya.jpeg" 
                  alt="Saumya Kashyap"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Saumya Kashyap</h3>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                <img 
                  src="public\patterns\manya.jpeg" 
                  alt="Manya Dawar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Manya Dawar</h3>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-shield-600 text-white p-12 rounded-2xl text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Join Us in Protecting Digital Truth</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Try RealShield today and become part of the movement to ensure trust and authenticity in the digital world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="default" 
            size="lg"
            className="bg-white text-shield-600 hover:bg-shield-50"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white border-2 text-white bg-blue-500/40 hover:bg-white/20"
          >
            Contact Us
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
