import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Shield, ArrowRight, EyeIcon, EyeOffIcon, CheckCircle, LockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechAlert } from '@/components/ui/tech-alert';
import { GridBackground, CyberBackground, ParticleBackground } from '@/components/ui/Background';
import axios from 'axios';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Will replace with actual API endpoint once backend is connected
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/resetpassword/verify/${token}`);
        setVerifying(false);
      } catch (err) {
        console.error('Token verification error:', err);
        setVerificationError(
          err.response?.data?.message || 'This password reset link is invalid or has expired.'
        );
        setVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setVerificationError('No reset token provided');
      setVerifying(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (resetError) setResetError(null);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { text: '', color: '' },
      1: { text: 'Very weak', color: 'bg-red-500' },
      2: { text: 'Weak', color: 'bg-orange-500' },
      3: { text: 'Moderate', color: 'bg-yellow-500' },
      4: { text: 'Strong', color: 'bg-green-500' },
      5: { text: 'Very strong', color: 'bg-green-600' }
    };

    return { score, ...strengthMap[score] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setResetError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength.score < 3) {
      setResetError('Please use a stronger password');
      setLoading(false);
      return;
    }

    try {
      // Will replace with actual API endpoint once backend is connected
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resetpassword/${token}`, {
        password: formData.password
      });
      
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setResetError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
              Create a new password for your RealShield account
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
              {verifying ? (
                <div className="py-8 text-center">
                  <div className="tech-spinner h-12 w-12 mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Verifying your reset link...</p>
                </div>
              ) : verificationError ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <TechAlert variant="error">
                      {verificationError}
                    </TechAlert>
                  </motion.div>
                  <p className="text-muted-foreground mb-6">
                    You can request a new password reset link.
                  </p>
                  <Link to="/forgot-password">
                    <Button variant="shield" className="w-full tech-button-glow">
                      Request new link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : success ? (
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
                  <h3 className="text-xl font-medium mb-2">Password reset successful</h3>
                  <p className="text-muted-foreground mb-6">
                    Your password has been reset successfully. You can now sign in with your new password.
                  </p>
                  <Link to="/login">
                    <Button variant="shield" className="w-full tech-button-glow">
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {resetError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <TechAlert variant="error">
                        {resetError}
                      </TechAlert>
                    </motion.div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm flex items-center">
                        <LockIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
                          disabled={loading}
                          className="tech-input pl-10 mb-1"
                        />
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 
                            <EyeOffIcon className="h-4 w-4" /> : 
                            <EyeIcon className="h-4 w-4" />
                          }
                        </button>
                        
                        {/* Password strength indicator */}
                        {formData.password && (
                          <div className="space-y-1 mt-2">
                            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${passwordStrength.color}`} 
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center">
                              {passwordStrength.text && (
                                <>
                                  <span>{passwordStrength.text}</span>
                                  {passwordStrength.score >= 3 && (
                                    <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                                  )}
                                </>
                              )}
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                              <li className="flex items-center">
                                <span className={`h-1.5 w-1.5 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                At least 8 characters
                              </li>
                              <li className="flex items-center">
                                <span className={`h-1.5 w-1.5 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                Uppercase letter
                              </li>
                              <li className="flex items-center">
                                <span className={`h-1.5 w-1.5 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                Number
                              </li>
                              <li className="flex items-center">
                                <span className={`h-1.5 w-1.5 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                Special character
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm flex items-center">
                        <LockIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
                          disabled={loading}
                          className="tech-input pl-10"
                        />
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        className="w-full tech-button-glow" 
                        variant="shield"
                        disabled={loading || (formData.password !== formData.confirmPassword) || passwordStrength.score < 3}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="tech-spinner mr-2"></div>
                            Resetting password...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Reset password
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

export default ResetPasswordPage;
