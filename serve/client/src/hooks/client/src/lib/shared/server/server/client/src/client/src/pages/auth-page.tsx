import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";
import { Mail, Lock, User, Brain, Clock, School, Phone, HelpCircle, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

const registerSchema = insertUserSchema;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      age: 0,
      grade: "",
      contactDetails: "",
      mentalAge: "",
      neurodiversity: "",
      learningPace: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen grid md:grid-cols-2">
        <div className="flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-2xl font-bold text-center">
              Welcome to NeuroDiverse Learning
              <p className="text-sm text-muted-foreground mt-2">
                A safe space for personalized learning
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-lg py-3">Login</TabsTrigger>
                  <TabsTrigger value="register" className="text-lg py-3">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Email</FormLabel>
                            <FormControl>
                              <div className="input-wrapper">
                                <Mail className="input-icon" />
                                <Input {...field} className="input-with-icon" placeholder="Enter your email" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Password</FormLabel>
                            <FormControl>
                              <div className="input-wrapper">
                                <Lock className="input-icon" />
                                <Input type="password" {...field} className="input-with-icon" placeholder="Enter your password" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="w-full text-lg py-6" type="submit" disabled={loginMutation.isPending}>
                        Login
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Email</FormLabel>
                              <FormControl>
                                <div className="input-wrapper">
                                  <Mail className="input-icon" />
                                  <Input {...field} className="input-with-icon" placeholder="Enter your email" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Password</FormLabel>
                              <FormControl>
                                <div className="input-wrapper">
                                  <Lock className="input-icon" />
                                  <Input type="password" {...field} className="input-with-icon" placeholder="Choose a password" />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Make it easy to remember but hard to guess
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Full Name</FormLabel>
                              <FormControl>
                                <div className="input-wrapper">
                                  <User className="input-icon" />
                                  <Input {...field} className="input-with-icon" placeholder="Enter your full name" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Learning Profile */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Learning Profile</h3>
                        <FormField
                          control={registerForm.control}
                          name="neurodiversity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                Neurodiversity Type
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 ml-2 inline" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Select the option that best describes your learning style</p>
                                  </TooltipContent>
                                </Tooltip>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <div className="input-wrapper">
                                    <Brain className="input-icon" />
                                    <SelectTrigger className="input-with-icon">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dyslexia">Dyslexia</SelectItem>
                                  <SelectItem value="adhd">ADHD</SelectItem>
                                  <SelectItem value="autism">Autism</SelectItem>
                                  <SelectItem value="unsure">Not Sure</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                This helps us personalize your learning experience
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="learningPace"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                Preferred Learning Pace
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 ml-2 inline" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Choose how fast or slow you'd like to learn</p>
                                  </TooltipContent>
                                </Tooltip>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <div className="input-wrapper">
                                    <Clock className="input-icon" />
                                    <SelectTrigger className="input-with-icon">
                                      <SelectValue placeholder="Select pace" />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="slow">Slow & Steady</SelectItem>
                                  <SelectItem value="moderate">Moderate</SelectItem>
                                  <SelectItem value="fast">Fast-Paced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                You can adjust this later based on your comfort
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button className="w-full text-lg py-6" type="submit" disabled={registerMutation.isPending}>
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:flex flex-col justify-center p-12 bg-primary text-primary-foreground">
          <h1 className="text-4xl font-bold mb-6">Welcome to Your Learning Journey</h1>
          <p className="text-xl mb-8 leading-relaxed">
            A safe and supportive space designed specifically for neurodiverse learners.
            Learn at your own pace with personalized guidance.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/10 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Personalized Learning</h3>
                <p>Content adapted to your unique learning style</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/10 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Learn at Your Pace</h3>
                <p>Take the time you need to understand each concept</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/10 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Supportive Community</h3>
                <p>Connect with others on similar learning journeys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
