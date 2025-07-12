'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';

export default function LiveSites() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const liveProjects = [
    {
      title: 'Best Indian',
      description: 'Indian products and services platform.',
      url: 'https://bestindian.co.in',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Better Nutrition For All',
      description: 'Health and nutrition platform.',
      url: 'https://betternutritionforall.in',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'The Yogez',
      description: 'Yoga and wellness platform.',
      url: 'https://theyogez.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Snaana',
      description: 'Wellness and lifestyle platform.',
      url: 'https://www.snaana.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Factory Price Shop',
      description: 'Online retail store with factory direct pricing.',
      url: 'https://www.factorypriceshop9.com',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Travel Parinda',
      description: 'Travel and tourism platform.',
      url: 'https://www.travelparinda.com',
      category: 'Travel',
      status: 'Live'
    },
    {
      title: 'The Crazy Mountaineers',
      description: 'Adventure and mountaineering services.',
      url: 'https://www.thecrazymountaineers.com/',
      category: 'Travel',
      status: 'Live'
    },
    {
      title: 'Doon Edu',
      description: 'Educational platform and services.',
      url: 'https://www.doonedu.com',
      category: 'Education',
      status: 'Live'
    },
    {
      title: 'Alpine College',
      description: 'Educational institution website.',
      url: 'https://alpinecollege.edu.in',
      category: 'Education',
      status: 'Live'
    },
    {
      title: 'Yog Travel',
      description: 'Yoga retreat and travel services.',
      url: 'https://www.yogtravel.com',
      category: 'Travel',
      status: 'Live'
    },
    {
      title: 'Buddha Yog Peeth',
      description: 'Yoga school and spiritual center.',
      url: 'https://www.buddhayogpeeth.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Canada Yoga Studio',
      description: 'Yoga studio and wellness center.',
      url: 'https://www.canadayogastudio.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Clover Organic',
      description: 'Organic products and healthy living.',
      url: 'https://www.cloverorganic.com',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Luxe Esthetica',
      description: 'Beauty and aesthetics services.',
      url: 'https://www.luxeesthetica.com',
      category: 'Beauty',
      status: 'Live'
    },
    {
      title: 'Vihana Retreat',
      description: 'Wellness retreat and spa services.',
      url: 'https://www.vihanaretreat.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'Sambhav Ethnic',
      description: 'Indian clothing brand with traditional and modern designs.',
      url: 'https://sambhavethnic.com',
      category: 'Fashion',
      status: 'Live'
    },
    {
      title: 'Lotus Pops',
      description: 'Healthy snacks and nutritious food products.',
      url: 'https://www.lotuspops.com',
      category: 'Food',
      status: 'Live'
    },
    {
      title: '7 Chakras Yoga School',
      description: 'Professional yoga school and training center.',
      url: 'https://7chakrasyogaschool.com',
      category: 'Education',
      status: 'Live'
    },
    {
      title: 'Anamay Dhara Ayurveda',
      description: 'Ayurveda center and holistic wellness.',
      url: 'http://anamaydharaayurveda.com',
      category: 'Healthcare',
      status: 'Live'
    },
    {
      title: 'UIHM',
      description: 'Hotel Management Institute and training center.',
      url: 'https://uihm.in',
      category: 'Education',
      status: 'Live'
    },
    {
      title: 'Gloroots Aesthetics',
      description: 'Skin care and beauty treatments.',
      url: 'http://glorootsaesthetics.com',
      category: 'Beauty',
      status: 'Live'
    },
    {
      title: 'SSM Academy',
      description: 'IAS Institute and civil services coaching.',
      url: 'https://ssmacademy.co.in',
      category: 'Education',
      status: 'Live'
    },
    {
      title: 'Pushpa India',
      description: 'Online grocery store and fresh produce.',
      url: 'https://pushpaindia.in',
      category: 'Ecommerce',
      status: 'Live'
    },
    {
      title: 'Forever Gift Hub',
      description: 'Custom gifts and personalized products.',
      url: 'https://forevergifthub.in',
      category: 'Ecommerce',
      status: 'Live'
    }
  ];

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

      {/* Live Projects List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {liveProjects.map((project, index) => (
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
