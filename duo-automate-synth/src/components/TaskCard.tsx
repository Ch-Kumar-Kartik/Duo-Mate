
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Check, Clock, Star } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  isCompleted?: boolean;
}

export default function TaskCard({
  title,
  description,
  dueDate,
  dueTime,
  priority,
  isCompleted = false,
}: TaskCardProps) {
  const [completed, setCompleted] = useState(isCompleted);

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/20";
      case "medium":
        return "bg-duoblue/20 text-duoblue border-duoblue/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${completed ? "bg-muted/20 border-dashed" : "bg-card"} animate-scale-up`}>
      <div className="flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          className={`h-6 w-6 rounded-full shrink-0 ${completed ? "bg-duopurple text-white hover:bg-duopurple/90 hover:text-white" : "bg-card"}`}
          onClick={() => setCompleted(!completed)}
        >
          {completed && <Check className="h-3 w-3" />}
        </Button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`font-medium truncate ${completed ? "line-through text-muted-foreground" : ""}`}>
              {title}
            </h3>
            <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
              {priority}
            </Badge>
          </div>
          
          <p className={`text-sm line-clamp-2 ${completed ? "text-muted-foreground/70 line-through" : "text-muted-foreground"}`}>
            {description}
          </p>
          
          <div className="mt-2 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{dueDate}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{dueTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
