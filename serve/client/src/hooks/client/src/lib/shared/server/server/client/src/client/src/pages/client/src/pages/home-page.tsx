import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Book, Users, LogOut, Award, Calendar, Target, User as UserIcon, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample upcoming content - in real app, this would come from the backend
const upcomingContent = {
  dyslexia: {
    nextTests: [
      "Reading Comprehension - Thursday",
      "Phonics Assessment - Next Monday",
      "Writing Exercise - Next Wednesday"
    ],
    achievements: [
      "Phonics Master - Complete 5 phonics exercises",
      "Reading Star - Read 3 passages fluently",
      "Writing Champion - Complete 3 writing tasks"
    ]
  },
  adhd: {
    nextTests: [
      "Focus Training - Tomorrow",
      "Task Organization - Friday",
      "Time Management - Next Tuesday"
    ],
    achievements: [
      "Focus Master - Complete 30 minutes of focused work",
      "Task Manager - Organize daily schedule for a week",
      "Time Keeper - Complete tasks within time limits"
    ]
  },
  autism: {
    nextTests: [
      "Social Interaction - Wednesday",
      "Communication Skills - Friday",
      "Routine Building - Next Monday"
    ],
    achievements: [
      "Social Explorer - Participate in 3 group activities",
      "Communication Pro - Practice clear communication",
      "Routine Builder - Follow daily schedule for a week"
    ]
  }
};

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const userContent = upcomingContent[user?.neurodiversity as keyof typeof upcomingContent] || {
    nextTests: [],
    achievements: []
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <Button variant="ghost" onClick={() => logoutMutation.mutate()}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Personal Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <UserIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Profile</h2>
                  <p className="text-sm text-muted-foreground">Name: {user?.name}</p>
                  <p className="text-sm text-muted-foreground">Grade: {user?.grade}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Learning Style</h2>
                  <p className="text-sm text-muted-foreground">Type: {user?.neurodiversity}</p>
                  <p className="text-sm text-muted-foreground">Pace: {user?.learningPace}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Progress</h2>
                  <Progress value={30} className="mb-2" />
                  <p className="text-sm text-muted-foreground">30% of current module complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Navigation Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
            <Link href="/learning">
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-6">
                  <Book className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="mb-2">Learning Path</CardTitle>
                  <p className="text-muted-foreground">
                    Continue your personalized learning journey with adaptive content and pace.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/social-skills">
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="mb-2">Social Skills</CardTitle>
                  <p className="text-muted-foreground">
                    Practice and develop social interactions through guided exercises.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Upcoming Tests and Achievements */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {userContent.nextTests.map((test, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements to Unlock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {userContent.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
