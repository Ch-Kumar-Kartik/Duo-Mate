
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      // Clear canvas when resizing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width / devicePixelRatio;
        this.y = Math.random() * canvas.height / devicePixelRatio;
        this.size = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? 
          `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})` : 
          `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1})`;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width / devicePixelRatio) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height / devicePixelRatio) this.vy = -this.vy;
      }
    }
    
    // Create particles
    const devicePixelRatio = window.devicePixelRatio || 1;
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / (10000 * devicePixelRatio)));
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      <div className="relative z-10 px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-duopurple/10 border border-duopurple/20 text-duopurple text-sm font-medium mb-4">
            Introducing DuoMate AI
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 max-w-3xl">
            Meet Your AI Twin –{" "}
            <span className="text-gradient">Automate, Organize, and Stay Ahead!</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered digital twin that handles emails, schedules tasks, and delivers personalized insights so you can focus on what matters most.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <a 
            href="/dashboard" 
            className="px-6 py-3 rounded-lg bg-gradient-duo hover:opacity-90 text-white font-medium shadow-glow-duo"
          >
            Get Started
          </a>
          <a 
            href="#features" 
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10"
          >
            Learn More
          </a>
        </motion.div>
        
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-glow-duo"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-duodark-400/50 to-duodark-600/50 backdrop-blur-sm z-10"></div>
          
          <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-4 md:p-8">
            {!isMobile && (
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-black/30 backdrop-blur-md rounded-lg border border-white/5 shadow-lg overflow-hidden">
                <div className="p-3 border-b border-white/10 flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                    <div className="w-3 h-3 rounded-full bg-duoblue/70"></div>
                    <div className="w-3 h-3 rounded-full bg-duopurple/70"></div>
                  </div>
                  <div className="mx-auto text-xs text-white/60">Email Assistant</div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-6 bg-white/5 rounded w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                  <div className="h-4 bg-white/5 rounded w-2/3"></div>
                  <div className="mt-4 h-24 bg-duopurple/10 border border-duopurple/20 rounded-lg p-2">
                    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="w-full md:w-1/2 space-y-4">
              <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4 shadow-lg">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-duoblue flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Email Response Generated</h3>
                    <p className="text-xs text-white/60">Meeting request from Sarah</p>
                  </div>
                </div>
                <div className="text-xs bg-black/20 rounded p-2 border border-white/5">
                  "I'd be happy to meet on Tuesday at 2 PM. Looking forward to discussing the project proposal."
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4 shadow-lg">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-duopurple flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Task Scheduled</h3>
                    <p className="text-xs text-white/60">Based on your calendar</p>
                  </div>
                </div>
                <div className="text-xs bg-black/20 rounded p-2 border border-white/5">
                  "I've added 'Prepare Q3 Report' for tomorrow at 10:00 AM with a 2-hour time block."
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-duodark-600/90 to-transparent md:hidden"></div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-duodark-400 z-0 animate-pulse-glow"></div>
        </motion.div>
      </div>
    </div>
  );
}
