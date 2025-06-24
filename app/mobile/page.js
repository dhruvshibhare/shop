'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/mobile/MobileLayout';
import MobileHero from '@/components/mobile/MobileHero';
import InteractiveCard from '@/components/mobile/InteractiveCard';
import BottomSheet from '@/components/mobile/BottomSheet';
import SkeletonLoader from '@/components/mobile/SkeletonLoader';
import GestureHandler from '@/components/mobile/GestureHandler';

export default function MobilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const projects = [
    {
      title: 'Lumina Finance',
      category: 'Web Development',
      description: 'A modern fintech platform with real-time data visualization and interactive dashboards.',
      image: 'https://images.pexels.com/photos/7963572/pexels-photo-7963572.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
      title: 'Orbital Gallery',
      category: 'Interactive Experience',
      description: 'Interactive 3D art gallery experience with WebGL and custom animations.',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
      title: 'Eco Impact',
      category: 'UX/UI Design',
      description: 'UX/UI design for an environmental sustainability platform with intuitive data reporting.',
      image: 'https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectPress = (project) => {
    setSelectedProject(project);
    setIsBottomSheetOpen(true);
  };

  const handleSwipeLeft = () => {
    console.log('Swiped left - could navigate to next section');
  };

  const handleSwipeRight = () => {
    console.log('Swiped right - could navigate to previous section');
  };

  return (
    <MobileLayout>
      <GestureHandler
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <div className="min-h-screen">
          <MobileHero />
          
          <section className="py-12 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Swipe through our latest work</p>
            </motion.div>

            {isLoading ? (
              <SkeletonLoader type="card" count={3} />
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <InteractiveCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      category={project.category}
                      onPress={() => handleProjectPress(project)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Services Section */}
          <section className="py-12 px-6 bg-muted/30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Our Services</h2>
              <p className="text-muted-foreground">What we do best</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Web Dev', icon: '💻' },
                { title: '3D Design', icon: '🎨' },
                { title: 'Mobile', icon: '📱' },
                { title: 'Consulting', icon: '💡' }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-card p-6 rounded-2xl border border-border text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <h3 className="font-semibold">{service.title}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </GestureHandler>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="p-6">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {selectedProject.category}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {selectedProject.description}
            </p>
            <div className="space-y-4">
              <h3 className="font-semibold">Project Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team Size</span>
                  <span>4 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-600">Completed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>
    </MobileLayout>
  );
}