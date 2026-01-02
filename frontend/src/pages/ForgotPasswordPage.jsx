import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft, CheckCircle, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechAlert } from '@/components/ui/tech-alert';
import { GridBackground, CyberBackground, ParticleBackground } from '@/components/ui/Background';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Will replace with actual API endpoint once backend is connected
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgotpassword`, { email });
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to process request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-shield-50/50 dark:from-background dark:to-shield-950/20 relative overflow-hidden">
      {/* Tech-themed particle backgrounds */}
      <ParticleBackground count={15} />
      <div className="absolute inset-0 tech-bg-grid opacity-10"></div>
      
      {/* Decorative glowing elements */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-shield-500/20 rounded-full filter blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100 
            }}
          >
            <div className="bg-shield-500/10 dark:bg-shield-500/20 p-4 rounded-full relative">
              <div className="absolute -inset-0.5 rounded-full bg-shield-500 opacity-30 blur-md animate-pulse-shield"></div>
              <Shield className="h-8 w-8 text-shield-500 relative z-10" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Reset your <span className="gradient-text">password</span>
            </h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="tech-card backdrop-blur-sm border-shield-100 dark:border-shield-800/50">
            <CardContent className="pt-6">
              {success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full relative">
                      <div className="absolute -inset-0.5 rounded-full bg-green-500 opacity-20 blur-md"></div>
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500 relative z-10" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Check your email</h3>
                  <p className="text-muted-foreground mb-6">
                    We've sent a password reset link to <span className="font-medium">{email}</span>. 
                    Please check your inbox and spam folder.
                  </p>
                  <Link to="/login">
                    <Button variant="outline" className="w-full tech-button-glow">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to login
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <TechAlert variant="error">
                        {error}
                      </TechAlert>
                    </motion.div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm flex items-center">
                        <MailIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        Email address
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="name@example.com"
                          required
                          disabled={loading}
                          className="tech-input pl-10"
                        />
                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        className="w-full tech-button-glow" 
                        variant="shield"
                        disabled={loading || !email}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="tech-spinner mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Send reset link
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-shield-100 dark:border-shield-800/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Remember your password? </span>
                <Link 
                  to="/login" 
                  className="text-shield-500 hover:text-shield-600 dark:hover:text-shield-400 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </div>
              
              <div className="tech-shimmer w-full h-8 mt-4 opacity-20"></div>
              
              <Badge 
                variant="outline" 
                className="self-center mt-2 text-xs bg-shield-50/50 dark:bg-shield-900/30 border-shield-100 dark:border-shield-800/50"
              >
                <Shield className="h-3 w-3 mr-1 text-shield-500" />
                Protected by RealShield Technology
              </Badge>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
