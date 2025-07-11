'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('Corporate');
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

  // Visible card window and image visible portion
  const CARD_HEIGHT = 400; // px, card viewport
  const IMAGE_HEIGHT = 1200; // px, visible image portion to scroll
  const SCROLL_AMOUNT = IMAGE_HEIGHT - CARD_HEIGHT; // px

  const projects = [
    { title: 'Corporate/Ajency', category: 'Corporate', image: '/c1.png' },
    { title: 'Corporate/Ajency', category: 'Corporate', image: '/c2.png' },
    { title: 'Corporate/Ajency', category: 'Corporate', image: '/c3.png' },
    { title: 'Corporate/Ajency', category: 'Corporate', image: '/c4.png' },
    { title: 'Ecommerce Store', category: 'Ecommerce', image: '/e1.png' },
    { title: 'Ecommerce Store', category: 'Ecommerce', image: '/e2.png' },
    { title: 'Ecommerce Store', category: 'Ecommerce', image: '/e3.png' },
    { title: 'Ecommerce Store', category: 'Ecommerce', image: '/e4.png' },
    { title: 'Hospital/Farmacy', category: 'Healthcare', image: '/h1.png' },
    { title: 'Hospital/Farmacy', category: 'Healthcare', image: '/h2.png' },
    { title: 'Real Estate', category: 'Real Estate', image: '/t.png' },
    { title: 'Real Estate', category: 'Real Estate', image: '/t1.png' },
    { title: 'Real Estate', category: 'Real Estate', image: '/t2.png' },
    { title: 'Real Estate', category: 'Real Estate', image: '/t3.png' },
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'Ecommerce', label: 'Ecommerce' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Healthcare', label: 'Healthcare' }
  ];

  const filteredProjects = projects.filter(project => filter === 'all' || project.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/d.png"
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
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Project Image Frame with Scrolling Animation */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl border border-border shadow-lg flex items-center justify-center"
                  style={{ height: `${CARD_HEIGHT}px` }}
                >
                  <motion.div
                    className="absolute left-0 w-full"
                    style={{ height: `${IMAGE_HEIGHT}px`, top: 0 }}
                    animate={
                      hoveredIndex === index
                        ? { top: `-${SCROLL_AMOUNT}px` }
                        : { top: '0px' }
                    }
                    transition={
                      hoveredIndex === index
                        ? { duration: 4, ease: "linear" }
                        : { duration: 0.6 }
                    }
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1755}
                      height={IMAGE_HEIGHT}
                      className="object-cover w-full"
                      style={{
                        height: `${IMAGE_HEIGHT}px`,
                        width: '100%',
                        objectPosition: 'top',
                        pointerEvents: 'none'
                      }}
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                  {/* Gradient Overlay */}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
