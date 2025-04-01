import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, Inbox, Layers, Keyboard, ArrowRight, Check } from "lucide-react";
import Hero from "@/components/Hero";

const features = [
  {
    icon: Inbox,
    title: "Smart Email Assistant",
    description: "AI-suggested email responses based on your writing style, helping you clear your inbox faster.",
    delay: 0.1,
  },
  {
    icon: CalendarDays,
    title: "Automated Task Scheduling",
    description: "Intelligent calendar management that schedules tasks and meetings based on your preferences.",
    delay: 0.2,
  },
  {
    icon: Layers,
    title: "AI-Powered News Summarization",
    description: "Stay informed with personalized news summaries and insights on topics that matter to you.",
    delay: 0.3,
  },
  {
    icon: Keyboard,
    title: "Personalized Research Assistant",
    description: "Get in-depth research on any topic with AI-powered insights and summaries from reliable sources.",
    delay: 0.4,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-border/40 backdrop-blur-sm bg-duodark-500/80 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-semibold"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-duo">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-lg">DuoMate</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-duoblue transition-colors">
              Sign In
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-duo hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Hero />
        
        <section id="features" className="py-20 px-4 md:px-6">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                DuoMate combines cutting-edge AI with intuitive design to simplify your digital life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-6 flex flex-col"
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-duoblue to-duopurple flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-duodark-500 to-duodark-400">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How DuoMate <span className="text-gradient">Works</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  DuoMate learns your preferences, writing style, and priorities to become your perfect digital twin.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      number: "01",
                      title: "Connect your accounts",
                      description: "Securely connect your email, calendar, and other services to DuoMate."
                    },
                    {
                      number: "02",
                      title: "AI learns your style",
                      description: "Our advanced AI analyzes your writing style and preferences."
                    },
                    {
                      number: "03",
                      title: "Automate your workflows",
                      description: "DuoMate handles emails, schedules tasks, and delivers insights automatically."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-duopurple/10 border border-duopurple/20 text-duopurple flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold">{step.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link to="/dashboard">
                    <Button className="bg-gradient-duo hover:opacity-90 gap-2">
                      Try DuoMate Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-glow-duo">
                  <div className="absolute inset-0 bg-gradient-to-b from-duodark-400/50 to-duodark-600/50 backdrop-blur-sm z-10"></div>
                  
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                    <div className="w-full space-y-4">
                      <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/5 p-4 shadow-lg">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-duoblue flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">AI</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Daily Summary</h3>
                            <div className="bg-white/5 h-4 rounded w-24 mt-1"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-white/10 rounded w-full"></div>
                          <div className="h-3 bg-white/10 rounded w-full"></div>
                          <div className="h-3 bg-white/10 rounded w-3/4"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/5 p-4 shadow-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Inbox className="h-4 w-4 text-duoblue" />
                            <h3 className="text-xs font-medium">Email Stats</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-white/10 rounded w-full"></div>
                            <div className="h-2 bg-white/10 rounded w-full"></div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/5 p-4 shadow-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <CalendarDays className="h-4 w-4 text-duopurple" />
                            <h3 className="text-xs font-medium">Calendar</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-white/10 rounded w-full"></div>
                            <div className="h-2 bg-white/10 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-duopurple/10 backdrop-blur-md rounded-lg border border-duopurple/20 p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-duopurple/20 flex items-center justify-center">
                              <span className="text-[10px] text-duopurple font-semibold">AI</span>
                            </div>
                            <h3 className="text-xs font-medium">Suggestion</h3>
                          </div>
                          <div className="bg-duopurple/20 rounded-full px-2 py-0.5">
                            <span className="text-[10px] text-duopurple font-medium">New</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 bg-white/10 rounded w-full"></div>
                          <div className="h-2 bg-white/10 rounded w-full"></div>
                          <div className="h-2 bg-white/10 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-duodark-400 z-0 animate-pulse-glow"></div>
                </div>
                
                <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-gradient-duo rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute -top-5 -left-5 h-24 w-24 bg-gradient-duopurple rounded-full blur-[80px] opacity-60"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="testimonials" className="py-20 px-4 md:px-6">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                DuoMate is helping professionals around the world save time and be more productive.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Marketing Director",
                  content: "DuoMate has revolutionized my workflow. The email assistant alone saves me at least 2 hours daily!",
                  delay: 0.1,
                },
                {
                  name: "Michael Chang",
                  role: "Product Manager",
                  content: "The calendar automation is incredible. My scheduling efficiency has improved by 40% since using DuoMate.",
                  delay: 0.2,
                },
                {
                  name: "Emma Wilson",
                  role: "Research Analyst",
                  content: "The news summarization feature helps me stay on top of industry trends without spending hours reading articles.",
                  delay: 0.3,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-duopurple">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm flex-1 mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="h-10 w-10 rounded-full bg-duoblue/20 flex items-center justify-center">
                        <span className="text-duoblue font-medium">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-20 px-4 md:px-6 bg-gradient-to-b from-duodark-500 to-duodark-400">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the plan that fits your needs and start boosting your productivity today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$9",
                  description: "Perfect for individuals just starting with AI assistance",
                  features: [
                    "Smart Email Assistant",
                    "Basic Calendar Integration",
                    "Limited News Summaries",
                    "5 AI Responses per day",
                  ],
                  isPopular: false,
                  delay: 0.1,
                },
                {
                  name: "Professional",
                  price: "$29",
                  description: "Ideal for professionals who want to maximize productivity",
                  features: [
                    "Advanced Email Management",
                    "Full Calendar Automation",
                    "Unlimited News Summaries",
                    "Unlimited AI Responses",
                    "Research Assistant",
                    "Priority Support",
                  ],
                  isPopular: true,
                  delay: 0.2,
                },
                {
                  name: "Team",
                  price: "$79",
                  description: "For teams that need collaborative AI assistance",
                  features: [
                    "Everything in Professional",
                    "Team Collaboration",
                    "Admin Dashboard",
                    "Advanced Analytics",
                    "API Access",
                    "Dedicated Support",
                  ],
                  isPopular: false,
                  delay: 0.3,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: plan.delay }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden border ${
                    plan.isPopular 
                      ? "border-duopurple/30 shadow-glow-purple relative" 
                      : "glass-card"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-0 w-full h-full bg-duopurple/5 backdrop-blur-sm -z-10"></div>
                  )}
                  
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-duopurple text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    
                    <Link to="/dashboard">
                      <Button
                        className={`w-full ${
                          plan.isPopular 
                            ? "bg-gradient-duo hover:opacity-90" 
                            : "bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10"
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                    
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                            plan.isPopular ? "bg-duopurple/20 text-duopurple" : "bg-duoblue/20 text-duoblue"
                          }`}>
                            <Check className="h-3 w-3" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4 md:px-6">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center glass-card rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-32 w-32 bg-gradient-duo rounded-full blur-[80px] opacity-30"></div>
              <div className="absolute -bottom-12 -left-12 h-32 w-32 bg-gradient-duopurple rounded-full blur-[80px] opacity-30"></div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Meet Your AI Twin?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Start automating your digital life today and focus on what truly matters.
                </p>
                <Link to="/dashboard">
                  <Button className="bg-gradient-duo hover:opacity-90 px-8 py-6 text-lg">
                    Get Started with DuoMate
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-12 px-4 md:px-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link 
                to="/" 
                className="flex items-center gap-2 font-semibold mb-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-duo">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-lg">DuoMate</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Your AI-powered digital twin that makes digital life simpler and more productive.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2023 DuoMate. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
