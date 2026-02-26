import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ProjectCard from './ProjectCard';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  link: string;
  icon: string;
  category: string;
}

interface ProjectListProps {
  projects: Project[];
}

function Carousel({ projects, isEnglish }: { projects: Project[]; isEnglish: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !isAutoPlaying) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Left Navigation */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm bg-base-200 border border-white/10 hover:bg-white/10 ml-2"
        aria-label="Zurück"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="overflow-x-auto scrollbar-hide pb-4 px-12 ml-10 mr-10"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-6" style={{ width: 'max-content' }}>
          {projects.map((project, index) => (
            <div key={project.id} className="w-[300px] md:w-[340px] flex-shrink-0">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Navigation */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm bg-base-200 border border-white/10 hover:bg-white/10 mr-2"
        aria-label="Weiter"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-0 right-4 z-20 btn btn-xs btn-ghost"
        aria-label={isAutoPlaying ? 'Pause' : 'Play'}
      >
        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function ProjectList({ projects }: ProjectListProps) {
  const { isEnglish } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: isEnglish ? 'All Projects' : 'Alle Projekte' },
    { id: 'web', label: isEnglish ? 'Web' : 'Web' },
    { id: 'coming', label: isEnglish ? 'Coming Soon' : 'Demnächst' },
  ];

  const filteredProjects = (categoryId: string) => {
    if (categoryId === 'all') return projects;
    if (categoryId === 'coming') return projects.filter(p => p.tags.includes('Coming Soon'));
    return projects.filter(p => !p.tags.includes('Coming Soon'));
  };

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
      <TabsList className="mb-8">
        {categories.map((cat) => (
          <TabsTrigger key={cat.id} value={cat.id}>
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((cat) => (
        <TabsContent key={cat.id} value={cat.id}>
          {filteredProjects(cat.id).length > 0 ? (
            <Carousel projects={filteredProjects(cat.id)} isEnglish={isEnglish} />
          ) : (
            <p className="text-center text-base-content/60 py-12">
              {isEnglish ? 'No projects in this category yet.' : 'Noch keine Projekte in dieser Kategorie.'}
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
