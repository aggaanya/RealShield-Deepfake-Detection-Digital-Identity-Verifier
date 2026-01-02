import React, { useEffect, useState } from 'react';
import { 
  Shield, 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileVideo, 
  FileImage, 
  FileAudio, 
  Search,
  Filter,
  Calendar,
  BarChart,
  ArrowRight,
  FileText,
  Loader2,
  Download,
  Share,
  Eye,
  Trash2,
  Table,
  Grid,
  Layers,
  Map,
  Activity,
  Zap,
  TrendingUp,
  PieChart,
  LineChart,
  Radar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressIndicator, { TechProgressBar } from '@/components/ui/progress-indicator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TechDashboard from '@/components/TechDashboard';
import StatsCard from '@/components/ui/stats-card';
import { GridBackground, CyberBackground } from '@/components/ui/Background';
import DataVisualization from '@/components/ui/data-visualization';
import TrendingDesignGraph from '@/components/ui/TrendingDesignGraph';
import { TechAlert } from '@/components/ui/tech-alert';
import ThreatsMap from '@/components/ui/threats-map';
import ActivityTimeline from '@/components/ui/activity-timeline';
import DetectionMethodsChart from '@/components/ui/detection-methods-chart';
import ThreatScoreIndicator from '@/components/ui/threat-score-indicator';
import ContentAnalysis3D from '@/components/ui/content-analysis-3d';
import ThreatIntelligenceRadar from '@/components/ui/threat-intelligence-radar';
import AnomalyDetectionChart from '@/components/ui/anomaly-detection-chart';
import ForensicComparisonViewer from '@/components/ui/forensic-comparison-viewer';
import AIDetectionScoreVisualizer from '@/components/ui/ai-detection-score-visualizer';
import ContentDistributionChart from '@/components/ui/content-distribution-chart';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

const DashboardPage = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUploads: 0,
    detectionsRun: 0,
    verificationsRun: 0,
    detectedFakes: 0
  });
  const [recentContent, setRecentContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Simulating API call to fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In real implementation, we'll fetch from the backend
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
        //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        // });
        
        // For now, using mock data
        setTimeout(() => {
          setStats({
            totalUploads: 24,
            detectionsRun: 18,
            verificationsRun: 6,
            detectedFakes: 7
          });

          setRecentContent([
            {
              id: 'c1',
              name: 'Interview_PM_Modi.mp4',
              type: 'video',
              size: '24.5MB',
              uploadDate: '2023-07-15T10:30:00Z',
              status: 'analyzed',
              analysisType: 'detection',
              result: {
                isFake: true,
                confidence: 92,
                details: {
                  videoManipulation: 85,
                  audioManipulation: 76,
                  inconsistencies: ['Lip sync mismatch', 'Face warping detected']
                }
              }
            },
            {
              id: 'c2',
              name: 'Press_Conference.mp4',
              type: 'video',
              size: '36.2MB',
              uploadDate: '2023-07-14T14:20:00Z',
              status: 'analyzed',
              analysisType: 'verification',
              result: {
                isVerified: true,
                confidence: 97,
                details: {
                  signatureMatch: true,
                  metadataUnaltered: true,
                  sourceConfirmed: true
                }
              }
            },
            {
              id: 'c3',
              name: 'CM_Statement.jpg',
              type: 'image',
              size: '2.8MB',
              uploadDate: '2023-07-14T09:15:00Z',
              status: 'analyzed',
              analysisType: 'detection',
              result: {
                isFake: false,
                confidence: 89,
                details: {
                  imageManipulation: 11,
                  consistencyScore: 94
                }
              }
            },
            {
              id: 'c4',
              name: 'Election_Speech.mp3',
              type: 'audio',
              size: '8.7MB',
              uploadDate: '2023-07-13T16:45:00Z',
              status: 'analyzed',
              analysisType: 'detection',
              result: {
                isFake: true,
                confidence: 87,
                details: {
                  voiceSynthesis: 91,
                  patternMismatch: true
                }
              }
            }
          ]);
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Filter content based on search and active tab
  const filteredContent = recentContent.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'fakes' && item.result?.isFake) ||
      (activeTab === 'verified' && item.result?.isVerified) ||
      (activeTab === item.type);
    
    return matchesSearch && matchesTab;
  });

  // Get icon based on content type
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'image':
        return <FileImage className="h-5 w-5" />;
      case 'audio':
        return <FileAudio className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <CyberBackground className="min-h-screen">
      <TechDashboard.Header 
        user={user || { name: 'User' }} 
        stats={{
          totalScans: stats.totalUploads,
          threatsDetected: stats.detectedFakes,
          filesVerified: stats.verificationsRun,
          teamMembers: 5
        }}
      />

      <div className="container mx-auto py-8 px-4">
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Scans"
            value={stats.totalUploads}
            icon={<Shield className="text-blue-500" />}
            trend={{
              value: "+28%",
              label: "vs last month",
              positive: true
            }}
            variant="blue"
          />
          <StatsCard 
            title="Deepfakes Detected"
            value={stats.detectedFakes}
            icon={<AlertTriangle className="text-amber-500" />}
            trend={{
              value: "-12%",
              label: "vs last month",
              positive: true
            }}
            variant="amber"
          />
          <StatsCard 
            title="Verifications"
            value={stats.verificationsRun}
            icon={<CheckCircle className="text-green-500" />}
            trend={{
              value: "+15%",
              label: "vs last month",
              positive: true
            }}
            variant="green"
          />
          <StatsCard 
            title="Threat Score"
            value="42"
            icon={<Activity className="text-purple-500" />}
            trend={{
              value: "-8%",
              label: "vs last month",
              positive: true
            }}
            variant="purple"
          />
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* New interactive components */}
            <div className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ThreatIntelligenceRadar className="min-h-[400px]" />
                <AIDetectionScoreVisualizer className="min-h-[400px]" />
              </div>
            </div>
          
            {/* Real-time data anomaly detection */}
            <div className="mb-6">
              <AnomalyDetectionChart className="min-h-[350px]" />
            </div>
          
            {/* Forensic comparison viewer */}
            <div className="mb-6">
              <ForensicComparisonViewer className="min-h-[400px]" />
            </div>
            
            {/* Content distribution chart */}
            <div className="mb-6">
              <ContentDistributionChart className="min-h-[350px]" />
            </div>
          
            {/* Actions Row with enhanced styling */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold flex items-center">
                <div className="mr-3 p-2 rounded-md bg-shield-500/10 border border-shield-500/20 backdrop-blur-sm">
                  <Layers className="h-5 w-5 text-shield-500" />
                </div>
                <span className="gradient-text">Content Analysis</span>
              </h2>
              <div className="flex gap-3">
                <Button 
                  variant="circuit" 
                  onClick={() => navigate('/detect')}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Detection
                </Button>
                <Button 
                  variant="hologram" 
                  onClick={() => navigate('/verify')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Verify Source
                </Button>
              </div>
            </div>

            {/* Search and Filters with enhanced UI */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 relative">
              {/* Asymmetric decorative elements */}
              <div className="absolute -left-2 top-1/2 bottom-0 w-[1px] h-1/2 bg-gradient-to-b from-shield-500/30 to-transparent"></div>
              
              <div className="relative flex-1 w-full backdrop-blur-sm">
                <div className="absolute left-0 top-0 w-8 h-[1px] bg-shield-500/30"></div>
                <div className="absolute left-0 top-0 h-8 w-[1px] bg-shield-500/30"></div>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shield-400/70 h-4 w-4" />
                <Input 
                  placeholder="Search content analysis..." 
                  className="pl-10 border-white/10 bg-black/20 focus:ring-shield-500/50 focus:border-shield-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 p-1 bg-black/20 rounded-md border border-white/10 backdrop-blur-sm">
                <Button 
                  variant={viewMode === 'grid' ? 'circuit' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'table' ? 'circuit' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('table')}
                >
                  <Table className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Tabs and List */}
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-shield-50/70 dark:bg-shield-900/30 rounded-none p-1">
                    <TabsTrigger value="all" className="flex-1 data-[state=active]:tech-tab-active">
                      All Content
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex-1 data-[state=active]:tech-tab-active">
                      Videos
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex-1 data-[state=active]:tech-tab-active">
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="flex-1 data-[state=active]:tech-tab-active">
                      Audio
                    </TabsTrigger>
                    <TabsTrigger value="fakes" className="flex-1 data-[state=active]:tech-tab-active">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Fakes
                    </TabsTrigger>
                  </TabsList>
                  
                  <CardContent className="p-4">
                    <TabsContent value={activeTab} className="m-0">
                      {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                          <div className="tech-spinner mb-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                          </div>
                          <p>Loading your content...</p>
                        </div>
                      ) : filteredContent.length === 0 ? (
                        <div className="py-20 text-center text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <h3 className="text-lg font-medium">No content found</h3>
                          <p className="max-w-xs mx-auto mt-1">
                            {searchQuery 
                              ? `No results match your search "${searchQuery}"`
                              : "You haven't analyzed any content yet."
                            }
                          </p>
                          {!searchQuery && (
                            <Button 
                              className="mt-4" 
                              variant="tech" 
                              size="sm"
                              onClick={() => navigate('/detect')}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Upload Content
                            </Button>
                          )}
                        </div>
                      ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredContent.map((item) => (
                            <div
                              key={item.id}
                              className="h-full"
                            >
                              <Card className="tech-card-item h-full flex flex-col overflow-hidden">
                                <div className="aspect-video bg-shield-200/30 dark:bg-shield-900/50 flex items-center justify-center relative">
                                  {getContentTypeIcon(item.type)}
                                  
                                  {/* Status Badge */}
                                  <Badge 
                                    variant={
                                      item.result?.isFake ? "warning" : 
                                      item.result?.isVerified ? "success" : "secondary"
                                    }
                                    className="absolute top-3 right-3"
                                  >
                                    {item.result?.isFake ? "Fake Detected" : 
                                     item.result?.isVerified ? "Source Verified" : 
                                     "Authentic"}
                                  </Badge>
                                  
                                  {/* Tech overlay effect */}
                                  <div className="absolute inset-0 border border-shield-300/20 tech-scan-overlay pointer-events-none"></div>
                                </div>
                                
                                <CardContent className="p-4 flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <p className="font-medium line-clamp-1">{item.name}</p>
                                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <Badge variant="outline" className="mr-2 text-xs">
                                          {item.size}
                                        </Badge>
                                        <span>{formatDate(item.uploadDate)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                                
                                <CardFooter className="p-3 bg-tech-gradient-light dark:bg-tech-gradient-dark border-t border-shield-100 dark:border-shield-900/50 flex justify-between">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                                    View
                                  </Button>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="icon">
                                      <Download className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Share className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </CardFooter>
                              </Card>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full tech-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredContent.map((item) => (
                                <tr
                                  key={item.id}
                                >
                                  <td>{item.name}</td>
                                  <td>
                                    <div className="flex items-center">
                                      {getContentTypeIcon(item.type)}
                                      <span className="ml-2 capitalize">{item.type}</span>
                                    </div>
                                  </td>
                                  <td>{formatDate(item.uploadDate)}</td>
                                  <td>
                                    <Badge 
                                      variant={
                                        item.result?.isFake ? "warning" : 
                                        item.result?.isVerified ? "success" : "secondary"
                                      }
                                    >
                                      {item.result?.isFake ? "Fake" : 
                                      item.result?.isVerified ? "Verified" : 
                                      "Authentic"}
                                    </Badge>
                                  </td>
                                  <td>
                                    <div className="flex gap-1">
                                      <Button variant="ghost" size="icon">
                                        <Eye className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Download className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">

            {/* Threat Score Indicator */}
            <Card className="overflow-hidden">
              <CardHeader className="relative pb-2">
                {/* Decorative accent */}
                <div className="absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 via-orange-500/50 to-yellow-500/30"></div>
                
                <CardTitle className="text-lg flex items-center pl-3">
                  <div className="mr-3 p-1.5 bg-red-500/20 rounded-md border border-red-500/30 backdrop-blur-sm">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-gradient-red">Threat Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ThreatScoreIndicator 
                  score={67}
                  previousScore={58}
                  className="my-4"
                />
                
                <div className="mt-6">
                  <DetectionMethodsChart />
                </div>
              </CardContent>
            </Card>

            {/* Global Threats Map */}
            <Card className="overflow-hidden">
              <CardHeader className="relative pb-2">
                <div className="absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/50 to-blue-500/30"></div>
                
                <CardTitle className="text-lg flex items-center pl-3">
                  <div className="mr-3 p-1.5 bg-blue-500/20 rounded-md border border-blue-500/30 backdrop-blur-sm">
                    <Map className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-gradient-blue">Global Threats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4">
                  <ThreatsMap height={220} />
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="overflow-hidden">
              <CardHeader className="relative pb-2">
                <div className="absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-purple-500/50 to-purple-500/30"></div>
                
                <CardTitle className="text-lg flex items-center pl-3">
                  <div className="mr-3 p-1.5 bg-purple-500/20 rounded-md border border-purple-500/30 backdrop-blur-sm">
                    <Clock className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-gradient-purple">Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityTimeline className="mt-2" />
                <div className="mt-4 text-center">
                  <Button variant="hologram" size="sm" className="text-xs">
                    View All Activity
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CyberBackground>
  );
};

export default DashboardPage;
