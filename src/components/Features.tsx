import { Shield, Zap, Brain, Eye, BarChart3, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Multiple AI Models",
    description: "Uses 5 state-of-the-art detection models including FaceForensics++ and Capsule-Forensics for comprehensive analysis"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Advanced GPU acceleration provides rapid analysis with results typically delivered in under 30 seconds"
  },
  {
    icon: Eye,
    title: "Frame-by-Frame Analysis",
    description: "Analyzes individual video frames to detect subtle manipulation artifacts invisible to the human eye"
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Achieves 95%+ detection accuracy through ensemble learning and advanced neural network architectures"
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Provides comprehensive analysis reports with confidence scores, metadata, and model-specific insights"
  },
  {
    icon: Download,
    title: "Export Results",
    description: "Download detailed JSON reports for further analysis, documentation, or integration with other systems"
  }
];

export const Features = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
          Advanced Detection Features
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Powered by cutting-edge AI research and deployed with enterprise-grade infrastructure 
          for reliable deepfake detection.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="p-6 hover:shadow-accent hover:border-primary/20 transition-all duration-300 bg-gradient-to-br from-card to-card/50"
          >
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};