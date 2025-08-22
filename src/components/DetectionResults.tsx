import { CheckCircle, AlertTriangle, Brain, Clock, FileVideo, Download, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { VideoAnalysis } from "@/pages/Index";

interface DetectionResultsProps {
  analysis: VideoAnalysis;
  onNewAnalysis: () => void;
}

export const DetectionResults = ({ analysis, onNewAnalysis }: DetectionResultsProps) => {
  const { results, overallPrediction, overallConfidence, metadata } = analysis;
  
  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateReport = () => {
    const reportData = {
      filename: analysis.file.name,
      timestamp: new Date().toISOString(),
      overallResult: {
        prediction: overallPrediction,
        confidence: overallConfidence.toFixed(1)
      },
      metadata,
      modelResults: results
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepfake-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overall Result Header */}
      <Card className={`p-6 bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 animate-reveal-magnifier ${
        overallPrediction === 'fake' ? 'animate-glitch-effect' : ''
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
              overallPrediction === 'real' 
                ? 'bg-gradient-success shadow-[0_0_20px_hsl(var(--success)/0.3)]' 
                : 'bg-gradient-to-br from-warning to-destructive shadow-[0_0_20px_hsl(var(--warning)/0.3)] animate-detection-pulse'
            }`}>
              {overallPrediction === 'real' ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-white animate-magnifier-scan" />
              )}
              
              {/* Magnifier overlay for detailed analysis */}
              {overallPrediction === 'fake' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-magnifier-scan">
                  <div className="w-3 h-3 border border-white rounded-full"></div>
                </div>
              )}
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-1 ${
                overallPrediction === 'fake' ? 'animate-glitch-effect' : ''
              }`}>
                Video is {overallPrediction === 'real' ? 'AUTHENTIC' : 'DEEPFAKE'}
              </h2>
              <p className="text-lg text-muted-foreground">
                Confidence: {overallConfidence.toFixed(1)}%
              </p>
              
              {/* Detection indicator */}
              {overallPrediction === 'fake' && (
                <div className="flex items-center mt-2 text-sm text-warning">
                  <div className="w-2 h-2 bg-warning rounded-full animate-detection-pulse mr-2"></div>
                  AI-generated content detected
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <Badge 
              variant={overallPrediction === 'real' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {overallPrediction === 'real' ? 'REAL' : 'FAKE'}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Video Metadata */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FileVideo className="w-5 h-5 mr-2 text-accent" />
            Video Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">File Name:</span>
              <span className="font-mono text-sm">{analysis.file.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span>{formatDuration(metadata.duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span>{formatFileSize(metadata.size)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format:</span>
              <span className="uppercase">{metadata.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution:</span>
              <span>{metadata.resolution}</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            Analysis Summary
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Models in Agreement:</span>
                <span>{results.filter(r => r.prediction === overallPrediction).length}/5</span>
              </div>
              <Progress 
                value={(results.filter(r => r.prediction === overallPrediction).length / 5) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Processing Time:</span>
              <span>{Math.round(results.reduce((acc, r) => acc + r.processingTime, 0) / results.length)}ms</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Models Used:</span>
              <span>5 AI Networks</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Model Results */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          Detailed Model Analysis
        </h3>
        
        <div className="space-y-4">
          {results.map((result, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border bg-card/50 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant={result.prediction === 'real' ? 'default' : 'destructive'}>
                    {result.prediction.toUpperCase()}
                  </Badge>
                  <h4 className="font-semibold">{result.model}</h4>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.round(result.processingTime)}ms
                  </div>
                  <span className="font-semibold">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <Progress value={result.confidence} className="mb-2 h-2" />
              <p className="text-sm text-muted-foreground">{result.details}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onNewAnalysis} size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Analyze Another Video
        </Button>
        
        <Button variant="outline" onClick={generateReport} size="lg">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
};