import React, { useState } from 'react';
import { Shield, Bell, Lock, User, Globe, Activity, Download, Upload, Zap, Wifi, WifiOff, Languages, BarChart2, Layers, Calendar, Clock, Monitor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataUsage, setDataUsage] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated",
    });
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Language Preferences</h3>
                <div className="flex items-center max-w-md">
                  <select 
                    id="language"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </select>
                  <Languages className="ml-2 h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Choose your preferred language for the interface</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Data Usage & Analysis</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Allow anonymous data collection to improve detection capabilities</p>
                    <p className="text-xs text-muted-foreground">This helps us improve our AI models for better protection</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={dataUsage} 
                      onChange={() => setDataUsage(!dataUsage)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Default Detection Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      id="image-detection" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      defaultChecked
                    />
                    <Label htmlFor="image-detection">Image Detection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="audio-detection" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      defaultChecked
                    />
                    <Label htmlFor="audio-detection">Audio Detection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="video-detection" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      defaultChecked
                    />
                    <Label htmlFor="video-detection">Video Detection</Label>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates, alerts and notifications via email</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications} 
                      onChange={() => setEmailNotifications(!emailNotifications)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive in-app notifications for important alerts</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={pushNotifications} 
                      onChange={() => setPushNotifications(!pushNotifications)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Privacy Mode</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Enable enhanced privacy mode</p>
                    <p className="text-xs text-muted-foreground">Disables telemetry and increases anonymization of your data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={privacyMode} 
                      onChange={() => setPrivacyMode(!privacyMode)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Auto-Scanning Protection</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Automatically scan uploaded content</p>
                    <p className="text-xs text-muted-foreground">Scans all uploaded content for AI-generated elements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={autoScan} 
                      onChange={() => setAutoScan(!autoScan)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">AI Detection Engine</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Detection Sensitivity</span>
                    <Badge variant="outline" className="ml-2">Beta</Badge>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Standard</span>
                      <span>Aggressive</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="7"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Higher sensitivity may increase false positives</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Real-time Alerts</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={realTimeAlerts} 
                          onChange={() => setRealTimeAlerts(!realTimeAlerts)}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Layers className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Deep Scan</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={true} 
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span>AI Model Version</span>
                    <span className="font-medium">RealShield v3.2.1</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Performance & Bandwidth</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Download className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium">Cache Size</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current usage</span>
                        <span>245 MB</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 MB</span>
                        <span>500 MB</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">Clear Cache</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Upload className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium">Network Usage</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Data sent</span>
                        <span>12.5 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Data received</span>
                        <span>48.7 MB</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="font-medium">Connection</span>
                        <span className="flex items-center">
                          <Wifi className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">Online</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Analysis Engine</h3>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Media Processing</div>
                      <select 
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="hybrid"
                      >
                        <option value="local">Local Only</option>
                        <option value="cloud">Cloud Only</option>
                        <option value="hybrid">Hybrid (Recommended)</option>
                      </select>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Scan Schedule</div>
                      <select 
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="realtime"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Advanced Detection Methods</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input 
                          id="forensic-analysis" 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          defaultChecked
                        />
                        <Label htmlFor="forensic-analysis" className="text-sm">Forensic Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          id="metadata-detection" 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          defaultChecked
                        />
                        <Label htmlFor="metadata-detection" className="text-sm">Metadata Detection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          id="pattern-recognition" 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          defaultChecked
                        />
                        <Label htmlFor="pattern-recognition" className="text-sm">Pattern Recognition</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          id="anomaly-detection" 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          defaultChecked
                        />
                        <Label htmlFor="anomaly-detection" className="text-sm">Anomaly Detection</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button onClick={() => {
                  toast({
                    title: "Advanced settings saved",
                    description: "Your advanced settings have been updated",
                  });
                }}>Save Advanced Settings</Button>
                
                <Button variant="outline" className="text-red-500 hover:text-red-700">
                  Reset to Default
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
