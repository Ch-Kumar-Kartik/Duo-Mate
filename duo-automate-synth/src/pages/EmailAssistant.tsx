import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EmailCard from "@/components/EmailCard";
import { Badge } from "@/components/ui/badge";
import { Edit, RefreshCw, Send, Star, Trash2, User, Search, Filter, Inbox } from "lucide-react";

interface Email {
  _id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  time: string;
  category: string;
  reply_body: string;
}

export default function EmailAssistant() {
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/emails');
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const getAISuggestedReply = (emailId: string) => {
    const email = emails.find(e => e._id === emailId);
    return email?.reply_body || "Thank you for your email. I'll get back to you soon.";
  };
  
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="p-6 pb-2">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Email Assistant</h2>
          <p className="text-muted-foreground">Smart email management with AI-suggested responses</p>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Email List Panel */}
          <div className="w-1/3 border-r overflow-y-auto p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search emails..." 
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-3 mt-0">
                {loading ? (
                  <div className="text-center py-4">Loading emails...</div>
                ) : (
                  emails.map((email) => (
                    <div 
                      key={email._id}
                      className={`cursor-pointer rounded-lg border p-3 hover:border-primary/50 hover:shadow-sm transition-colors ${activeEmail === email._id ? 'border-primary/50 bg-muted/30' : 'border-border'}`}
                      onClick={() => setActiveEmail(email._id)}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-medium text-sm truncate flex-1">
                          {email.from}
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">{email.time}</div>
                      </div>
                      <div className="font-medium text-sm mb-1 truncate">{email.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{email.body}</div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-[10px]">
                          {email.category || 'other'}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="work" className="space-y-3 mt-0">
                {loading ? (
                  <div className="text-center py-4">Loading emails...</div>
                ) : (
                  emails.filter(e => e.category === 'work').map((email) => (
                    <div 
                      key={email._id}
                      className={`cursor-pointer rounded-lg border p-3 hover:border-primary/50 hover:shadow-sm transition-colors ${activeEmail === email._id ? 'border-primary/50 bg-muted/30' : 'border-border'}`}
                      onClick={() => setActiveEmail(email._id)}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-medium text-sm truncate flex-1">
                          {email.from}
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">{email.time}</div>
                      </div>
                      <div className="font-medium text-sm mb-1 truncate">{email.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{email.body}</div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="personal" className="space-y-3 mt-0">
                {loading ? (
                  <div className="text-center py-4">Loading emails...</div>
                ) : (
                  emails.filter(e => e.category === 'personal').map((email) => (
                    <div 
                      key={email._id}
                      className={`cursor-pointer rounded-lg border p-3 hover:border-primary/50 hover:shadow-sm transition-colors ${activeEmail === email._id ? 'border-primary/50 bg-muted/30' : 'border-border'}`}
                      onClick={() => setActiveEmail(email._id)}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-medium text-sm truncate flex-1">
                          {email.from}
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">{email.time}</div>
                      </div>
                      <div className="font-medium text-sm mb-1 truncate">{email.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{email.body}</div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="other" className="space-y-3 mt-0">
                {loading ? (
                  <div className="text-center py-4">Loading emails...</div>
                ) : (
                  emails.filter(e => !['work', 'personal'].includes(e.category || '')).map((email) => (
                    <div 
                      key={email._id}
                      className={`cursor-pointer rounded-lg border p-3 hover:border-primary/50 hover:shadow-sm transition-colors ${activeEmail === email._id ? 'border-primary/50 bg-muted/30' : 'border-border'}`}
                      onClick={() => setActiveEmail(email._id)}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="font-medium text-sm truncate flex-1">
                          {email.from}
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">{email.time}</div>
                      </div>
                      <div className="font-medium text-sm mb-1 truncate">{email.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{email.body}</div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Email Content & Response Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeEmail ? (
              <>
                <div className="p-6 overflow-y-auto flex-1">
                  {/* Email details */}
                  {(() => {
                    const email = emails.find(e => e._id === activeEmail);
                    return (
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold">{email?.subject}</h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{email?.from}</div>
                                <div className="text-xs text-muted-foreground">{email?.time}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t text-sm">
                          <p className="leading-relaxed whitespace-pre-line">
                            {email?.body}
                          </p>
                        </div>
                        
                        {/* AI Reply Suggestion */}
                        <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <span className="text-xs font-semibold">AI</span>
                                </div>
                                AI-Suggested Reply
                              </CardTitle>
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                Regenerate
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">
                              {getAISuggestedReply(activeEmail)}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm">
                              <Send className="h-3.5 w-3.5 mr-1" />
                              Send
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        {/* Custom reply area */}
                        <div className="pt-4">
                          <Textarea 
                            placeholder="Write your own reply..." 
                            className="min-h-[100px]"
                            defaultValue={""}
                          />
                          <div className="flex justify-end mt-2">
                            <Button>
                              <Send className="h-4 w-4 mr-1" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Inbox className="h-10 w-10 text-primary/50" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select an email</h3>
                <p className="text-muted-foreground max-w-md">
                  Choose an email from the list to view its contents and get AI-suggested replies
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
