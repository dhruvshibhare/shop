'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Lazy load Three.js only when needed
const loadThreeJS = () => import('three');

export default function HeroSection() {
  const canvasRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const containerRef = useRef(null);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);
  
  useEffect(() => {
    // Only load Three.js on desktop and when component is in view
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const timer = setTimeout(() => {
        loadThreeJS().then((THREE) => {
          setIsThreeLoaded(true);
          initializeThreeJS(THREE);
        });
      }, 100); // Small delay to prioritize initial render
      
      return () => clearTimeout(timer);
    }
  }, []);

  const initializeThreeJS = (THREE) => {
    if (!canvasRef.current) return;
    
    // Simplified particle system for better performance
    const scene = new THREE.Scene();
    
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 3;
    scene.add(camera);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Disable for better performance
      powerPreference: "high-performance"
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Reduced particle count for better performance
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 800; // Reduced from 1500
    
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    const mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -((event.clientY / sizes.height) * 2 - 1);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const clock = new THREE.Clock();
    let animationId;
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = mouse.y * 0.2;
      particles.rotation.z = mouse.x * 0.2;
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  };

  // Simplified 3D floating elements with better performance
  useEffect(() => {
    if (!floatingElementsRef.current || !isThreeLoaded) return;

    loadThreeJS().then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: false,
        powerPreference: "high-performance"
      });
      
      const container = floatingElementsRef.current;
      const containerRect = container.getBoundingClientRect();
      
      renderer.setSize(containerRect.width, containerRect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Reduced number of elements for better performance
      const elements = [];
      
      // Only wireframe boxes for simplicity and performance
      for (let i = 0; i < 8; i++) {
        const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0, 0, 0.3 + Math.random() * 0.4),
          transparent: true,
          opacity: 0.6,
          wireframe: true
        });
        
        const box = new THREE.Mesh(boxGeometry, material);
        box.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        );
        box.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        scene.add(box);
        elements.push({ mesh: box, speed: 0.005 + Math.random() * 0.01 });
      }

      camera.position.z = 6;

      let animationId;
      const animate = () => {
        elements.forEach((element, index) => {
          element.mesh.rotation.x += element.speed;
          element.mesh.rotation.y += element.speed * 0.8;
          element.mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        });
        
        scene.rotation.y += 0.001;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      
      animate();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        container.removeChild(renderer.domElement);
        renderer.dispose();
      };
    });
  }, [isThreeLoaded]);
  
  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Floating 3D Elements - Only on desktop */}
      <div 
        ref={floatingElementsRef} 
        className="absolute right-10 top-1/2 transform -translate-y-1/2 w-80 h-80 z-10 hidden lg:block"
      />
      
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                We create digital<br />
                <span className="text-muted-foreground">experiences</span> that matter
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                Innovative web development solutions for forward-thinking businesses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium inline-flex items-center hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                >
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  href="/projects" 
                  className="px-8 py-4 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/80 transition-all duration-300 border"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
            
            {/* Simplified decorative elements for mobile */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex justify-center items-center relative"
            >
              <div className="relative">
                {/* Reduced floating elements */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-12 h-12 bg-muted rounded-lg border float-animation"
                    style={{
                      top: `${Math.random() * 150}px`,
                      left: `${Math.random() * 100}px`,
                      animationDelay: `${i * 1}s`,
                      animationDuration: `${6 + i}s`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}