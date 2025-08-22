import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { DetectionResults } from "@/components/DetectionResults";
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";

export type AnalysisState = "idle" | "uploading" | "analyzing" | "complete";

export interface DetectionResult {
  model: string;
  confidence: number;
  prediction: "real" | "fake";
  processingTime: number;
  details: string;
}

export interface VideoAnalysis {
  file: File;
  results: DetectionResult[];
  overallConfidence: number;
  overallPrediction: "real" | "fake";
  metadata: {
    duration: number;
    size: number;
    format: string;
    resolution: string;
  };
}

const Index = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [videoAnalysis, setVideoAnalysis] = useState<VideoAnalysis | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleVideoUpload = async (file: File) => {
    setAnalysisState("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setAnalysisState("analyzing");
          startAnalysis(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startAnalysis = async (file: File) => {
    setAnalysisProgress(0);
    
    // Simulate analysis with multiple models
    const models = [
      "FaceForensics++",
      "Capsule-Forensics", 
      "DeepFakes Detection",
      "Face X-ray",
      "CNNDetection"
    ];

    const results: DetectionResult[] = [];
    
    for (let i = 0; i < models.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const confidence = Math.random() * 0.4 + 0.6; // 60-100%
      const prediction = Math.random() > 0.3 ? "real" : "fake";
      
      results.push({
        model: models[i],
        confidence: confidence * 100,
        prediction,
        processingTime: Math.random() * 2000 + 500,
        details: `Analyzed ${Math.floor(Math.random() * 100) + 20} frames`
      });
      
      setAnalysisProgress(((i + 1) / models.length) * 100);
    }

    // Calculate overall result
    const realCount = results.filter(r => r.prediction === "real").length;
    const avgConfidence = results.reduce((acc, r) => acc + r.confidence, 0) / results.length;
    
    const analysis: VideoAnalysis = {
      file,
      results,
      overallConfidence: avgConfidence,
      overallPrediction: realCount > models.length / 2 ? "real" : "fake",
      metadata: {
        duration: Math.random() * 120 + 10,
        size: file.size,
        format: file.name.split('.').pop() || 'mp4',
        resolution: "1920x1080"
      }
    };

    setVideoAnalysis(analysis);
    setAnalysisState("complete");
  };

  const resetAnalysis = () => {
    setAnalysisState("idle");
    setVideoAnalysis(null);
    setUploadProgress(0);
    setAnalysisProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {analysisState === "idle" && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                DeepFake Detector AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced AI-powered deepfake detection using multiple state-of-the-art models 
                to analyze videos and determine authenticity with high precision.
              </p>
            </div>
            <VideoUpload onUpload={handleVideoUpload} />
            <Features />
          </>
        )}

        {(analysisState === "uploading" || analysisState === "analyzing") && (
          <AnalysisProgress 
            state={analysisState}
            uploadProgress={uploadProgress}
            analysisProgress={analysisProgress}
            onCancel={resetAnalysis}
          />
        )}

        {analysisState === "complete" && videoAnalysis && (
          <DetectionResults 
            analysis={videoAnalysis}
            onNewAnalysis={resetAnalysis}
          />
        )}
      </main>
    </div>
  );
};

export default Index;