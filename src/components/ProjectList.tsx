import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ProjectCard from './ProjectCard';
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
  category: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const { isEnglish } = useLanguage();

  const categories = [
    { id: 'all', label: isEnglish ? 'All Projects' : 'Alle Projekte', icon: null },
    { id: 'web', label: isEnglish ? 'Web' : 'Web', icon: null },
    { id: 'coming', label: isEnglish ? 'Coming Soon' : 'Demnächst', icon: null },
  ];

  const filteredProjects = (categoryId: string) => {
    if (categoryId === 'all') return projects;
    if (categoryId === 'coming') return projects.filter(p => p.tags.includes('Coming Soon'));
    return projects.filter(p => !p.tags.includes('Coming Soon'));
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8">
        {categories.map((cat) => (
          <TabsTrigger key={cat.id} value={cat.id}>
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((cat) => (
        <TabsContent key={cat.id} value={cat.id}>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects(cat.id).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          {filteredProjects(cat.id).length === 0 && (
            <p className="text-center text-base-content/60 py-12">
              {isEnglish ? 'No projects in this category yet.' : 'Noch keine Projekte in dieser Kategorie.'}
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
