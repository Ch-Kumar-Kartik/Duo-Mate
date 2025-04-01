import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Send, User } from "lucide-react";

interface EmailCardProps {
  _id: string;
  from: string;
  subject: string;
  body: string;
  time: string;
  reply_body: string;
  category?: string;
}

export default function EmailCard({ from, subject, body, time, reply_body, category }: EmailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(reply_body);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  const responseOptions = [
    reply_body,
    "Thanks for reaching out. I'll review this and get back to you soon.",
    "I appreciate the information. Let me think about this and respond properly later."
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md animate-scale-up">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-duoblue/20 text-duoblue">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{from}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Less" : "More"}
          </Button>
        </div>
        
        <div>
          <h3 className="font-medium">{subject}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {body}
          </p>
        </div>
        
        {isExpanded && (
          <div className="mt-2 border-t border-border pt-3 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-duopurple/20 text-duopurple">
                <span className="text-xs font-bold">AI</span>
              </div>
              <p className="text-sm font-medium">Suggested reply:</p>
            </div>
            
            <div className="relative">
              <textarea
                value={selectedResponse}
                onChange={(e) => setSelectedResponse(e.target.value)}
                className="w-full min-h-[80px] p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-duopurple"
                placeholder="Write your reply here..."
                aria-label="Reply text"
              />
              <Button 
                size="icon" 
                className="absolute right-2 bottom-2 h-7 w-7"
                variant="ghost"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {responseOptions.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedResponse(response)}
                >
                  Option {index + 1}
                </Button>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              {!isSent ? (
                <>
                  <Button variant="outline" size="sm">
                    Edit More
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-1"
                    onClick={handleSend}
                    disabled={isSending}
                  >
                    <Send className="h-3.5 w-3.5" />
                    {isSending ? "Sending..." : "Send"}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-duoblue flex items-center gap-1">
                  <Send className="h-3.5 w-3.5" />
                  Response sent!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
