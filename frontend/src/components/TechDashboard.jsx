import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/ui/stats-card';
import ProgressIndicator, { TechProgressBar } from '@/components/ui/progress-indicator';
import { BarChart, Users, FileText, Shield, Zap, Clock, Bell, TrendingUp } from 'lucide-react';

const DashboardHeader = ({ user, stats }) => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 tech-bg-grid opacity-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}</h1>
            <p className="text-blue-100">Here's what's happening with your account today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="sm" className="text-white border-white/20">
              <Bell className="h-4 w-4 mr-1" />
              Alerts
            </Button>
            <Button variant="glass" size="sm" className="text-white border-white/20">
              <Shield className="h-4 w-4 mr-1" />
              Security
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-hidden relative group hover:bg-white/20 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
            <div className="text-xs text-blue-100 mb-1 flex items-center">
              <BarChart className="h-3 w-3 mr-1" />
              Total Scans
            </div>
            <div className="text-2xl font-bold flex items-center">
              {stats?.totalScans || 0}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="ml-2 text-xs py-0.5 px-1.5 bg-blue-500/20 rounded text-blue-200 flex items-center"
              >
                +28%
                <TrendingUp className="h-2.5 w-2.5 ml-0.5" />
              </motion.div>
            </div>
            <div className="mt-2 w-full h-1 bg-white/10 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              ></motion.div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-hidden relative group hover:bg-white/20 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-colors"></div>
            <div className="text-xs text-blue-100 mb-1 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Threats Detected
            </div>
            <div className="text-2xl font-bold flex items-center">
              {stats?.threatsDetected || 0}
              <div className="relative ml-2">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="mt-2 w-full h-1 bg-white/10 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '42%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-red-400 to-red-600"
              ></motion.div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-hidden relative group hover:bg-white/20 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-colors"></div>
            <div className="text-xs text-blue-100 mb-1 flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              Files Verified
            </div>
            <div className="text-2xl font-bold flex items-center">
              {stats?.filesVerified || 0}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="ml-2 text-xs py-0.5 px-1.5 bg-green-500/20 rounded text-green-200 flex items-center"
              >
                +15%
              </motion.div>
            </div>
            <div className="mt-2 w-full h-1 bg-white/10 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '88%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
              ></motion.div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-hidden relative group hover:bg-white/20 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-colors"></div>
            <div className="text-xs text-blue-100 mb-1 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Team Members
            </div>
            <div className="text-2xl font-bold relative">
              {stats?.teamMembers || 0}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [-10, 10, 0] }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-0 -right-3 w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center text-xs font-bold text-white"
              >
                +2
              </motion.div>
            </div>
            <div className="mt-2 flex -space-x-2">
              {[...Array(Math.min(stats?.teamMembers || 0, 5))].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 * i }}
                  className={`w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center text-xs font-medium bg-gradient-to-br ${
                    ['from-blue-400 to-indigo-600', 
                     'from-purple-400 to-pink-600', 
                     'from-amber-400 to-orange-600',
                     'from-emerald-400 to-green-600',
                     'from-rose-400 to-red-600'][i % 5]
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
              {(stats?.teamMembers || 0) > 5 && (
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center text-xs font-medium bg-gradient-to-br from-slate-400 to-slate-600"
                >
                  +{(stats?.teamMembers || 0) - 5}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechActivityFeed = ({ activities = [] }) => {
  if (!activities.length) {
    activities = [
      {
        id: 1,
        type: 'scan',
        title: 'Deepfake detection scan completed',
        description: 'video001.mp4 was analyzed with 98% confidence',
        time: '2 hours ago',
        status: 'success'
      },
      {
        id: 2,
        type: 'verify',
        title: 'Source verification completed',
        description: 'image003.jpg was verified with original source',
        time: '5 hours ago',
        status: 'warning'
      },
      {
        id: 3,
        type: 'alert',
        title: 'Security alert',
        description: 'Suspicious login attempt detected from new location',
        time: '1 day ago',
        status: 'error'
      }
    ];
  }
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge variant="tech" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Success</Badge>;
      case 'warning':
        return <Badge variant="tech" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Warning</Badge>;
      case 'error':
        return <Badge variant="tech" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Alert</Badge>;
      default:
        return <Badge variant="tech">Info</Badge>;
    }
  };
  
  const getIcon = (type) => {
    switch (type) {
      case 'scan':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'verify':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'alert':
        return <Bell className="h-5 w-5 text-red-500" />;
      default:
        return <Zap className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <Card variant="tech" className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="mr-2 h-5 w-5 text-blue-500" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0 last:pb-0"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const UsageStatsCard = ({ usageData = {} }) => {
  if (!usageData.scanLimit) {
    usageData = {
      scanLimit: 100,
      scansUsed: 42,
      verificationLimit: 50,
      verificationsUsed: 27,
      storageLimit: 10,
      storageUsed: 3.5
    };
  }
  
  return (
    <Card variant="tech" className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-blue-500" />
          Usage Stats
        </h3>
        <div className="space-y-5">
          <TechProgressBar
            label="Deepfake Detection Scans"
            progress={(usageData.scansUsed / usageData.scanLimit) * 100}
          />
          <TechProgressBar
            label="Source Verifications"
            progress={(usageData.verificationsUsed / usageData.verificationLimit) * 100}
          />
          <TechProgressBar
            label="Storage Used"
            progress={(usageData.storageUsed / usageData.storageLimit) * 100}
          />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Plan: Professional
            <Button variant="techOutline" size="sm" className="ml-4 text-xs py-1 h-7">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const TechDashboard = ({ user, stats, activities, usageData }) => {
  // Default user if not provided
  if (!user) {
    user = { name: 'User', email: 'user@example.com' };
  }
  
  // Default stats if not provided
  if (!stats) {
    stats = {
      totalScans: 65,
      threatsDetected: 12,
      filesVerified: 53,
      teamMembers: 5
    };
  }
  
  return (
    <div className="space-y-6">
      <DashboardHeader user={user} stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechActivityFeed activities={activities} />
        <UsageStatsCard usageData={usageData} />
      </div>
    </div>
  );
};

// Expose internal components as properties of TechDashboard
TechDashboard.ActivityFeed = TechActivityFeed;
TechDashboard.Header = DashboardHeader;
TechDashboard.UsageStats = UsageStatsCard;

export default TechDashboard;
