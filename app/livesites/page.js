'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';

export default function LiveSites() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const liveProjects = [
    {
      title: 'Lumina Finance',
      description: 'A modern fintech platform with real-time data visualization and interactive dashboards.',
      url: 'https://lumina-finance.com',
      category: 'Corporate',
      status: 'Live'
    },
    {
      title: 'Orbital Gallery',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      url: 'https://orbital-gallery.com',
      category: 'Corporate',
      status: 'Live'
    },
    {
      title: 'Eco Impact',
      description: 'Environmental sustainability platform with intuitive data reporting.',
      url: 'https://eco-impact.org',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Velocity Store',
      description: 'E-commerce platform with optimized performance and seamless user experience.',
      url: 'https://velocity-store.com',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Harmony Music',
      description: 'Streaming service with custom audio visualization and seamless playback.',
      url: 'https://harmony-music.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Nebula Explorer',
      description: 'Interactive space exploration experience with 3D planetary systems.',
      url: 'https://nebula-explorer.com',
      category: 'Real Estate',
      status: 'Live'
    }
  ];

  const categories = ['All', 'Corporate', 'Ecommerce', 'Healthcare', 'Real Estate'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = liveProjects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Live Sites
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Explore our live projects and see our work in action. Each link takes you directly to the deployed applications we've built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {project.url}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Site
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No live projects found for the selected category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Want to see your project here?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's work together to bring your vision to life and add it to our portfolio of live sites.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 