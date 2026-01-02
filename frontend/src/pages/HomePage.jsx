import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, ArrowRight, Award, BarChart, Globe, Zap, Users, Lock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeatureCard from '@/components/ui/feature-card';
import StatsCard from '@/components/ui/stats-card';
import { GridBackground, ParticleBackground, CyberBackground } from '@/components/ui/Background';
import { useNavigate } from 'react-router-dom';
import ImmerseCard from '@/components/ui/immerse-card';
import FlowBackground from '@/components/ui/flow-background';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with asymmetric layout and distinctive design */}
      <section className="relative overflow-hidden">
        {/* Base background with intentional gradient asymmetry */}
        <div className="absolute inset-0 bg-gradient-to-tr from-shield-50/70 via-background to-background dark:from-shield-950/40 dark:via-background/80 dark:to-background"></div>
        
        {/* Decorative circuit-like pattern on one side */}
        <div className="absolute top-0 bottom-0 left-0 w-1/3 opacity-[0.07] dark:opacity-[0.12]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%233182ce' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        ></div>
        
        {/* Light source effect in top-right */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.15] blur-3xl bg-gradient-to-br from-shield-300 to-blue-500 dark:from-shield-500 dark:to-blue-600"></div>
        
        {/* Dynamic tech elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 bottom-0 w-[3px] h-[20%] bg-shield-500/30"></div>
          <div className="absolute left-[3px] bottom-0 w-[150px] h-[3px] bg-shield-500/30"></div>
          
          <div className="absolute right-0 top-0 w-[3px] h-[30%] bg-shield-500/30"></div>
          <div className="absolute right-[3px] top-0 w-[250px] h-[3px] bg-shield-500/30"></div>
          
          {/* Animated data points */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-shield-500"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                top: `${15 + i * 18}%`,
                left: '3px',
              }}
            />
          ))}
        </div>
        
        {/* Content with asymmetric layout */}
        <div className="container relative z-10 py-20 md:py-28 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <div className="flex items-start mb-6">
                <div className="mr-4 mt-1">
                  <div className="h-12 w-1.5 bg-shield-500 rounded-sm"></div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-shield-600 dark:text-shield-400 font-medium mb-1">
                    Industry-Leading Solution
                  </h3>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                    Protecting digital <br />
                    <span className="relative">
                      <span className="gradient-text tech-text-glow">truth</span>
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-shield-500 to-transparent"></span>
                    </span> in 
                    an AI world
                  </h1>
                </div>
              </div>

              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                RealShield's proprietary technology detects deepfakes in videos, images, and audio with unmatched speed and precision. 
                <span className="inline-block mt-2 font-medium text-foreground">Trusted by media professionals and government agencies worldwide.</span>
              </motion.p>

              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                <Button 
                  variant="circuit" 
                  size="asymm" 
                  onClick={() => navigate('/detect')}
                  className="text-base font-medium"
                  motion="glint"
                >
                  Detect Deepfakes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="hologram" 
                  size="lg"
                  onClick={() => navigate('/verify')}
                  className="text-base font-medium"
                >
                  Verify Source
                </Button>
              </div>
              
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="border-l-2 border-shield-300/30 dark:border-shield-700/30 pl-3">
                  <div className="text-2xl font-bold">98.7%</div>
                  <div className="text-xs text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="border-l-2 border-shield-300/30 dark:border-shield-700/30 pl-3">
                  <div className="text-2xl font-bold">4.2s</div>
                  <div className="text-xs text-muted-foreground">Avg. Response Time</div>
                </div>
                <div className="border-l-2 border-shield-300/30 dark:border-shield-700/30 pl-3">
                  <div className="text-2xl font-bold">320+</div>
                  <div className="text-xs text-muted-foreground">Media Partners</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right content column - Enhanced Visual with ImmerseCard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Tech declaration above - advanced AI status display */}
              <div className="absolute -top-6 -right-4 z-10 flex">
                <div className="bg-indigo-900/90 text-indigo-100 text-xs py-1.5 px-3 font-mono rounded-l-sm backdrop-blur-sm border-y border-l border-indigo-700/80 flex items-center">
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-violet-400 mr-2"
                  ></motion.div>
                  <span className="text-violet-300">AI:</span><span className="text-indigo-200 ml-1">ACTIVE</span>
                </div>
                <div className="bg-violet-900/80 text-white text-xs py-1.5 px-3 font-mono rounded-r-sm backdrop-blur-sm border-y border-r border-violet-700/60">
                  <motion.div
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative overflow-hidden"
                  >
                    <span className="tech-scan-text">deepfake:detection=enabled</span>
                  </motion.div>
                </div>
              </div>
              
              <ImmerseCard 
                className="mx-auto max-w-md" 
                contentClassName="p-0"
                accentColor="rgba(89, 65, 255, 0.8)"
                depth={5}
                maxRotation={8}
              >
                <div className="bg-gradient-to-br from-indigo-50/80 via-shield-50/60 to-violet-100/70 dark:from-indigo-900/80 dark:via-shield-950/70 dark:to-violet-950/90 relative z-10 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 tech-bg-grid opacity-20"></div>
                  
                  {/* Main visual - enhanced futuristic AI analyzer */}
                  <div className="p-2">
                    <div className="h-[350px] rounded-lg overflow-hidden relative">
                      <FlowBackground variant="purple" intensity="high" layerCount={4} className="absolute inset-0" />
                      
                      {/* New asymmetric futuristic light accents */}
                      <div className="absolute right-10 top-10 w-60 h-40 rounded-[30%] bg-indigo-500/15 filter blur-2xl transform rotate-[35deg]"></div>
                      <div className="absolute -left-20 bottom-10 w-48 h-48 rounded-[70%] bg-violet-500/20 filter blur-3xl transform -rotate-[25deg]"></div>
                      
                      {/* Interactive AI analysis visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
                          
                          {/* AI analysis framework - hexagonal layout */}
                          <div className="absolute inset-0">
                            {/* Hexagonal grid pattern */}
                            <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                              <defs>
                                <pattern id="hexGrid" width="10" height="17.32" patternUnits="userSpaceOnUse">
                                  <path d="M5,0 L10,8.66 L5,17.32 L0,8.66 Z" 
                                    fill="none" 
                                    stroke="rgba(124, 58, 237, 0.5)" 
                                    strokeWidth="0.5" 
                                  />
                                </pattern>
                              </defs>
                              <rect x="0" y="0" width="100" height="100" fill="url(#hexGrid)" />
                            </svg>
                          </div>
                          
                          {/* Scanning beam effect */}
                          <motion.div 
                            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                            animate={{ 
                              top: [0, '100%', 0],
                              opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          ></motion.div>
                          
                          {/* AI data nodes */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute h-3 w-3 rounded-full bg-${i % 2 ? 'indigo' : 'violet'}-500`}
                              style={{
                                top: `${20 + i * 12}%`,
                                left: `${15 + (i * 15) % 70}%`,
                              }}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ 
                                duration: 2 + i * 0.5, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                              }}
                            />
                          ))}
                          
                          {/* Central AI analyzer with dynamic effect */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className="relative"
                              animate={{ 
                                scale: [0.9, 1.1, 0.9],
                                rotate: [-5, 5, -5]
                              }}
                              transition={{ 
                                duration: 8, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            >
                              {/* Asymmetric futuristic glow */}
                              <div className="absolute -inset-8 rounded-[50%] bg-indigo-500/30 filter blur-xl opacity-70"></div>
                              <div className="bg-black/70 shadow-lg border border-indigo-500/50 rounded-lg p-5 backdrop-blur-lg relative z-10 overflow-hidden">
                                {/* AI Analyzer Interface */}
                                <div className="relative flex flex-col items-center">
                                  {/* Analyzer header */}
                                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500"></div>
                                  
                                  {/* Main AI processor */}
                                  <div className="w-16 h-16 relative mb-1 mt-2">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <motion.div 
                                        className="w-full h-full rounded-full border-2 border-indigo-400 border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                      ></motion.div>
                                    </div>
                                    <div className="absolute inset-2 flex items-center justify-center">
                                      <motion.div 
                                        className="w-full h-full rounded-full border-2 border-violet-400 border-b-transparent"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                      ></motion.div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 shadow-lg shadow-purple-500/30"></div>
                                    </div>
                                  </div>
                                  
                                  {/* AI Status display */}
                                  <div className="w-full font-mono text-[10px] text-center text-indigo-300 mt-1">
                                    <motion.div
                                      animate={{ opacity: [0.6, 1, 0.6] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      DeepScan™ AI ACTIVE
                                    </motion.div>
                                    <div className="grid grid-cols-3 gap-1 mt-1">
                                      <div className="border border-indigo-500/30 rounded px-1 flex items-center justify-center">
                                        <motion.div 
                                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                                          transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}
                                          className="text-[8px]"
                                        >
                                          SCAN
                                        </motion.div>
                                      </div>
                                      <div className="border border-purple-500/30 rounded px-1 flex items-center justify-center">
                                        <motion.div 
                                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                                          transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }}
                                          className="text-[8px]"
                                        >
                                          ANALYZE
                                        </motion.div>
                                      </div>
                                      <div className="border border-violet-500/30 rounded px-1 flex items-center justify-center">
                                        <motion.div 
                                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                                          transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
                                          className="text-[8px]"
                                        >
                                          VERIFY
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Connection lines - directional data flow */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={`line-${i}`}
                              className="absolute h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/80 to-indigo-500/0"
                              style={{
                                top: `${30 + Math.sin(i * 45) * 25}%`,
                                left: `${20 + (i * 5)}%`,
                                width: `${30 + (i % 3) * 10}%`,
                                transform: `rotate(${i * 45}deg)`
                              }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                left: [`${20 + (i * 5)}%`, `${15 + (i * 5)}%`, `${20 + (i * 5)}%`]
                              }}
                              transition={{
                                duration: 3 + (i % 3),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3
                              }}
                            />
                          ))}
                          
                          {/* Data points with organic movement */}
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1.5 h-1.5 rounded-full"
                              style={{ 
                                backgroundColor: i % 3 === 0 ? 'rgb(99, 102, 241)' : 
                                               i % 3 === 1 ? 'rgb(139, 92, 246)' : 
                                               'rgb(167, 139, 250)',
                                // Organic positioning
                                top: `${15 + Math.sin(i * 30) * 40}%`,
                                left: `${15 + Math.cos(i * 30) * 40}%`
                              }}
                              animate={{ 
                                opacity: [0, 0.8, 0],
                                scale: [0.5, 1.2, 0.5],
                              }}
                              transition={{
                                duration: 2 + Math.random() * 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Scanner visualization - enhanced with organic movement */}
                      <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
                        {/* Advanced scanner beam with randomness */}
                        <motion.div 
                          className="absolute left-0 right-0 h-2 bg-gradient-to-r from-transparent via-shield-500 to-transparent blur-sm"
                          animate={{ 
                            top: ['0%', '100%', '0%'],
                            width: ['100%', '95%', '100%', '97%', '100%'],
                            left: ['0%', '2%', '0%', '3%', '0%'],
                          }}
                          transition={{ 
                            top: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                            width: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                            left: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                          }}
                        ></motion.div>
                      </div>
                      
                      {/* Asymmetrical data readouts */}
                      <div className="absolute bottom-4 right-4 max-w-[180px] text-right">
                        <div className="text-shield-500 dark:text-shield-400 text-xs font-mono space-y-1.5 opacity-80">
                          <div>shield.integrity: 100%</div>
                          <div>scan.status: active</div>
                          <div>security.level: maximum</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-shield-900/60 border-t border-shield-100/50 dark:border-shield-800/40 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <div className="w-2 h-2 rounded-full bg-shield-500"></div>
                          <motion.div 
                            className="absolute -inset-1 rounded-full border border-shield-500/30"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                        </div>
                        <div className="text-sm font-medium">RealShield Guardian</div>
                      </div>
                      
                      {/* Enhanced status indicators with randomness */}
                      <div className="flex space-x-2">
                        <motion.div 
                          className="relative w-2 h-2 rounded-full bg-shield-500"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.8 + Math.random() * 0.4, repeat: Infinity }}
                        >
                          <motion.div 
                            className="absolute -inset-1 rounded-full bg-shield-500"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                        </motion.div>
                        
                        <motion.div 
                          className="relative w-2 h-2 rounded-full bg-blue-500"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2.2 + Math.random() * 0.4, delay: 0.3, repeat: Infinity }}
                        >
                          <motion.div 
                            className="absolute -inset-1 rounded-full bg-blue-500"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                          ></motion.div>
                        </motion.div>
                        
                        <motion.div 
                          className="relative w-2.5 h-2.5 rounded-full bg-green-500"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5 + Math.random() * 0.4, delay: 0.6, repeat: Infinity }}
                        >
                          <motion.div 
                            className="absolute -inset-1 rounded-full bg-green-500"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                          ></motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </ImmerseCard>
              
              {/* Distinctive accents - moved outside to create more organic look */}
              <div className="absolute -top-4 -bottom-4 -right-2 w-1.5 bg-gradient-to-b from-shield-500 via-shield-500/40 to-shield-500"></div>
              <div className="absolute -right-2 -bottom-4 h-1.5 w-32 bg-gradient-to-r from-shield-500 to-transparent"></div>
              <div className="absolute -top-4 -left-2 w-1.5 h-12 bg-gradient-to-b from-shield-500 to-transparent"></div>
              
              {/* Tech declaration below */}
              <div className="absolute -bottom-6 left-10 bg-shield-900/90 text-white text-xs py-1.5 px-3 font-mono rounded-sm backdrop-blur-sm border border-shield-800/50 transform -rotate-1">
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-shield-500"></div>
                  <span>system:online</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          

        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-shield-200 dark:bg-shield-900/20 rounded-full filter blur-3xl opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-shield-200 dark:bg-shield-900/20 rounded-full filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Features Section with Enhanced Cards */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 tech-bg-dots opacity-5"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="tech" className="mb-4">
                <Zap className="mr-1 h-3.5 w-3.5" />
                Advanced Technology
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                State-of-the-Art <span className="gradient-text">Detection Features</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform uses cutting-edge AI to detect and verify content authenticity across multiple formats.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon={<Shield />}
              title="Deepfake Detection"
              description="Identify manipulated videos, images, and audio in under 5 seconds with 98% accuracy using our specialized AI models."
              items={[
                "Facial inconsistency analysis",
                "Voice pattern verification",
                "Lip-sync mismatch detection"
              ]}
              color="shield"
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={<Award />}
              title="Source Verification"
              description="Validate content authenticity through comprehensive metadata analysis and digital signature verification."
              items={[
                "Digital signature validation",
                "Metadata integrity checking",
                "Chain of custody verification"
              ]}
              color="trust"
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={<Globe />}
              title="Multilingual Support"
              description="Industry-leading regional language support for audio analysis and lip-sync verification across Indian languages."
              items={[
                "Hindi, Tamil, Malayalam support",
                "Dialect & accent recognition",
                "Cultural context awareness"
              ]}
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-shield-50/70 dark:bg-shield-950/30 relative overflow-hidden">
        <div className="absolute inset-0 tech-bg-grid opacity-10"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="gradient-text">Trusted</span> by Industry Leaders
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard 
              title="Detection Accuracy"
              value="98.7%"
              icon={<CheckCircle />}
              variant="shield"
            />
            <StatsCard 
              title="Content Protected"
              value="120M+"
              icon={<Lock />}
              variant="blue"
            />
            <StatsCard 
              title="Media Partners"
              value="320+"
              icon={<Users />}
              variant="trust"
            />
            <StatsCard 
              title="Response Time"
              value="4.2s"
              icon={<Zap />}
              variant="amber"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 tech-bg-dots opacity-5"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="tech" className="mb-4">
                <Users className="mr-1 h-3.5 w-3.5" />
                Success Stories
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Who Uses RealShield</h2>
              <p className="text-lg text-muted-foreground">
                RealShield is the preferred solution for organizations that need reliable deepfake detection and source verification.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <Card className="tech-card card-hover overflow-hidden">
              <div className="aspect-video bg-shield-100/50 dark:bg-shield-900/50 relative overflow-hidden">
                <GridBackground className="absolute inset-0 opacity-30" />
                <div className="relative z-10 w-full h-full flex items-center justify-center text-shield-500">
                  <BarChart className="w-12 h-12" />
                </div>
              </div>
              <CardContent className="pt-6 relative">
                <Badge variant="blue" className="absolute top-4 right-4">Media</Badge>
                <h3 className="text-xl font-semibold mb-2">Media Houses</h3>
                <p className="text-muted-foreground mb-4">
                  Leading news organizations use RealShield to verify user-submitted videos and prevent the spread of manipulated content.
                </p>
                <Button variant="techOutline" size="sm">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="tech-card card-hover overflow-hidden">
              <div className="aspect-video bg-shield-100/50 dark:bg-shield-900/50 relative overflow-hidden">
                <GridBackground className="absolute inset-0 opacity-30" />
                <div className="relative z-10 w-full h-full flex items-center justify-center text-shield-500">
                  <Award className="w-12 h-12" />
                </div>
              </div>
              <CardContent className="pt-6 relative">
                <Badge variant="amber" className="absolute top-4 right-4">Government</Badge>
                <h3 className="text-xl font-semibold mb-2">Election Commissions</h3>
                <p className="text-muted-foreground mb-4">
                  Electoral bodies deploy RealShield to quickly identify and flag manipulated videos of political candidates during election cycles.
                </p>
                <Button variant="techOutline" size="sm">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with ImmerseCard and FlowBackground */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-20 w-60 h-60 bg-shield-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-shield-500/5 rounded-full filter blur-3xl"></div>
        
        {/* Tech-themed accent lines */}
        <div className="absolute top-0 left-1/4 h-10 w-[2px] bg-shield-500/20"></div>
        <div className="absolute top-10 left-1/4 w-20 h-[2px] bg-shield-500/20"></div>
        <div className="absolute bottom-0 right-1/3 h-16 w-[2px] bg-shield-500/20"></div>
        <div className="absolute bottom-16 right-1/3 w-28 h-[2px] bg-shield-500/20"></div>
        
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Advanced decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-shield-500/30 rounded-tl-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-shield-500/30 rounded-br-xl"></div>
            <div className="absolute top-0 left-0 w-4 h-4 bg-shield-500/20 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-shield-500/20 rounded-full"></div>
            
            <ImmerseCard className="overflow-hidden">
              <FlowBackground variant="shield" intensity="medium" layerCount={3}>
                <div className="p-8 md:p-12 relative z-10">
                  {/* Asymmetrical layout with distinctive elements */}
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="md:w-3/5">
                      <div className="flex items-start mb-6">
                        <div className="mr-4 mt-1">
                          <div className="h-12 w-1.5 bg-shield-500 rounded-sm"></div>
                        </div>
                        <div>
                          <Badge 
                            variant="tech" 
                            className="mb-3 bg-white/10 backdrop-blur-md border-white/20"
                          >
                            <Shield className="mr-1.5 h-3.5 w-3.5" />
                            <span className="relative">
                              Start Protecting Your Content
                              <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-shield-500/50 to-transparent"></span>
                            </span>
                          </Badge>
                          <h2 className="text-3xl font-bold mb-2">
                            Ready to <span className="gradient-text tech-text-glow">safeguard</span> your digital content?
                          </h2>
                          <div className="mt-1 mb-3 w-20 h-[2px] bg-gradient-to-r from-shield-500/80 to-transparent rounded-full"></div>
                          <p className="text-lg mb-8 text-black-200">
                            Join media organizations, government agencies, and businesses already using RealShield to protect their content integrity.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              variant="circuit" 
                              size="asymm"
                              motion="glint"
                              onClick={() => navigate('/register')}
                            >
                              Get Started For Free
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button 
                              variant="hologram" 
                              size="lg"
                              onClick={() => navigate('/contact')}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Contact Sales
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Distinctive visual element */}
                    <div className="md:w-2/5 flex items-center justify-center relative">
                      <div className="relative w-40 h-40">
                        {/* Dynamic scanning animation */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-shield-500/30"
                          animate={{ 
                            boxShadow: ['0 0 0 0 rgba(66, 153, 225, 0)', '0 0 0 10px rgba(66, 153, 225, 0.2)', '0 0 0 0 rgba(66, 153, 225, 0)'] 
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        ></motion.div>
                        
                        {/* Inner rings with non-symmetrical animation */}
                        <motion.div 
                          className="absolute inset-4 border-2 border-shield-400/40 rounded-full"
                          animate={{ 
                            rotate: [0, 360],
                            scale: [0.9, 1.1, 0.9],
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                          }}
                        ></motion.div>
                        
                        {/* Middle layer with reverse animation */}
                        <motion.div 
                          className="absolute inset-8 border border-shield-400/60 rounded-full"
                          animate={{ 
                            rotate: [360, 0],
                            scale: [1.1, 0.9, 1.1],
                          }}
                          transition={{ 
                            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                          }}
                        ></motion.div>
                        
                        {/* Shield in the center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="bg-white/10 backdrop-blur-xl shadow-lg rounded-full p-5 border border-white/20"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              boxShadow: [
                                '0 0 20px 0 rgba(66, 153, 225, 0.3)',
                                '0 0 30px 5px rgba(66, 153, 225, 0.5)',
                                '0 0 20px 0 rgba(66, 153, 225, 0.3)'
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Shield className="w-10 h-10 text-shield-400" />
                          </motion.div>
                        </div>
                        
                        {/* Random data points */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-shield-500 rounded-full"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 2,
                              delay: i * 0.5,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Distinctive tech element */}
                      <div className="absolute -bottom-4 -right-4 text-xs font-mono bg-black/30 backdrop-blur-md border border-shield-500/20 px-2 py-1 rounded-sm">
                        <motion.span
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          shield-protocol:active
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>
              </FlowBackground>
            </ImmerseCard>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
