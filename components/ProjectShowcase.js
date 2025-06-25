'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Sample project data with tall scrolling images
  const projects = [
    {
      id: 1,
      title: 'Lumina Finance',
      category: 'Corporate Website',
      description: 'Modern fintech platform with real-time data visualization and interactive dashboards.',
      image: 'shop/c1.png',
      link: '/projects'
    },
    {
      id: 2,
      title: 'Orbital Gallery',
      category: 'Cool Agency',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      image: './images/c2.png',
      link: '/projects'
    },
    {
      id: 3,
      title: 'Eco Impact',
      category: 'Ecommerce',
      description: 'UX/UI design for an environmental sustainability platform with intuitive data reporting.',
      image: './images/e1.png',
      link: '/projects'
    },
    {
      id: 4,
      title: 'Velocity Store',
      category: 'Ecommerce',
      description: 'E-commerce platform optimization reducing load time by 70% and increasing conversions.',
      image: './images/e2.png',
      link: '/projects'
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Portfolio Showcase
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative digital solutions that push boundaries and deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Frame */}
              <div className="relative w-full aspect-[9/16] bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                </div>

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
                </motion.div>

                {/* Hover Indicator */}
                <motion.div
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              {/* Frame Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  boxShadow: hoveredIndex === index 
                    ? "0 0 30px rgba(var(--primary), 0.3)" 
                    : "0 0 0px rgba(var(--primary), 0)"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
