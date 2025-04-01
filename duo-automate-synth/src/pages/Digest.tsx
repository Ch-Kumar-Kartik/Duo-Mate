import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NewsCard from "@/components/NewsCard";
import { SearchIcon, BookOpen, ExternalLink, Bookmark, Share2, RotateCcw, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Digest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeResearch, setActiveResearch] = useState<string | null>(null);
  
  // Mock news articles
  const newsArticles = [
    {
      id: "1",
      title: "AI Technology Breakthrough Promises Better Natural Language Understanding",
      source: "TechDaily",
      category: "Technology",
      summary: "Researchers have developed a new AI model that shows significant improvements in understanding context and nuance in human language, potentially leading to more natural human-computer interactions.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
      url: "#",
      publishedAt: "2 hours ago"
    },
    {
      id: "2",
      title: "Global Markets Show Mixed Signals Amid Economic Data Release",
      source: "Finance Journal",
      category: "Business",
      summary: "Markets responded with caution today as new economic indicators showed mixed results, with tech stocks continuing to outperform other sectors despite overall market uncertainty.",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
      url: "#",
      publishedAt: "4 hours ago"
    },
    {
      id: "3",
      title: "New Study Reveals Surprising Benefits of Intermittent Fasting",
      source: "Health Weekly",
      category: "Health",
      summary: "A comprehensive study published today indicates that intermittent fasting may have more significant long-term health benefits than previously thought, particularly for metabolic health.",
      imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
      url: "#",
      publishedAt: "6 hours ago"
    },
    {
      id: "4",
      title: "Revolutionary Solar Technology Could Cut Costs by 50%",
      source: "Green Energy Today",
      category: "Science",
      summary: "Scientists have developed a new type of solar panel using innovative materials that could significantly reduce manufacturing costs while improving energy conversion efficiency.",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      url: "#",
      publishedAt: "Yesterday"
    },
    {
      id: "5",
      title: "Remote Work Trends: How Companies Are Adapting to the New Normal",
      source: "Business Insider",
      category: "Business",
      summary: "A new survey of Fortune 500 companies reveals that 78% plan to maintain hybrid work models indefinitely, with significant investments in collaborative technologies.",
      imageUrl: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
      url: "#",
      publishedAt: "Yesterday"
    },
  ];
  
  // Mock research topics
  const researchTopics = [
    {
      id: "1",
      title: "Artificial Intelligence in Healthcare",
      summary: "Recent applications and future potential of AI in medical diagnostics, treatment planning, and patient care.",
      saved: true,
    },
    {
      id: "2",
      title: "Sustainable Urban Development",
      summary: "Strategies for creating environmentally friendly, economically viable, and socially inclusive urban spaces.",
      saved: false,
    },
    {
      id: "3",
      title: "Quantum Computing: Current State",
      summary: "The latest developments in quantum computing technology and its potential impact on various industries.",
      saved: true,
    },
  ];
  
  // Mock research results
  const getResearchContent = (id: string) => {
    if (id === "1") {
      return {
        title: "Artificial Intelligence in Healthcare",
        sections: [
          {
            title: "Current Applications",
            content: "AI is currently being deployed in healthcare in several key areas:\n\n1. Medical Imaging Analysis : AI algorithms can detect patterns in X-rays, MRIs, and CT scans that might be missed by human radiologists. Studies show up to 95% accuracy in identifying certain conditions.\n\n2. Predictive Analytics : AI models can predict patient deterioration, readmission risks, and potential complications using vital signs and electronic health record data.\n\n3. Drug Discovery : AI is accelerating the drug development process by identifying potential therapeutic compounds and predicting their effectiveness and safety profiles."
          },
          {
            title: "Emerging Trends",
            content: "Several promising trends are emerging in healthcare AI:\n\n1. Personalized Medicine : AI systems that tailor treatment plans based on a patient's genetic makeup, lifestyle, and environmental factors.\n\n2. Remote Patient Monitoring : AI-powered devices that continuously monitor patients outside clinical settings and alert healthcare providers to potential issues.\n\n3. Natural Language Processing in Clinical Documentation : AI assistants that help clinicians with documentation, freeing up more time for patient care."
          },
          {
            title: "Challenges and Considerations",
            content: "Despite its promise, healthcare AI faces several challenges:\n\n1. Data Privacy and Security : Ensuring patient data used to train AI systems remains protected and complies with regulations like HIPAA.\n\n2. Bias in Algorithms : Ensuring AI systems don't perpetuate or amplify existing biases in healthcare delivery and access.\n\n3. Integration with Clinical Workflows : Designing AI tools that enhance rather than disrupt existing healthcare processes.\n\n4. Regulatory Approval : Navigating the complex landscape of medical device and software regulation."
          },
          {
            title: "Future Outlook",
            content: "The future of AI in healthcare looks promising, with projected market growth from $11 billion in 2021 to over $187 billion by 2030. Key developments on the horizon include:\n\n1. Autonomous Diagnostic Systems that can operate with minimal human oversight in certain contexts.\n\n2. AI-Human Collaborative Models where AI augments clinical decision-making rather than replacing human judgment.\n\n3. Democratization of Healthcare Expertise through AI systems that can bring specialist-level insights to underserved areas."
          }
        ],
        sources: [
          { title: "Artificial Intelligence in Medicine: Current Trends and Future Possibilities", publisher: "New England Journal of Medicine", year: 2023 },
          { title: "Machine Learning for Healthcare: Challenges and Opportunities", publisher: "Journal of Medical Systems", year: 2022 },
          { title: "AI in Health and Medicine: A Global Perspective", publisher: "World Health Organization", year: 2023 }
        ]
      };
    }
    
    // Default or placeholder content
    return {
      title: "Research Content",
      sections: [
        { title: "Overview", content: "This is a comprehensive overview of the topic." },
        { title: "Key Findings", content: "These are the key findings from the research." },
        { title: "Implications", content: "These are the implications of the research findings." }
      ],
      sources: [
        { title: "Source 1", publisher: "Publisher 1", year: 2023 },
        { title: "Source 2", publisher: "Publisher 2", year: 2023 }
      ]
    };
  };
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 pb-2">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Daily Digest</h2>
        <p className="text-muted-foreground">Your personalized news and research assistant</p>
      </div>
      
      <div className="flex-1 p-6 pt-2">
        <Tabs defaultValue="news" className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="news">News Feed</TabsTrigger>
              <TabsTrigger value="research">Research Assistant</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="news" className="flex-1 space-y-6 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Top Stories</h3>
                <p className="text-sm text-muted-foreground">Personalized for your interests</p>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {newsArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NewsCard
                    title={article.title}
                    source={article.source}
                    category={article.category}
                    summary={article.summary}
                    imageUrl={article.imageUrl}
                    url={article.url}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="research" className="flex-1 space-y-6 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {/* Research topics sidebar */}
              <div className="space-y-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Research a topic..."
                    className="pl-9"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    Recent Research Topics
                  </h3>
                  
                  <div className="space-y-2">
                    {researchTopics.map(topic => (
                      <div 
                        key={topic.id}
                        className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                          activeResearch === topic.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                        }`}
                        onClick={() => setActiveResearch(topic.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{topic.title}</h4>
                          {topic.saved && <Badge variant="outline" className="text-[10px]">Saved</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {topic.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/5">Climate Change</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/5">Machine Learning</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/5">Remote Work</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/5">Nutrition</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/5">Renewable Energy</Badge>
                  </div>
                </div>
              </div>
              
              {/* Research content */}
              <div className="col-span-2 overflow-y-auto">
                {activeResearch ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold">
                        {getResearchContent(activeResearch).title}
                      </h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {getResearchContent(activeResearch).sections.map((section, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle>{section.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {section.content.split('\n\n').map((paragraph, i) => (
                                <p key={i} className="whitespace-pre-line">{paragraph}</p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Sources</CardTitle>
                        <CardDescription>
                          Reference materials used for this research
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {getResearchContent(activeResearch).sources.map((source, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ExternalLink className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                              <div>
                                <a href="https://www.ibm.com/think/topics/artificial-intelligence-medicine" className="text-sm font-medium hover:underline">{source.title}</a>
                                <p className="text-xs text-muted-foreground">
                                  {source.publisher}, {source.year}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Research Assistant</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Select a research topic or enter a new query to get comprehensive AI-generated insights
                    </p>
                    <div className="max-w-md w-full relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="What would you like to learn about?"
                        className="pl-9"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
