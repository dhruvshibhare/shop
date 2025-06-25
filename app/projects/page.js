'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight, Eye, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load Three.js only when needed
const loadThreeJS = () => import('three');
const ProjectShowcase = dynamic(() => import('../../components/ProjectShowcase'), { ssr: false, loading: () => <div style={{height: 400}} /> });

// Add metadata export for static generation
export const metadata = {
  title: 'Our Projects | ShopVix',
  description: 'Explore our portfolio of innovative digital solutions that push boundaries and deliver exceptional results for our clients.',
};

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const heroRef = useRef(null);
  const devicesRef = useRef(null);
  const showcaseRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isShowcaseInView = useInView(showcaseRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const projects = [
    {
      title: 'Lumina Finance',
      category: 'Corporate',
      image: '/images/c1.png',
      description: 'A modern fintech platform with real-time data visualization and interactive dashboards.',
      technologies: ['React', 'Node.js', 'D3.js', 'MongoDB'],
      link: '#',
      liveLink: '#',
      progress: 95,
      range: 'Enterprise'
    },
    {
      title: 'Orbital Gallery',
      category: 'Corporate',
      image: '/images/c2.png',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      technologies: ['Three.js', 'WebGL', 'React', 'GSAP'],
      link: '#',
      liveLink: '#',
      progress: 88,
      range: 'Premium'
    },
    {
      title: 'Orbital Gallery',
      category: 'Corporate',
      image: '/images/c3.png',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      technologies: ['Three.js', 'WebGL', 'React', 'GSAP'],
      link: '#',
      liveLink: '#',
      progress: 88,
      range: 'Premium'
    },
    {
      title: 'Orbital Gallery',
      category: 'Corporate',
      image: '/images/c4.png',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      technologies: ['Three.js', 'WebGL', 'React', 'GSAP'],
      link: '#',
      liveLink: '#',
      progress: 88,
      range: 'Premium'
    },
    {
      title: 'Eco Impact',
      category: 'Ecommerce',
      image: '/images/e1.png',
      description: 'UX/UI design for an environmental sustainability platform with intuitive data reporting.',
      technologies: ['Figma', 'React', 'Chart.js', 'Tailwind'],
      link: '#',
      liveLink: '#',
      progress: 92,
      range: 'Standard'
    },
    {
      title: 'Velocity Store',
      category: 'Ecommerce',
      image: '/images/e2.png',
      description: 'E-commerce platform optimization reducing load time by 70% and increasing conversions.',
      technologies: ['Next.js', 'Vercel', 'Stripe', 'Prisma'],
      link: '#',
      liveLink: '#',
      progress: 97,
      range: 'Enterprise'
    },
    {
      title: 'Velocity Store',
      category: 'Ecommerce',
      image: '/images/e3.png',
      description: 'E-commerce platform optimization reducing load time by 70% and increasing conversions.',
      technologies: ['Next.js', 'Vercel', 'Stripe', 'Prisma'],
      link: '#',
      liveLink: '#',
      progress: 97,
      range: 'Enterprise'
    },
    {
      title: 'Velocity Store',
      category: 'Ecommerce',
      image: '/images/e4.png',
      description: 'E-commerce platform optimization reducing load time by 70% and increasing conversions.',
      technologies: ['Next.js', 'Vercel', 'Stripe', 'Prisma'],
      link: '#',
      liveLink: '#',
      progress: 97,
      range: 'Enterprise'
    },
    {
      title: 'Harmony Music',
      category: 'Healthcare',
      image: '/images/h1.png',
      description: 'Streaming service with custom audio visualization and seamless playback.',
      technologies: ['Vue.js', 'Web Audio API', 'Firebase', 'PWA'],
      link: '#',
      liveLink: '#',
      progress: 85,
      range: 'Premium'
    },
    {
      title: 'Harmony Music',
      category: 'Healthcare',
      image: '/images/h2.png',
      description: 'Streaming service with custom audio visualization and seamless playback.',
      technologies: ['Vue.js', 'Web Audio API', 'Firebase', 'PWA'],
      link: '#',
      liveLink: '#',
      progress: 85,
      range: 'Premium'
    },
    {
      title: 'Nebula Explorer',
      category: 'Real Estate',
      image: '/images/t.png',
      description: 'Interactive space exploration experience with 3D planetary systems and educational content.',
      technologies: ['Three.js', 'React', 'WebXR', 'Blender'],
      link: '#',
      liveLink: '#',
      progress: 90,
      range: 'Standard'
    },
    {
      title: 'Nebula Explorer',
      category: 'Real Estate',
      image: '/images/t1.png',
      description: 'Interactive space exploration experience with 3D planetary systems and educational content.',
      technologies: ['Three.js', 'React', 'WebXR', 'Blender'],
      link: '#',
      liveLink: '#',
      progress: 90,
      range: 'Standard'
    },
    {
      title: 'Nebula Explorer',
      category: 'Real Estate',
      image: '/images/t2.png',
      description: 'Interactive space exploration experience with 3D planetary systems and educational content.',
      technologies: ['Three.js', 'React', 'WebXR', 'Blender'],
      link: '#',
      liveLink: '#',
      progress: 90,
      range: 'Standard'
    },
    {
      title: 'Nebula Explorer',
      category: 'Real Estate',
      image: '/images/t3.png',
      description: 'Interactive space exploration experience with 3D planetary systems and educational content.',
      technologies: ['Three.js', 'React', 'WebXR', 'Blender'],
      link: '#',
      liveLink: '#',
      progress: 90,
      range: 'Standard'
    },
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'Ecommerce', label: 'Ecommerce' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Healthcare', label: 'Healthcare' }
  ];

  const filteredProjects = projects.filter(project => {
    return filter === 'all' || project.category === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Section Header */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Featured Projects
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects in Motion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our projects come to life with dynamic scrolling previews showcasing the full scope of our work.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            {filters.map((item) => (
              <motion.button
                key={item.value}
                onClick={() => setFilter(item.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  filter === item.value
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full aspect-[9/16] bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={index < 4}
                  />
                </div>
                {/* Overlay with Project Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/20 backdrop-blur-sm rounded text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0">
                  <motion.div
                    className="h-1 bg-primary"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Lazy loaded Project Showcase */}
      <ProjectShowcase />
    </div>
  );
}