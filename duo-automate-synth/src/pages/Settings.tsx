
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Check, Lock, Mail, User, Bell, Calendar, Newspaper, Bot, Shield, LogOut } from "lucide-react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [emailSummary, setEmailSummary] = useState(true);
  const [calendarReminders, setCalendarReminders] = useState(true);
  const [newsDigest, setNewsDigest] = useState(true);
  const [aiTone, setAiTone] = useState("professional");
  const [privacyLevel, setPrivacyLevel] = useState(80);
  
  return (
    <div className="flex-1 container max-w-6xl py-6">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto md:w-fit">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex gap-2 items-center">
            <Bot className="h-4 w-4" />
            <span className="hidden md:inline">AI Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold">JD</span>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    Upload Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPEG, PNG, GIF. Max size: 5MB
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Eastern Time (ET)" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Enabled</Badge>
                  <Button variant="outline" size="sm">
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive email notifications for important events
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Daily Email Summary</div>
                    <div className="text-sm text-muted-foreground">
                      Get a daily digest of your activities and insights
                    </div>
                  </div>
                  <Switch 
                    checked={emailSummary} 
                    onCheckedChange={setEmailSummary} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Calendar Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications for upcoming events and tasks
                    </div>
                  </div>
                  <Switch 
                    checked={calendarReminders} 
                    onCheckedChange={setCalendarReminders} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">News Digest Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when your personalized news digest is ready
                    </div>
                  </div>
                  <Switch 
                    checked={newsDigest} 
                    onCheckedChange={setNewsDigest} 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Notification Delivery Methods</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" checked/>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push" checked/>
                    <Label htmlFor="push" className="text-sm">Push Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-app"/>
                    <Label htmlFor="in-app" className="text-sm">In-App Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms"/>
                    <Label htmlFor="sms" className="text-sm">SMS</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>
                Manage your integrated services and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Gmail</div>
                      <div className="text-sm text-muted-foreground">
                        Connected on Jul 15, 2023
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-blue-500/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Google Calendar</div>
                      <div className="text-sm text-muted-foreground">
                        Connected on Jul 15, 2023
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-blue-500/10 flex items-center justify-center">
                      <Newspaper className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">News API</div>
                      <div className="text-sm text-muted-foreground">
                        Connected on Aug 2, 2023
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-gray-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Slack</div>
                      <div className="text-sm text-muted-foreground">
                        Not connected
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Data Synchronization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync Frequency</Label>
                    <Select defaultValue="15min">
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="30min">Every 30 minutes</SelectItem>
                        <SelectItem value="1hour">Every hour</SelectItem>
                        <SelectItem value="manual">Manual sync only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sync-now">Sync Now</Label>
                    <Button variant="outline" size="sm">
                      Sync All Services
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Preferences</CardTitle>
              <CardDescription>
                Customize how DuoMate's AI works for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>AI Communication Style</Label>
                <RadioGroup value={aiTone} onValueChange={setAiTone} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`flex flex-col items-start space-y-2 rounded-md border p-4 cursor-pointer hover:border-primary/50 ${aiTone === 'professional' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="professional" id="professional" className="sr-only" />
                    <Label htmlFor="professional" className="font-medium cursor-pointer">Professional</Label>
                    <p className="text-sm text-muted-foreground">
                      Formal and business-like tone for work contexts
                    </p>
                  </div>
                  <div className={`flex flex-col items-start space-y-2 rounded-md border p-4 cursor-pointer hover:border-primary/50 ${aiTone === 'friendly' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="friendly" id="friendly" className="sr-only" />
                    <Label htmlFor="friendly" className="font-medium cursor-pointer">Friendly</Label>
                    <p className="text-sm text-muted-foreground">
                      Warm and conversational for everyday communication
                    </p>
                  </div>
                  <div className={`flex flex-col items-start space-y-2 rounded-md border p-4 cursor-pointer hover:border-primary/50 ${aiTone === 'concise' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="concise" id="concise" className="sr-only" />
                    <Label htmlFor="concise" className="font-medium cursor-pointer">Concise</Label>
                    <p className="text-sm text-muted-foreground">
                      Brief and to-the-point communication
                    </p>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="ai-proactivity">AI Proactivity Level</Label>
                  <span className="text-sm text-muted-foreground">Medium</span>
                </div>
                <Slider
                  id="ai-proactivity"
                  defaultValue={[50]}
                  max={100}
                  step={25}
                  className="mb-6"
                />
                <p className="text-sm text-muted-foreground">
                  Controls how proactive the AI is in making suggestions and taking actions on your behalf.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">AI Features</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-medium">Smart Email Suggestions</div>
                      <div className="text-sm text-muted-foreground">
                        AI-generated email responses based on your writing style
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-medium">Calendar Optimization</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically suggest optimal meeting times and task scheduling
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-medium">News Personalization</div>
                      <div className="text-sm text-muted-foreground">
                        Curate news and research based on your interests and reading habits
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">AI Learning</h3>
                <div className="rounded-md border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <div className="flex gap-2 items-start">
                    <div>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        AI Learning Data
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        DuoMate learns from your interactions to provide better personalized assistance. 
                        You can reset this learning data at any time, but it will affect the personalization quality.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-yellow-600 dark:text-yellow-400 border-yellow-500/20">
                      Reset AI Learning Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save AI Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="privacy-level">Privacy Protection Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {privacyLevel < 30 ? 'Basic' : privacyLevel < 70 ? 'Standard' : 'Maximum'}
                  </span>
                </div>
                <Slider
                  id="privacy-level"
                  value={[privacyLevel]}
                  max={100}
                  step={10}
                  onValueChange={(value) => setPrivacyLevel(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Higher levels provide stronger privacy protection but may limit some AI-powered features.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Data Usage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-medium">Usage Analytics</div>
                      <div className="text-sm text-muted-foreground">
                        Help improve DuoMate by sharing anonymous usage data
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-medium">Personalization Data</div>
                      <div className="text-sm text-muted-foreground">
                        Store your preferences and habits to improve your experience
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Your Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                    Delete Account Data
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Downloading your data may take a few minutes. You'll receive an email when it's ready.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="border rounded-md p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-medium">Ready to Leave?</h3>
              <p className="text-muted-foreground">
                We're sad to see you go. Deleting your account will remove all your data.
              </p>
            </div>
            <Button variant="destructive" className="shrink-0">
              <LogOut className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import the components needed for this page
function Checkbox({ id, checked }: { id: string, checked?: boolean }) {
  return (
    <div className={`h-4 w-4 rounded border flex items-center justify-center ${checked ? 'bg-primary border-primary' : 'border-input'}`}>
      {checked && <Check className="h-3 w-3 text-primary-foreground" />}
    </div>
  );
}

function Select({ defaultValue, children }: { defaultValue: string, children: React.ReactNode }) {
  return (
    <div className="border rounded-md h-10 px-3 flex items-center justify-between">
      <span>Every 15 minutes</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  );
}

function SelectTrigger({ id, children }: { id: string, children: React.ReactNode }) {
  return children;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return null; // Not rendered in this simplified example
}

function SelectItem({ value, children }: { value: string, children: React.ReactNode }) {
  return null; // Not rendered in this simplified example
}

function SelectValue({ placeholder }: { placeholder: string }) {
  return null; // Not rendered in this simplified example
}
