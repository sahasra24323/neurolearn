import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LearningModule } from "@/components/learning-module";
import { ProgressCard } from "@/components/progress-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Brain, Timer, BookOpen } from "lucide-react";

const learningModules = {
  dyslexia: [
    {
      title: "Multisensory Learning",
      content: "This module combines visual, auditory, and tactile learning methods to enhance understanding and retention.",
      instructions: [
        "Look at the visual representation of the content",
        "Listen to the audio description",
        "Use the interactive elements to engage with the material",
        "Practice writing or drawing the concepts"
      ]
    },
    {
      title: "Phonics Practice",
      content: "Focus on sound-letter relationships and phonemic awareness.",
      instructions: [
        "Identify the individual sounds in words",
        "Practice blending sounds together",
        "Work with word families and patterns",
        "Complete phonics exercises"
      ]
    }
  ],
  adhd: [
    {
      title: "Task Breakdown",
      content: "Learn to break down complex tasks into manageable steps.",
      instructions: [
        "Review the main task objective",
        "Identify smaller subtasks",
        "Organize subtasks in order",
        "Set time estimates for each part"
      ]
    },
    {
      title: "Focus Training",
      content: "Practice maintaining attention and managing distractions.",
      instructions: [
        "Set up your workspace",
        "Use the Pomodoro timer",
        "Practice mindful focus exercises",
        "Review and reflect on progress"
      ]
    }
  ],
  autism: [
    {
      title: "Clear Communication",
      content: "Practice understanding and using clear, direct communication.",
      instructions: [
        "Review the communication scenario",
        "Identify key information",
        "Practice response strategies",
        "Role-play the interaction"
      ]
    },
    {
      title: "Routine Building",
      content: "Develop effective learning routines and schedules.",
      instructions: [
        "Map out your daily schedule",
        "Identify transition points",
        "Create visual schedules",
        "Practice following the routine"
      ]
    }
  ]
};

export default function LearningPath() {
  const { user } = useAuth();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const { data: progress } = useQuery<any>({
    queryKey: ["/api/progress", user?.id],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (moduleData: any) => {
      const res = await apiRequest("POST", "/api/progress", moduleData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", user?.id] });
    },
  });

  const modules = learningModules[user?.neurodiversity as keyof typeof learningModules] || [];
  const currentModule = modules[currentModuleIndex];

  const handleModuleComplete = () => {
    updateProgressMutation.mutate({
      userId: user?.id,
      moduleType: currentModule.title,
      completedMilestones: currentModule.instructions,
      currentStreak: (progress?.currentStreak || 0) + 1,
      lastActivity: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Learning Path</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Brain className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Learning Style</h2>
              <p>{user?.neurodiversity} focused</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Timer className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Pace</h2>
              <p>{user?.learningPace}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Progress</h2>
              <p>Current streak: {progress?.currentStreak || 0} days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Current Module</h2>
            {currentModule && (
              <LearningModule
                title={currentModule.title}
                content={currentModule.content}
                instructions={currentModule.instructions}
                onComplete={handleModuleComplete}
              />
            )}
            <div className="flex gap-4">
              <Button
                variant="outline"
                disabled={currentModuleIndex === 0}
                onClick={() => setCurrentModuleIndex(i => i - 1)}
              >
                Previous Module
              </Button>
              <Button
                disabled={currentModuleIndex === modules.length - 1}
                onClick={() => setCurrentModuleIndex(i => i + 1)}
              >
                Next Module
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <ProgressCard
                  key={module.title}
                  title={module.title}
                  progress={progress?.completedMilestones?.length || 0}
                  total={module.instructions.length}
                  description={module.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
