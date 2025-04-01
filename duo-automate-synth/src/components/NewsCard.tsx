
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  category: string;
  summary: string;
  imageUrl: string;
  url: string;
}

export default function NewsCard({
  title,
  source,
  category,
  summary,
  imageUrl,
  url,
}: NewsCardProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden shadow-sm transition-all hover:shadow-md bg-card animate-scale-up group">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 relative">
          <img
            src={imageUrl}
            alt={title}
            className="h-48 sm:h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-duodark-500 to-transparent opacity-60" />
          <Badge className="absolute bottom-2 left-2 bg-duopurple">{category}</Badge>
        </div>
        
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium line-clamp-2">{title}</h3>
            <Badge variant="outline" className="shrink-0 text-xs bg-background text-foreground">
              {source}
            </Badge>
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {summary}
          </p>
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm inline-flex items-center gap-1 text-duoblue hover:text-duoblue-400 transition-colors"
          >
            Read full article
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
