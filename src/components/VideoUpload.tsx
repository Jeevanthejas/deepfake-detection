import { useCallback, useState } from "react";
import { Upload, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

export const VideoUpload = ({ onUpload }: VideoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload MP4, AVI, MOV, or MKV files only.",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload videos smaller than 100MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (validateFile(file)) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <Card 
        className={`relative p-8 border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5 shadow-glow animate-detection-pulse' 
            : 'border-border hover:border-primary/50 hover:bg-accent/5'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center">
          <div className={`relative w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 ${
            isDragging ? 'animate-radar-sweep' : ''
          }`}>
            <Upload className={`w-8 h-8 text-white ${isDragging ? 'animate-magnifier-scan' : ''}`} />
            
            {/* Scanning effect when dragging */}
            {isDragging && (
              <>
                <div className="absolute inset-0 border-2 border-accent/50 rounded-full animate-radar-sweep"></div>
                <div className="absolute -inset-4 border border-primary/30 rounded-full animate-radar-sweep" style={{
                  animationDelay: '0.5s'
                }}></div>
              </>
            )}
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Upload Video for Analysis</h3>
          <p className="text-muted-foreground mb-6">
            Drag and drop your video file here, or click to browse
          </p>
          
          <Button 
            variant="outline" 
            size="lg"
            className="mb-6"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Video className="w-4 h-4 mr-2" />
            Choose Video File
          </Button>
          
          <input
            id="file-input"
            type="file"
            accept=".mp4,.avi,.mov,.mkv"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          <div className="flex items-start justify-center space-x-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 mt-0.5 text-warning" />
            <div>
              <p>Supported formats: MP4, AVI, MOV, MKV</p>
              <p>Maximum file size: 100MB</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};