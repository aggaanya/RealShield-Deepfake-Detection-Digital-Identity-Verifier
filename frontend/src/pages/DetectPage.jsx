import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileUpload from '@/components/FileUpload';
import {
  Shield,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Video,
  Image as ImageIcon,
  AudioLines,
  Info,
  Camera,
  Mic,
  Trash2,
  Play,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechAlert } from '@/components/ui/tech-alert';
import { TechSpinner, LoadingOverlay } from '@/components/ui/loading-spinner';
import { ScanningProgressBar } from '@/components/ui/progress-indicator';
import { ThreatAnalysisCard } from '@/components/ui/data-visualization';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNotifications } from '@/components/ui/notification-system';

const DetectPage = ({ user }) => {
  // Default to video tab, text tab has been removed
  const [activeTab, setActiveTab] = useState('video');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('english');
  const [showTechInfo, setShowTechInfo] = useState(false);
  
  const navigate = useNavigate();
  const { shield, error: notifyError } = useNotifications();

  useEffect(() => {
    // Reset state when changing tabs
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setLoading(false);
    setTitle('');
    setShowTechInfo(false);
  }, [activeTab]);

  // Progress simulation effect
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);
    } else if (progress === 95) {
      setProgress(100);
    }

    return () => clearInterval(interval);
  }, [loading, progress]);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);

    // Create preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview(fileUrl);

    // Automatically set title based on filename
    setTitle(selectedFile.name.split('.')[0].replace(/_/g, ' '));
  };

  const handleRemoveFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setTitle('');
  };

  const getFileTypeFromTab = () => {
    switch (activeTab) {
      case 'video':
        return 'video/*';
      case 'image':
        return 'image/*';
      case 'audio':
        return 'audio/*';
      default:
        return '*/*';
    }
  };

  const getFileIcon = () => {
    switch (activeTab) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <AudioLines className="h-5 w-5 text-blue-500" />;
      default:
        return <Upload className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to analyze');
      notifyError({ title: 'Error', message: 'Please select a file to analyze' });
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    // For demo purposes, simulate API call with setTimeout
    setTimeout(() => {
      // Simulate completion
      setProgress(100);
      setLoading(false);
      
      // Generate mock result based on file type
      const mockResult = generateMockResult(activeTab);
      setResult(mockResult);

      // Notify user
      shield({
        title: 'Analysis Complete',
        message: `${file.name} has been analyzed successfully.`,
        actions: [
          {
            label: 'Show Details',
            onClick: () => setShowTechInfo(true)
          }
        ]
      });
    }, 4000);

    // In a real app, you would make an actual API call here
    /*
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('language', language);
      formData.append('type', activeTab);
      
      const response = await axios.post('/api/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      
      setResult(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during analysis');
      setLoading(false);
    }
    */
  };

  // Mock function to generate sample results for demo purposes
  const generateMockResult = (type) => {
    const confidenceScore = Math.floor(Math.random() * 40) + 60; // 60-99%
    const isDeepfake = confidenceScore > 80;
    
    return {
      isDeepfake,
      confidenceScore,
      detectionMetrics: [
        { label: 'Visual Inconsistency', value: Math.floor(Math.random() * 100) },
        { label: 'Audio Mismatch', value: Math.floor(Math.random() * 100) },
        { label: 'Facial Anomalies', value: Math.floor(Math.random() * 100) },
        { label: 'Temporal Coherence', value: Math.floor(Math.random() * 100) },
        { label: 'Metadata Analysis', value: Math.floor(Math.random() * 100) }
      ],
      analysisDate: new Date().toISOString(),
      reportId: 'SHIELD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      mediaType: type,
      recommendations: isDeepfake ? [
        'Verify the source of this content before sharing',
        'Look for official versions from trusted sources',
        'Check for inconsistencies in lighting, audio, or unnatural movements'
      ] : [
        'While this content appears authentic, always verify information from multiple sources',
        'Be cautious when sharing sensitive content even if it appears legitimate'
      ]
    };
  };

  // Prepare file mime type for preview
  const getPreviewType = () => {
    if (!file) return '';
    return file.type;
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div>
              <Badge className="mb-2">RealShield Analysis</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Deepfake Detection
              </h1>
              <p className="text-muted-foreground">
                Upload media for analysis using our advanced neural model detection system
              </p>
            </div>
          </div>

          {/* File Type Selection */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="video" className="flex gap-2 items-center">
                    <Video className="h-4 w-4" />
                    <span className="hidden sm:inline">Video</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex gap-2 items-center">
                    <ImageIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="flex gap-2 items-center">
                    <AudioLines className="h-4 w-4" />
                    <span className="hidden sm:inline">Audio</span>
                  </TabsTrigger>
                </TabsList>

                {/* Common content for all tabs */}
                <div>
                  <form onSubmit={handleSubmit}>
                    {!file ? (
                      <div>
                        <FileUpload
                          onFileSelect={handleFileSelect}
                          accept={getFileTypeFromTab()}
                          maxSize={100 * 1024 * 1024} // 100MB
                          className="mb-6"
                        />
                      </div>
                    ) : (
                      <div className="mb-6">
                        {/* File Preview */}
                        <div className="mb-6 border rounded-lg p-5">
                          {/* Close button */}
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="float-right p-1.5 bg-white/10 rounded-md text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>

                          {/* Preview content based on file type */}
                          <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Media preview container */}
                            <div className="relative rounded-lg overflow-hidden bg-black/5 w-full md:w-48 h-48 flex items-center justify-center">
                              {activeTab === 'video' && preview ? (
                                <div className="relative w-full h-full">
                                  <video src={preview} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <button 
                                      type="button"
                                      className="p-3 rounded-full bg-shield-500/20 text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const video = e.currentTarget.parentNode.previousSibling;
                                        if (video.paused) {
                                          video.play();
                                        } else {
                                          video.pause();
                                        }
                                      }}
                                    >
                                      <Play className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                              ) : activeTab === 'image' && preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                              ) : activeTab === 'audio' && preview ? (
                                <div className="flex items-center justify-center w-full h-full">
                                  <div className="bg-black/5 p-3 rounded-lg w-11/12">
                                    <audio controls src={preview} className="w-full" />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                  {getFileIcon()}
                                  <span className="mt-2 text-sm">{file.name}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="space-y-5">
                                <div>
                                  <Label htmlFor="title" className="text-sm font-medium">
                                    Title
                                  </Label>
                                  <div className="mt-1.5">
                                    <Input
                                      id="title"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      placeholder="Enter a title for this media"
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <Label htmlFor="language" className="text-sm font-medium">
                                    Language
                                  </Label>
                                  <div className="mt-1.5">
                                    <select
                                      id="language"
                                      value={language}
                                      onChange={(e) => setLanguage(e.target.value)}
                                      className="w-full rounded-lg bg-white/5 text-black pl-4 h-10 border"
                                    >
                                      <option value="english">English</option>
                                      <option value="spanish">Spanish</option>
                                      <option value="french">French</option>
                                      <option value="german">German</option>
                                      <option value="chinese">Chinese</option>
                                      <option value="japanese">Japanese</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="flex items-center text-xs text-gray-500 gap-2">
                                  <Info className="h-3 w-3" />
                                  <span>
                                    File: <span>{file.name}</span> 
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gray-100">
                                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit"
                          className="w-full"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <TechSpinner className="mr-2" size="sm" />
                              <span>Analyzing Media...</span>
                            </>
                          ) : (
                            <>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Start Detection</span>
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {error && (
                      <TechAlert 
                        variant="destructive" 
                        title="Error" 
                        className="mt-4"
                      >
                        {error}
                      </TechAlert>
                    )}
                    
                    {loading && (
                      <div className="mt-6 space-y-5">
                        <ScanningProgressBar progress={progress} label="Analysis Progress" />
                        
                        <div className="mx-auto max-w-md bg-black/5 rounded-lg p-4">
                          <div className="text-xs text-gray-500 flex items-start">
                            <Info className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                            <span>RealShield's advanced detection algorithms are analyzing multiple aspects of your {activeTab}, including visual artifacts, audio inconsistencies, and metadata integrity.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && (
            <div>
              <Card className="mt-8 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className={`h-10 w-10 rounded-lg p-2 ${result.isDeepfake ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                          {result.isDeepfake ? 
                            <AlertCircle className="h-6 w-6 text-red-500" /> : 
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          }
                        </div>
                      </div>
                      <h2 className="text-xl font-bold">
                        Analysis Result
                      </h2>
                    </div>
                    <Badge 
                      variant={result.isDeepfake ? "destructive" : "default"}
                    >
                      {result.isDeepfake ? 'Potential Deepfake' : 'Likely Authentic'}
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Confidence Score</h3>
                        <div className="text-2xl font-bold">{result.confidenceScore}%</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Report ID</h3>
                        <div className="font-mono text-sm">{result.reportId}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Media Type</h3>
                        <div>{result.mediaType.charAt(0).toUpperCase() + result.mediaType.slice(1)}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Analysis Date</h3>
                        <div>{new Date(result.analysisDate).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Detection Metrics</h3>
                      <div className="space-y-2">
                        {result.detectionMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${result.isDeepfake ? 'bg-red-500' : 'bg-green-500'}`}
                                  style={{ width: `${metric.value}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{metric.value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                    
                  <div className="pt-4 border-t">
                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">Recommendations</h4>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{rec}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Details - Advanced Analysis */}
              <div className="mt-6">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTechInfo(!showTechInfo)}
                  className="flex items-center"
                >
                  {showTechInfo ? 'Hide Technical Analysis' : 'Show Technical Analysis'}
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${showTechInfo ? 'rotate-90' : ''}`} />
                </Button>
              </div>
                
              {showTechInfo && (
                <div className="mt-2 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-4">
                        {result.isDeepfake ? "Deepfake Detection Analysis" : "Media Authenticity Analysis"}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Technical analysis of the {activeTab} using our neural network detection system with frame-by-frame comparison
                        and multi-modal verification techniques.
                      </p>
                      
                      <ThreatAnalysisCard
                        confidence={result.confidenceScore}
                        metrics={result.detectionMetrics}
                        showLabels={true}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
