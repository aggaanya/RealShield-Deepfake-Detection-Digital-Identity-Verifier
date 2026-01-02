import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Save, EyeIcon, EyeOffIcon, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuthStore from '@/stores/authStore';

const ProfilePage = () => {
  const { user, updateProfile, changePassword, isLoading, error, clearError } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    jobTitle: user?.jobTitle || '',
    bio: user?.bio || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [localError, setLocalError] = useState('');
  
  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        organization: user.organization || '',
        jobTitle: user.jobTitle || '',
        bio: user.bio || '',
      });
    }
  }, [user]);
  
  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    setLocalError('');
    clearError();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setLocalError('');
    clearError();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');
    
    const result = await updateProfile(profileData);
    
    if (result.success) {
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    // Validate password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setLocalError('New passwords do not match');
      return;
    }

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      setSuccessMessage('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account information and security
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <div className="w-28 h-28 rounded-full bg-shield-100 dark:bg-shield-900/50 flex items-center justify-center">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <span className="text-shield-500 text-4xl font-medium">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  
                  {user?.organization && (
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium">{user.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{user.organization}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 w-full space-y-2">
                    <p className="text-sm font-medium">Account Status</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>Email verification</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Subscription</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-medium">
                        Free
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account settings tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-x-auto pb-1">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="api">API Keys</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={isLoading}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {successMessage && (
                      <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-md mb-4">
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          disabled={!isEditing || isLoading}
                          readOnly={!isEditing}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled={!isEditing || isLoading}
                          readOnly={!isEditing}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization (Optional)</Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={profileData.organization}
                          onChange={handleProfileChange}
                          disabled={!isEditing || isLoading}
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          value={profileData.jobTitle}
                          onChange={handleProfileChange}
                          disabled={!isEditing || isLoading}
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio (Optional)</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          disabled={!isEditing || isLoading}
                          readOnly={!isEditing}
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      {isEditing && (
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <span className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></span>
                                Saving...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </span>
                            )}
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to ensure account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {successMessage && (
                      <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-md mb-4">
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPassword.current ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => togglePasswordVisibility('current')}
                            aria-label={showPassword.current ? "Hide password" : "Show password"}
                          >
                            {showPassword.current ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => togglePasswordVisibility('new')}
                            aria-label={showPassword.new ? "Hide password" : "Show password"}
                          >
                            {showPassword.new ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => togglePasswordVisibility('confirm')}
                            aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                          >
                            {showPassword.confirm ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                        {passwordData.newPassword && passwordData.confirmPassword && 
                         passwordData.newPassword !== passwordData.confirmPassword && (
                          <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                        )}
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isLoading || (
                            passwordData.newPassword !== passwordData.confirmPassword
                          )}
                          className="w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <span className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></span>
                              Updating Password...
                            </span>
                          ) : 'Update Password'}
                        </Button>
                      </div>
                    </form>

                    <div className="mt-8 border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Setup 2FA</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your notification and system preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Preferences settings coming soon</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* API Keys Tab */}
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage your API keys to integrate with RealShield services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">API management coming soon</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
