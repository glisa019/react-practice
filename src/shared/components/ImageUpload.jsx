import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = ({
  name,
  headerName = 'Upload Image',
  subText = 'Click to browse or drag and drop',
  register,
  errors,
  validationRules,
  setValue,
  innerStyle,
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Universal error message extractor
  const getErrorMessage = (errors, fieldPath) => {
    if (!errors) return null;
    
    return fieldPath.split('.').reduce((errObj, key) => {
      if (errObj && errObj[key]) {
        return errObj[key];
      }
      return null;
    }, errors)?.message;
  };

  const errorMessage = getErrorMessage(errors, name) || localError;

  useEffect(() => {
    if (register && fileInputRef.current) {
      const { ref, ...rest } = register(name, validationRules);
      ref(fileInputRef.current);
    }
  }, [name, register, validationRules]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous errors
    setLocalError(null);

    // Validate file type
    if (!file.type.match('image.*')) {
      setLocalError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`File size should be less than ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      if (setValue) setValue(name, file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setLocalError(null);
    if (setValue) setValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div 
      className={`relative group ${innerStyle}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
          handleFileChange({ target: { files: e.dataTransfer.files } });
        }
      }}
    >
      {/* Conditional rendering based on whether we have an image preview */}
      {imagePreview ? (
        <div className="relative w-full h-full">
          <img 
            src={imagePreview} 
            alt="Upload preview" 
            className="w-full h-full object-cover rounded-lg"
          />
          <div 
            className="absolute z-10 inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 cursor-pointer rounded"
            onClick={handleClick}
          >
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium">
              Upload {headerName}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full hover:opacity-90 transition-colors z-10"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <div 
          className={`
            w-full h-full border-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center p-6 text-center
            ${isDragging ? 'border-primary bg-gray-50' : 'border-dashed border-tertiary bg-gray-50'}
            ${errorMessage ? 'border-red-500' : ''}
          `}
          onClick={handleClick}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-gray-400 mb-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-700 font-medium">{headerName}</p>
          <p className="text-gray-500 text-sm mt-1">{subText}</p>
          <p className="text-gray-400 text-xs mt-2">Supports: JPEG, PNG (Max {maxSizeMB}MB)</p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        id={name}
        ref={fileInputRef}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />

      {/* Error messages */}
      <div className="mt-1 min-h-5">
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;