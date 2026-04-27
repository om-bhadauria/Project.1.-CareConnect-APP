'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Newspaper } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { staticHealthNews, type StaticNewsArticle } from '@/lib/static-health-news';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

// Group news by category
const newsByCategory = staticHealthNews.reduce((acc, article) => {
  if (!acc[article.category]) {
    acc[article.category] = [];
  }
  acc[article.category].push(article);
  return acc;
}, {} as Record<string, StaticNewsArticle[]>);

export default function HealthFeed() {
  const news = newsByCategory;
  
  if (Object.keys(news).length === 0) {
    return (
      <Alert>
        <AlertTitle>No News Available</AlertTitle>
        <AlertDescription>
          We could not fetch any health news at the moment. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(news).map(([category, articles]) => (
        <Card key={category} className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {articles.map((article, index) => (
                <AccordionItem value={`item-${category}-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className='flex items-center gap-2 text-left'>
                      <Newspaper className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className='font-semibold'>{article.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-muted-foreground">
                    <p>{article.summary}</p>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary">{article.source}</Badge>
                        <Button variant="link" asChild className="p-0 h-auto">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
