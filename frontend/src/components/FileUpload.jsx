import React, { useState, useRef } from 'react';
import { Upload, File } from 'lucide-react';

export default function FileUpload({ 
  onFileSelect, 
  accept = "*/*", 
  maxSize = 100 * 1024 * 1024,
  maxFiles = 1,
  className = ""
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };
  
  const handleFiles = (files) => {
    if (files.length > maxFiles) {
      setError(`Only ${maxFiles} file${maxFiles > 1 ? 's' : ''} can be uploaded at a time`);
      return;
    }
    
    const file = files[0];
    
    // Check file type
    const fileType = file.type;
    const acceptedTypes = accept.split(',').map(type => type.trim());
    
    if (accept !== "*/*" && !acceptedTypes.some(type => {
      // Handle wildcards like 'image/*'
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(`${category}/`);
      }
      return type === fileType;
    })) {
      setError('File type not accepted');
      return;
    }
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${formatBytes(maxSize)}`);
      return;
    }
    
    setError(null);
    onFileSelect(file);
  };
  
  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  const handleChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
    
    // Reset the input so the same file can be uploaded again if needed
    e.target.value = '';
  };
  
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const acceptAttribute = Array.isArray(accept) ? accept.join(',') : accept;

  const getBorderClasses = () => {
    if (error) {
      return 'border-alert-500 bg-alert-50/30 dark:bg-alert-900/10';
    }
    if (isDragging) {
      return 'border-shield-500 bg-white dark:bg-shield-800/40';
    }
    return 'border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900/20';
  };
  
  return (
    <div 
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        ${getBorderClasses()} ${className}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleChange} 
        accept={acceptAttribute}
        multiple={maxFiles > 1}
      />

      {/* No background elements for better readability */}

      <div className="relative flex flex-col items-center justify-center space-y-4 z-10">
        <div className="p-4 bg-shield-100 dark:bg-shield-700 rounded-full">
          {error ? (
            <File className="h-8 w-8 text-alert-500" />
          ) : (
            <Upload className="h-8 w-8 text-shield-600 dark:text-white" />
          )}
        </div>
        <div className="relative z-10">
          <p className="text-lg font-medium text-black dark:text-white">
            {isDragging ? (
              <span className="text-shield-700 dark:text-shield-300 font-bold">Drop the file here</span>
            ) : (
              <span>Drag & drop or <span className="text-shield-700 dark:text-shield-300 underline font-bold">click to upload</span></span>
            )}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {error ? (
              <span className="text-alert-500 font-medium">
                {error}
              </span>
            ) : (
              `Maximum file size: ${formatBytes(maxSize)}`
            )}
          </p>
        </div>

        {/* Shield logo watermark - removed for better readability */}
      </div>
    </div>
  );
}
