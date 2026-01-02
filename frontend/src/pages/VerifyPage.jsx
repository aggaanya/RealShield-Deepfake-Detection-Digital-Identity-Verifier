import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileUpload from '@/components/FileUpload';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  FileText,
  Shield,
  Info,
  Award,
  Search,
  Trash2,
  XCircle,
  CircleCheck,
  FileCheck,
  Database,
  Fingerprint,
  FileImage,
  FileVideo,
  FileAudio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressIndicator, { TechProgressBar } from '@/components/ui/progress-indicator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TechAlert } from '@/components/ui/tech-alert';
import DataVisualization from '@/components/ui/data-visualization';

const VerificationPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('source');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Reset state when changing tabs
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setLoading(false);
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

  // Accept any file for verification
  const getAcceptTypes = () => "*/*";

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    
    // Set preview if image or video
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.type.startsWith('video/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type.startsWith('audio/')) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  // Clear selected file
  const handleClearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (preview && (file?.type.startsWith('video/') || file?.type.startsWith('audio/'))) {
      URL.revokeObjectURL(preview);
    }
  };

  // Submit file for verification
  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to verify');
      return;
    }

    if (!user) {
      navigate('/login', { state: { from: '/verify', message: 'Please log in to use the verification feature' } });
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    // Create form data
    const formData = new FormData();
    formData.append('media', file);

    try {
      // Determine the endpoint based on activeTab
      let endpoint;
      switch (activeTab) {
        case 'source':
          endpoint = '/api/v1/verify/source';
          break;
        case 'metadata':
          endpoint = '/api/v1/verify/metadata';
          break;
        case 'signature':
          endpoint = '/api/v1/verify/signature';
          break;
        default:
          endpoint = '/api/v1/verify/source';
      }

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      if (activeTab === 'source') {
        // For source verification, get the content ID and poll for results
        const contentId = response.data.data.contentId;
        await pollForResults(contentId);
      } else {
        // For metadata and signature, results are immediate
        setResult(response.data.data);
        setLoading(false);
        setProgress(100);
      }

    } catch (error) {
      console.error('Error during file upload:', error);
      setError(error.response?.data?.error || 'Failed to process your request. Please try again.');
      setLoading(false);
    }
  };

  // Poll for verification results
  const pollForResults = async (contentId) => {
    try {
      // Simulate waiting for backend processing
      // In a real implementation, you would poll an endpoint repeatedly until results are ready
      setTimeout(async () => {
        try {
          const resultsResponse = await axios.get(`/api/v1/verify/results/${contentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          setResult(resultsResponse.data.data);
          setLoading(false);
          setProgress(100);
        } catch (error) {
          console.error('Error fetching results:', error);
          setError('Failed to retrieve verification results. Please try again.');
          setLoading(false);
        }
      }, 3000);
    } catch (error) {
      setError('Failed to process your request. Please try again.');
      setLoading(false);
    }
  };

  // Format file type for display
  const getFileTypeInfo = (file) => {
    if (!file) return { icon: <FileText className="h-5 w-5" />, type: 'Unknown' };
    
    if (file.type.startsWith('image/')) {
      return { icon: <FileImage className="h-5 w-5" />, type: 'Image' };
    } else if (file.type.startsWith('video/')) {
      return { icon: <FileVideo className="h-5 w-5" />, type: 'Video' };
    } else if (file.type.startsWith('audio/')) {
      return { icon: <FileAudio className="h-5 w-5" />, type: 'Audio' };
    } else {
      return { icon: <FileText className="h-5 w-5" />, type: 'Document' };
    }
  };

  // Tab icons mapping
  const tabIcons = {
    source: <Shield className="h-4 w-4 mr-2" />,
    metadata: <Database className="h-4 w-4 mr-2" />,
    signature: <Fingerprint className="h-4 w-4 mr-2" />
  };

  // Get tab label with icon
  const getTabLabel = (tab) => {
    const labels = {
      source: 'Source Verification',
      metadata: 'Metadata Analysis',
      signature: 'Digital Signature'
    };
    
    return (
      <span className="flex items-center">
        {tabIcons[tab]}
        {labels[tab]}
      </span>
    );
  };

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div>
              <Badge className="mb-3">
                <Shield className="h-3 w-3 mr-1" />
                Advanced Verification
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Content Verification Platform
            </h1>
            <p className="max-w-2xl mx-auto">
              Validate content authenticity with our advanced verification tools. Upload any media file to check source, analyze metadata, or verify digital signatures.
            </p>
          </div>

          {/* Tabs and Main Content */}
          <Card>
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="p-5 bg-gray-100 border-b">
                  <TabsList className="w-full">
                    <TabsTrigger value="source" className="flex-1">
                      {getTabLabel('source')}
                    </TabsTrigger>
                    <TabsTrigger value="metadata" className="flex-1">
                      {getTabLabel('metadata')}
                    </TabsTrigger>
                    <TabsTrigger value="signature" className="flex-1">
                      {getTabLabel('signature')}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <div>
                    {/* Section Header */}
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-1 flex items-center">
                        {tabIcons[activeTab]}
                        <span className="ml-2">
                          {activeTab === 'source' && 'Source Verification'}
                          {activeTab === 'metadata' && 'Metadata Analysis'}
                          {activeTab === 'signature' && 'Digital Signature Verification'}
                        </span>
                      </h2>
                      <p className="text-muted-foreground max-w-2xl">
                        {activeTab === 'source' && 'Verify if media content comes from a trusted source and has not been manipulated.'}
                        {activeTab === 'metadata' && 'Analyze embedded metadata to verify file integrity and creation details.'}
                        {activeTab === 'signature' && 'Validate digital signatures to confirm content has not been tampered with.'}
                      </p>
                    </div>

                    {/* Enhanced File Upload Area */}
                    <div className="mb-6">
                      {!file ? (
                        <FileUpload 
                          onFileSelect={handleFileSelect} 
                          accept={getAcceptTypes()}
                        />
                      ) : (
                        <div className="border rounded-lg p-6">
                          {/* File preview */}
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Preview */}
                            <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <div className="flex items-center justify-center w-full h-full">
                                {preview ? (
                                  file.type.startsWith('image/') ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                  ) : file.type.startsWith('video/') ? (
                                    <video src={preview} controls className="w-full h-full object-contain" />
                                  ) : file.type.startsWith('audio/') ? (
                                    <div className="w-full p-3 rounded-lg">
                                      <audio src={preview} controls className="w-full" />
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                      <FileText className="h-12 w-12 text-gray-400" />
                                      <span className="text-xs text-gray-400 mt-2">Document Preview</span>
                                    </div>
                                  )
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <FileText className="h-12 w-12 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* File Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-3">
                                    <Badge>
                                      {getFileTypeInfo(file).icon}
                                      <span className="ml-1">{getFileTypeInfo(file).type}</span>
                                    </Badge>
                                    
                                    <Badge>
                                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </Badge>
                                  </div>
                                  
                                  <h3 className="text-lg font-medium mt-3">
                                    {file.name}
                                  </h3>
                                </div>
                                
                                <button 
                                  onClick={handleClearFile}
                                  className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="mt-6">
                                <Button 
                                  onClick={handleSubmit} 
                                  disabled={loading}
                                  className="w-full"
                                >
                                  {loading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      <span>Verifying...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="mr-2 h-4 w-4" />
                                      <span>
                                        {activeTab === 'source' && 'Verify Source'}
                                        {activeTab === 'metadata' && 'Analyze Metadata'}
                                        {activeTab === 'signature' && 'Verify Signature'}
                                      </span>
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Indicator */}
                          {loading && (
                            <div className="mt-6">
                              <div className="flex justify-between items-center text-xs mb-2">
                                <span>
                                  {activeTab === 'source' ? 'Verifying Source' : 
                                   activeTab === 'metadata' ? 'Analyzing Metadata' :
                                   'Verifying Signature'}...
                                </span>
                                <span>{progress}%</span>
                              </div>
                              
                              <TechProgressBar 
                                value={progress} 
                                height="h-2"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6">
                        <TechAlert variant="error">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {error}
                        </TechAlert>
                      </div>
                    )}

                    {/* Results Display */}
                    {result && !loading && (
                      <div>
                        <Card className="mb-6">
                          <CardContent className="p-6">
                            <div className="mb-6 flex items-center">
                              {activeTab === 'source' && result.isVerified ? (
                                <div className="flex items-center text-green-600">
                                  <div className="mr-3 bg-green-100 p-2.5 rounded-full">
                                    <CircleCheck className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">Source Verified</h3>
                                    <p className="text-sm text-muted-foreground">This content comes from a verified source.</p>
                                  </div>
                                </div>
                              ) : activeTab === 'source' ? (
                                <div className="flex items-center text-amber-600">
                                  <div className="mr-3 bg-amber-100 p-2.5 rounded-full">
                                    <AlertCircle className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">Source Not Verified</h3>
                                    <p className="text-sm text-muted-foreground">Unable to verify the source of this content.</p>
                                  </div>
                                </div>
                              ) : activeTab === 'metadata' ? (
                                <div className="flex items-center text-blue-600">
                                  <div className="mr-3 bg-blue-100 p-2.5 rounded-full">
                                    <Database className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">Metadata Analysis Complete</h3>
                                    <p className="text-sm text-muted-foreground">Detailed analysis of file metadata.</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center text-indigo-600">
                                  <div className="mr-3 bg-indigo-100 p-2.5 rounded-full">
                                    <Fingerprint className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">Signature Verification Complete</h3>
                                    <p className="text-sm text-muted-foreground">Digital signature validation results.</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Visualization of results */}
                            <div className="mt-6 border rounded-lg p-4">
                              <DataVisualization 
                                data={result}
                                type={activeTab}
                                className="w-full h-64"
                              />
                            </div>

                            {/* Detailed Results */}
                            <div className="mt-6 pt-6 border-t">
                              <h4 className="text-sm font-medium mb-3">Detailed Analysis</h4>
                              
                              <div className="space-y-3">
                                {Object.entries(result).map(([key, value]) => (
                                  <div key={key} className="flex justify-between items-center p-2 rounded-md bg-gray-50 border">
                                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <Badge variant={
                                      typeof value === 'boolean' 
                                        ? value ? 'success' : 'warning' 
                                        : 'default'
                                    }>
                                      {typeof value === 'boolean' 
                                        ? value ? 'Yes' : 'No' 
                                        : String(value)
                                      }
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
