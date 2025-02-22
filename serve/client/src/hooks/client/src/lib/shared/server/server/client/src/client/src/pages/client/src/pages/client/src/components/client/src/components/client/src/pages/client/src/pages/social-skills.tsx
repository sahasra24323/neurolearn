import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Users, Target, Trophy, ArrowRight } from "lucide-react";

const socialTasks = {
  beginner: [
    {
      type: "conversation",
      title: "Basic Conversation Skills",
      description: "Practice starting and maintaining simple conversations",
      steps: [
        "Greet someone new",
        "Ask open-ended questions",
        "Practice active listening",
        "End conversations politely"
      ]
    },
    {
      type: "nonverbal",
      title: "Nonverbal Communication",
      description: "Learn to understand and use body language",
      steps: [
        "Maintain appropriate eye contact",
        "Practice facial expressions",
        "Use appropriate gestures",
        "Respect personal space"
      ]
    }
  ],
  intermediate: [
    {
      type: "group",
      title: "Group Interactions",
      description: "Participate in group activities and discussions",
      steps: [
        "Join a group conversation",
        "Take turns speaking",
        "Share ideas and opinions",
        "Support others' contributions"
      ]
    },
    {
      type: "emotional",
      title: "Emotional Recognition",
      description: "Identify and respond to others' emotions",
      steps: [
        "Recognize facial expressions",
        "Understand tone of voice",
        "Show empathy",
        "Offer appropriate support"
      ]
    }
  ]
};

export default function SocialSkills() {
  const { user } = useAuth();

  const { data: skills } = useQuery({
    queryKey: ["/api/social-skills", user?.id],
  });

  const updateSkillMutation = useMutation({
    mutationFn: async (skillData: any) => {
      const res = await apiRequest("POST", "/api/social-skills", skillData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-skills", user?.id] });
    },
  });

  const handleTaskProgress = (taskType: string) => {
    updateSkillMutation.mutate({
      userId: user?.id,
      taskType,
      weeklyProgress: ((skills?.find((s: any) => s.taskType === taskType)?.weeklyProgress || 0) + 25),
      completed: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Social Skills Development</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Weekly Tasks</h2>
              <p>Practice social interactions</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Target className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Current Focus</h2>
              <p>Building confidence</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Achievements</h2>
              <p>{skills?.filter((s: any) => s.completed)?.length || 0} skills mastered</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {socialTasks.beginner.map((task) => (
            <Card key={task.type} className="relative overflow-hidden">
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{task.description}</p>
                
                <div className="space-y-4">
                  {task.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-2">Weekly Progress</p>
                  <Progress 
                    value={skills?.find((s: any) => s.taskType === task.type)?.weeklyProgress || 0} 
                    className="mb-4"
                  />
                  <Button 
                    className="w-full"
                    onClick={() => handleTaskProgress(task.type)}
                    disabled={updateSkillMutation.isPending}
                  >
                    Practice Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
