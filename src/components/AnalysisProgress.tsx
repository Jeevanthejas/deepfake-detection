import { Brain, Upload, X, Loader2, Search, Radar, Grid3x3, FileVideo } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnalysisState } from "@/pages/Index";

interface AnalysisProgressProps {
  state: AnalysisState;
  uploadProgress: number;
  analysisProgress: number;
  onCancel: () => void;
}

export const AnalysisProgress = ({ 
  state, 
  uploadProgress, 
  analysisProgress, 
  onCancel 
}: AnalysisProgressProps) => {
  const isUploading = state === "uploading";
  const isAnalyzing = state === "analyzing";
  const currentProgress = isUploading ? uploadProgress : analysisProgress;

  const getStatusText = () => {
    if (isUploading) {
      return "Uploading video...";
    }
    if (isAnalyzing) {
      const modelIndex = Math.floor((analysisProgress / 100) * 5);
      const models = [
        "FaceForensics++",
        "Capsule-Forensics", 
        "DeepFakes Detection",
        "Face X-ray",
        "CNNDetection"
      ];
      return `Analyzing with ${models[Math.min(modelIndex, 4)]}...`;
    }
    return "";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/20">
        <div className="text-center">
          {/* Animated Detection Icons */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-6">
            {isUploading && (
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-detection-pulse">
                  <FileVideo className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-radar-sweep"></div>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="relative">
                {/* Main magnifier with scanning animation */}
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
                  <Search className="w-10 h-10 text-white animate-magnifier-scan" style={{
                    filter: 'drop-shadow(var(--magnifier-shadow))'
                  }} />
                </div>
                
                {/* Radar sweep effect */}
                <div className="absolute -inset-4 border border-accent/30 rounded-full animate-radar-sweep"></div>
                
                {/* Analysis grid overlay */}
                <div className="absolute -inset-6 opacity-30">
                  <Grid3x3 className="w-full h-full text-primary animate-analysis-grid" />
                </div>
              </div>
            )}
          </div>

          {/* Scanning Line Effect */}
          {isAnalyzing && (
            <div className="relative w-full h-1 bg-muted rounded overflow-hidden mb-4">
              <div 
                className="absolute top-0 left-0 h-full w-20 animate-scan-line"
                style={{ background: 'var(--scan-line-gradient)' }}
              />
            </div>
          )}
          
          <h3 className="text-2xl font-semibold mb-2">
            {isUploading ? "Uploading Video" : "AI Analysis in Progress"}
          </h3>
          
          <p className="text-muted-foreground mb-8">
            {getStatusText()}
          </p>
          
          <div className="space-y-4">
            <Progress 
              value={currentProgress} 
              className="h-3"
            />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {Math.round(currentProgress)}% Complete
              </span>
              <span className="text-accent">
                {isAnalyzing && `Model ${Math.floor((analysisProgress / 100) * 5) + 1}/5`}
              </span>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="w-32"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
          
          {/* AI Detection Indicators */}
          {isAnalyzing && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing frames with advanced neural networks...</span>
              </div>
              
              <div className="flex justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Brain className="w-3 h-3 animate-detection-pulse text-primary" />
                  <span>Deep Learning</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Radar className="w-3 h-3 animate-radar-sweep text-accent" />
                  <span>Pattern Detection</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Search className="w-3 h-3 animate-magnifier-scan text-primary" />
                  <span>Frame Analysis</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};