
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, Video, MapPin } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  
  // Mock calendar events
  const events = [
    {
      id: "1",
      title: "Team Standup",
      description: "Daily team progress meeting",
      startTime: new Date(new Date().setHours(9, 30, 0, 0)),
      endTime: new Date(new Date().setHours(10, 0, 0, 0)),
      type: "meeting",
      location: "Zoom",
      attendees: ["Sarah Johnson", "Michael Chen", "David Kim"]
    },
    {
      id: "2",
      title: "Project Review",
      description: "Review Q3 marketing campaign results",
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)),
      type: "meeting",
      location: "Conference Room A",
      attendees: ["Jessica Williams", "Mark Taylor"]
    },
    {
      id: "3",
      title: "Lunch with Client",
      description: "Networking lunch with potential client",
      startTime: new Date(new Date().setHours(13, 0, 0, 0)),
      endTime: new Date(new Date().setHours(14, 30, 0, 0)),
      type: "appointment",
      location: "Downtown Bistro",
      attendees: ["Alex Rodriguez"]
    },
    {
      id: "4",
      title: "Prepare Presentation",
      description: "Work on slides for tomorrow's presentation",
      startTime: new Date(new Date().setHours(15, 0, 0, 0)),
      endTime: new Date(new Date().setHours(16, 30, 0, 0)),
      type: "task",
      location: "Office",
      attendees: []
    },
    {
      id: "5",
      title: "Team Happy Hour",
      description: "Monthly team social event",
      startTime: new Date(new Date().setHours(17, 30, 0, 0)),
      endTime: new Date(new Date().setHours(19, 0, 0, 0)),
      type: "event",
      location: "Rooftop Bar",
      attendees: ["Team"]
    },
    {
      id: "6",
      title: "Product Demo",
      description: "Demo new features to the client",
      startTime: addDays(new Date(new Date().setHours(14, 0, 0, 0)), 1),
      endTime: addDays(new Date(new Date().setHours(15, 0, 0, 0)), 1),
      type: "meeting",
      location: "Client Office",
      attendees: ["Client Team", "Product Manager"]
    },
  ];
  
  // Filter events for the selected date
  const filteredEvents = events.filter(event => 
    view === "day" 
      ? isSameDay(event.startTime, date)
      : true
  ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
  // Helper to get event type badge
  const getEventBadge = (type: string) => {
    switch(type) {
      case "meeting":
        return <Badge className="bg-blue-500">Meeting</Badge>;
      case "appointment":
        return <Badge className="bg-purple-500">Appointment</Badge>;
      case "task":
        return <Badge className="bg-yellow-500 text-black">Task</Badge>;
      case "event":
        return <Badge className="bg-green-500">Event</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };
  
  // Helper to format time
  const formatTimeRange = (start: Date, end: Date) => {
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };
  
  // Generate time slots for the day view
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar sidebar */}
        <div className="w-80 border-r overflow-y-auto p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Date</h3>
              <div className="flex">
                <Button variant="ghost" size="icon" onClick={() => setDate(prev => addDays(prev, -1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDate(prev => addDays(prev, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0, 3).map(event => (
                <Card key={event.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      {getEventBadge(event.type)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeRange(event.startTime, event.endTime)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main calendar view */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</h3>
              {view === "day" && (
                <p className="text-muted-foreground">
                  {filteredEvents.length} events scheduled
                </p>
              )}
            </div>
            
            {view === "day" && (
              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>
                              {formatTimeRange(event.startTime, event.endTime)}
                            </CardDescription>
                          </div>
                          {getEventBadge(event.type)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm mb-3">{event.description}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          {event.type === "meeting" && (
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-1" />
                              Join Meeting
                            </div>
                          )}
                        </div>
                      </CardContent>
                      {event.attendees.length > 0 && (
                        <div className="px-6 py-3 bg-muted/30 border-t flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {event.attendees.length > 2 
                              ? `${event.attendees[0]}, ${event.attendees[1]}, +${event.attendees.length - 2} more`
                              : event.attendees.join(', ')}
                          </span>
                        </div>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any events scheduled for this day
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Event
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {view === "month" && (
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center font-medium py-2 text-sm">
                    {day}
                  </div>
                ))}
                {/* Calendar days would be rendered here in a real implementation */}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square border rounded-md p-1 text-sm hover:bg-muted/50 cursor-pointer">
                    <div className="font-medium mb-1">{((i % 31) + 1)}</div>
                    {i % 7 === 3 && (
                      <div className="rounded-sm text-[10px] p-0.5 bg-blue-500/10 text-blue-500 mb-0.5 truncate">
                        Meeting
                      </div>
                    )}
                    {i % 10 === 5 && (
                      <div className="rounded-sm text-[10px] p-0.5 bg-purple-500/10 text-purple-500 truncate">
                        Event
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {view === "week" && (
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-8 border-b pb-2 mb-2">
                    <div className="font-medium text-sm text-center"></div>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="font-medium text-sm text-center">
                        {format(addDays(new Date(), i), 'E, MMM d')}
                      </div>
                    ))}
                  </div>
                  
                  {timeSlots.map(hour => (
                    <div key={hour} className="grid grid-cols-8 border-b last:border-b-0 min-h-16">
                      <div className="font-medium text-xs p-2 text-muted-foreground text-right pr-4">
                        {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? 'PM' : 'AM'}
                      </div>
                      
                      {Array.from({ length: 7 }).map((_, i) => {
                        const dayEvents = events.filter(event => 
                          isSameDay(event.startTime, addDays(new Date(), i)) && 
                          event.startTime.getHours() === hour
                        );
                        
                        return (
                          <div key={i} className="border-l p-1 relative">
                            {dayEvents.map(event => (
                              <div 
                                key={event.id}
                                className={`p-1 rounded-sm text-xs mb-1 truncate cursor-pointer hover:opacity-80
                                  ${event.type === 'meeting' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                    event.type === 'appointment' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                    event.type === 'task' ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20' :
                                    'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                              >
                                {format(event.startTime, 'h:mm')} - {event.title}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
