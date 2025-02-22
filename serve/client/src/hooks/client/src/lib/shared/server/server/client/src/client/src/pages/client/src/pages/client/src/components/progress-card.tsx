import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  progress: number;
  total: number;
  description: string;
}

export function ProgressCard({ title, progress, total, description }: ProgressCardProps) {
  const percentage = Math.round((progress / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          {progress} of {total} completed
        </p>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
