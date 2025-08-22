import { Shield, Brain, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DeepFake Detector</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Video Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-accent">
              <Brain className="w-4 h-4" />
              <span>5 AI Models</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Zap className="w-4 h-4" />
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};