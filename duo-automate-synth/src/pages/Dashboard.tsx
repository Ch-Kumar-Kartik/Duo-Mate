
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Inbox, BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailCard from "@/components/EmailCard";
import TaskCard from "@/components/TaskCard";
import NewsCard from "@/components/NewsCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Activity
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Processed</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              +10% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +4 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Digest</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Articles summarized today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              New suggestions available
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle><Link to={'/emails'}>Recent Emails</Link></CardTitle>
                <CardDescription>
                  Your latest email activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EmailCard
                  from="Sarah Johnson"
                  subject="Project Update: Q3 Marketing Plan"
                  preview="Hi there, I've attached the latest draft of our Q3 marketing plan for your review..."
                  time="10:30 AM"
                  aiResponse="Thanks for sharing the draft. I'll review it and provide feedback by EOD."
                />
                <EmailCard
                  from="Tech Updates"
                  subject="Your Weekly Technology Digest"
                  preview="This week in tech: AI breakthroughs, new smartphone releases, and cybersecurity alerts..."
                  time="Yesterday"
                  aiResponse="Thank you for the weekly update. I'll review these tech developments."
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle><Link to={'/calendar'}>Upcoming Tasks</Link></CardTitle>
                <CardDescription>
                  Your scheduled tasks for today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TaskCard
                  title="Client Meeting"
                  description="Discuss new project requirements with ABC Corp."
                  dueDate="Today"
                  dueTime="11:00 AM"
                  priority="high"
                />
                <TaskCard
                  title="Review Proposal"
                  description="Review and approve marketing proposal"
                  dueDate="Today"
                  dueTime="2:30 PM"
                  priority="medium"
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle><Link to={'/digest'}>News Highlights</Link></CardTitle>
                <CardDescription>
                  Today's personalized news
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <NewsCard
                  title="AI Technology Breakthrough Promises Better Natural Language Understanding"
                  source="TechDaily"
                  category="Technology"
                  summary="Researchers have developed a new AI model that shows significant improvements in understanding context and nuance in human language."
                  imageUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
                  url="#"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Emails</CardTitle>
              <CardDescription>
                Manage your email communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmailCard
                from="Sarah Johnson"
                subject="Project Update: Q3 Marketing Plan"
                preview="Hi there, I've attached the latest draft of our Q3 marketing plan for your review..."
                time="10:30 AM"
                aiResponse="Thanks for sharing the draft. I'll review it and provide feedback by EOD."
              />
              <EmailCard
                from="Tech Updates"
                subject="Your Weekly Technology Digest"
                preview="This week in tech: AI breakthroughs, new smartphone releases, and cybersecurity alerts..."
                time="Yesterday"
                aiResponse="Thank you for the weekly update. I'll review these tech developments."
              />
              <EmailCard
                from="Michael Chen"
                subject="RE: Product Development Timeline"
                preview="Thanks for the update. I think we should schedule a meeting to discuss the delays in..."
                time="Yesterday"
                aiResponse="I agree we should meet. How about tomorrow at 2pm?"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                View and manage your tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaskCard
                title="Client Meeting"
                description="Discuss new project requirements with ABC Corp."
                dueDate="Today"
                dueTime="11:00 AM"
                priority="high"
              />
              <TaskCard
                title="Review Proposal"
                description="Review and approve marketing proposal"
                dueDate="Today"
                dueTime="2:30 PM"
                priority="medium"
              />
              <TaskCard
                title="Team Check-in"
                description="Weekly team progress meeting"
                dueDate="Today"
                dueTime="4:00 PM"
                priority="low"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>News Feed</CardTitle>
              <CardDescription>
                Your personalized news digest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NewsCard
                title="AI Technology Breakthrough Promises Better Natural Language Understanding"
                source="TechDaily"
                category="Technology"
                summary="Researchers have developed a new AI model that shows significant improvements in understanding context and nuance in human language."
                imageUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
                url="#"
              />
              <NewsCard
                title="Global Markets Show Mixed Signals Amid Economic Data Release"
                source="Finance Journal"
                category="Business"
                summary="Markets responded with caution today as new economic indicators showed mixed results, with tech stocks continuing to outperform."
                imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
                url="#"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
