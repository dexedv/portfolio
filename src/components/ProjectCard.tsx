import { ArrowUpRight, Sparkles, Terminal, Palette, LayoutGrid, Car } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from './LanguageContext';

interface Project {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  link: string;
  icon: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  terminal: Terminal,
  palette: Palette,
  grid: LayoutGrid,
  car: Car,
};

const gradientMap: Record<string, string> = {
  sparkles: 'from-purple-500 to-pink-500',
  terminal: 'from-blue-500 to-cyan-500',
  palette: 'from-amber-500 to-orange-500',
  grid: 'from-green-500 to-emerald-500',
  car: 'from-violet-500 to-purple-500',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { isEnglish } = useLanguage();
  const Icon = iconMap[project.icon] || Terminal;
  const gradient = gradientMap[project.icon] || 'from-purple-500 to-pink-500';
  const title = isEnglish ? project.titleEn : project.title;
  const description = isEnglish ? project.descriptionEn : project.description;

  return (
    <a href={project.link} className="block" style={{ animationDelay: `${index * 100}ms` }}>
      <Card className="group hover:-translate-y-2 h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${gradient}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-base-content/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>
          <CardTitle className="mt-4 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
