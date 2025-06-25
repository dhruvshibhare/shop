'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight, Eye, ExternalLink } from 'lucide-react';

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
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/h1.png"
            alt="Projects Hero"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Explore our portfolio of innovative digital solutions that push boundaries and deliver exceptional results.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === filterItem.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={showcaseRef} className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isShowcaseInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isShowcaseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border"
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-muted rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
                    <div
                      className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  {/* Project Range */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Project Range</span>
                    <span className="font-medium">{project.range}</span>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-gray-800" />
                  </a>
                  <a
                    href={project.liveLink}
                    className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    title="Visit Live Site"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-800" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}