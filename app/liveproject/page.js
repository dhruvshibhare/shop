'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function LiveProjects() {
  // Add category property to each project
  const liveProjects = [
    {
      image: '/event.png',
      liveLink: 'https://pkss.mydbsite.com/',
      title: 'PKSS Event',
      category: 'Basic'
    },
    {
      image: '/ngo.png',
      liveLink: 'https://sukanyasamriddhifoundation.mydbsite.com/',
      title: 'Sukanya Samriddhi Foundation',
      category: 'Static'
    },
    {
      image: '/interior.png',
      liveLink: 'https://apinteriors.mydbsite.com/',
      title: 'AP Interiors',
      category: 'Basic'
    },
    {
      image: '/gifts.png',
      liveLink: 'https://forevergifthub.in/',
      title: 'Forever Gift Hub',
      category: 'Ecommerce'
    },
    {
      image: '/rest.png',
      liveLink: 'https://delightofindia.mydbsite.com/',
      title: 'Delight of India',
      category: 'Basic'
    },
    {
      image: '/yoga.png',
      liveLink: 'https://www.yogtravel.com/',
      title: 'YogTravel',
      category: 'Ecommerce'
    },
    {
      image: '/alpine.png',
      liveLink: 'https://alpinecollege.edu.in/',
      title: 'Alpine College',
      category: 'Static'
    },
    {
      image: '/travel.png',
      liveLink: 'https://www.travelparinda.com/',
      title: 'Travel Parinda',
      category: 'Ecommerce'
    },
    {
      image: '/bestindian.png',
      liveLink: 'https://bestindian.co.in/',
      title: 'Best Indian',
      category: 'Ecommerce'
    },
    {
      image: '/betternutrition.png',
      liveLink: 'https://betternutritionforall.in/',
      title: 'Better Nutrition For All',
      category: 'Static'
    },
    // Add more live projects as needed
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'Static', label: 'Static' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Ecommerce', label: 'Ecommerce' }
  ];

  const [filter, setFilter] = useState('Basic');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isShowcaseInView = useInView(showcaseRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Filter projects based on selected filter
  const filteredProjects =
    filter === 'basic'
      ? liveProjects
      : liveProjects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/h1.png"
            alt="Live Projects Hero"
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
            Live Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Explore our real-time, live projects with interactive previews and direct links.
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
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setHoveredIndex(null)}
              >
                {/* Project Image Frame */}
                <div className="relative w-full aspect-[9/16] bg-card rounded-2xl border border-border shadow-lg overflow-hidden flex items-center justify-center">
                  <motion.div
                    className="absolute left-0 right-0"
                    style={{ top: 0, height: '100%' }}
                    animate={hoveredIndex === index ? { y: ['0%', '-66.66%'] } : { y: '0%' }}
                    transition={hoveredIndex === index ? {
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0
                    } : {}}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={300}
                      height={800}
                      className="object-cover"
                      style={{ objectPosition: 'top', height: '800px', width: '100%' }}
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Project Info Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-primary/20 backdrop-blur-sm rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </motion.div>
                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                {/* Visit Live Project Button */}
                <div className="flex justify-center mt-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow"
                  >
                    Visit Live Project
                    <ExternalLink className="w-4 h-4" />
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
