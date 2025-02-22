import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RepeatIcon, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

interface LearningModuleProps {
  title: string;
  content: string;
  instructions: string[];
  onComplete: () => void;
}

export function LearningModule({ title, content, instructions, onComplete }: LearningModuleProps) {
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const readContent = () => {
    const textToRead = ${title}. ${content}. Current instruction: ${instructions[currentInstruction]};
    speak(textToRead);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => isSpeaking ? stop() : readContent()}
            title={isSpeaking ? "Stop reading" : "Read aloud"}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none mb-6">
          <p>{content}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-accent p-4 rounded-lg">
            <h3 className="font-medium mb-2">Current Step</h3>
            <p>{instructions[currentInstruction]}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setCurrentInstruction(currentInstruction)}
            >
              <RepeatIcon className="w-4 h-4 mr-2" />
              Repeat Instructions
            </Button>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentInstruction === 0}
              onClick={() => setCurrentInstruction(current => current - 1)}
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                if (currentInstruction === instructions.length - 1) {
                  onComplete();
                } else {
                  setCurrentInstruction(current => current + 1);
                }
              }}
            >
              {currentInstruction === instructions.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
