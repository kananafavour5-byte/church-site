import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Clock, MapPin, Phone, Mail, Play,
  Heart, Users, BookOpen, Music, Globe, Baby, Send, MessageCircle,
  Calendar, ArrowRight, Star
} from 'lucide-react';
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import preachingImage from "./assets/preaching.jpg";
import kidsImage from "./assets/kids.jpg";
import youthImage from "./assets/youth.jpg";
import congregationImage from "./assets/congregation.jpg";
import pastorWifeImage from "./assets/pastor-wife.jpg";
import heroImage from "./assets/hero.jpg";


/* ================================================================
   DELIVERANCE CHURCH INTERNATIONAL – ISIOLO
   Official Website
   ================================================================ */

// ─── Color Palette ───
const COLORS = {
  royalBlue: '#1e3a8a',
  royalBlueLight: '#3b82f6',
  royalBlueDark: '#1e40af',
  white: '#ffffff',
  offWhite: '#fafafa',
  lightGray: '#f3f4f6',
  mediumGray: '#9ca3af',
  darkGray: '#374151',
  textDark: '#111827',
  textBody: '#4b5563',
};

// ─── Animation Hook ───
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// ─── Reusable Components ───

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const SectionHeading = ({ label, title, subtitle, light = false }: { label?: string; title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center mb-12 md:mb-16">
    {label && (
      <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: COLORS.royalBlueLight }}>
        {label}
      </span>
    )}
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-lg ${light ? 'text-gray-300' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
    <div className="w-16 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: COLORS.royalBlue }} />
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all duration-300 text-sm tracking-wide';
  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]',
    secondary: 'bg-white text-blue-900 hover:bg-gray-50 hover:shadow-lg active:scale-[0.98]',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white active:scale-[0.98]',
    ghost: 'text-blue-900 hover:bg-blue-50 active:scale-[0.98]',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ─── Navigation ───
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'Visit Us', href: '#visit' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg"><img src={heroImage} alt="Deliverance Church" /></span>
              </div>
              <div className={`hidden sm:block ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                <div className="font-bold text-sm leading-tight tracking-wide">DELIVERANCE CHURCH</div>
                <div className="text-xs tracking-widest opacity-80">INTERNATIONAL – ISIOLO</div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`text-sm font-medium tracking-wide transition-colors hover:opacity-70 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button variant={isScrolled ? 'primary' : 'secondary'} className="!px-6 !py-2.5 !text-xs" onClick={() => scrollToSection('#visit')}>
                Plan Your Visit
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-blue-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Button className="w-full" onClick={() => scrollToSection('#visit')}>
                Plan Your Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Hero Section ───
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const slides = [
    {
      image: congregationImage,
      alt: 'Pastor and First Lady',
    },
    {
      image: pastorWifeImage,
      alt: 'Congregation worship',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrentSlide((prev) => (diff > 0 ? (prev + 1) % slides.length : (prev - 1 + slides.length) % slides.length));
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[8000ms]"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <FadeIn>
            <span className="inline-block text-white/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
              Deliverance Church International
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              Isiolo
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4">
              A Place Where Everybody is Somebody
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-white/70 mb-2 font-light italic">
              Knowing Christ. Making Him Known.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Transforming Nations for Christ through the Gospel.
            </p>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" onClick={() => scrollToSection('#visit')}>
                Plan Your Visit
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" onClick={() => scrollToSection('#sermons')}>
                <Play size={16} className="mr-2" />
                Watch Sermons
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Who We Are ───
const WhoWeAre = () => {
  const values = [
    { title: 'Vision', text: 'To be a vibrant, Christ-centered community that transforms lives and impacts nations through the power of the Gospel.' },
    { title: 'Mission', text: 'To glorify God by making disciples of all nations, teaching them to obey everything Christ commanded, and equipping believers for works of service.' },
    { title: 'Motto', text: 'A Place Where Everybody is Somebody — Knowing Christ, Making Him Known, Transforming Nations.' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <FadeIn>
              <span className="text-blue-600 font-semibold text-sm tracking-[0.2em] uppercase">About Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                Welcome to<br />Deliverance Church
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are a community of believers committed to knowing Christ deeply and making Him known 
                across Isiolo and beyond. Our church is a place of grace, growth, and genuine fellowship 
                where every person is valued and empowered to fulfill their God-given purpose.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {values.map((item, index) => (
                <FadeIn key={item.title} delay={index * 100}>
                  <div className="group p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={200}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80" 
                  alt="Deliverance Church building" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-900 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-blue-200 text-sm">Years of faithful ministry in Isiolo</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─── Service Times ───
const ServiceTimes = () => {
  const services = [
    { 
      icon: <Clock size={28} />, 
      title: 'First Service', 
      day: 'Sunday', 
      time: '7:30 AM – 9:30 AM',
      color: 'bg-blue-50 text-blue-900',
      hoverColor: 'hover:bg-blue-900 hover:text-white',
    },
    { 
      icon: <Clock size={28} />, 
      title: 'Second Service', 
      day: 'Sunday', 
      time: '10:00 AM – 12:30 PM',
      color: 'bg-blue-50 text-blue-900',
      hoverColor: 'hover:bg-blue-900 hover:text-white',
    },
    { 
      icon: <BookOpen size={28} />, 
      title: 'Midweek Service', 
      day: 'Tuesday', 
      time: '5:30 PM – 6:30 PM',
      color: 'bg-blue-50 text-blue-900',
      hoverColor: 'hover:bg-blue-900 hover:text-white',
    },
    { 
      icon: <Play size={28} />, 
      title: 'Watch Online', 
      day: 'YouTube & Facebook', 
      time: 'Live & On-Demand',
      color: 'bg-red-50 text-red-700',
      hoverColor: 'hover:bg-red-700 hover:text-white',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Join Us" 
          title="Service Times" 
          subtitle="We gather every week to worship, learn, and grow together in Christ."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 100}>
              <div className={`group p-8 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-default ${service.hoverColor}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${service.color} group-hover:bg-white/20`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors">{service.title}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-1 transition-colors">{service.day}</p>
                <p className="text-lg font-medium transition-colors">{service.time}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Meet Our Pastor ───
const MeetOurPastor = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100">
                <img
                   src={preachingImage}
                   alt="Rev. Geoffrey Murungi"
                   className="w-full h-full object-cover"
/>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-xs opacity-80">Years</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <span className="text-blue-600 font-semibold text-sm tracking-[0.2em] uppercase">Our Leadership</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-2">
                Meet Our Pastor
              </h2>
              <h3 className="text-2xl font-medium text-blue-900 mb-6">Rev. Geoffrey Murungi</h3>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Rev. Geoffrey Murungi serves as the Senior Pastor of Deliverance Church International – Isiolo. 
                With a deep passion for preaching God's Word, he is committed to discipleship, prayer, and biblical 
                teaching that transforms lives through Christ. Under his leadership, the church has grown into a 
                vibrant community of believers dedicated to making Christ known across Kenya and beyond.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-2xl mb-8">
                <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "Welcome to Deliverance Church International – Isiolo. It is my joy to invite you into a community 
                  where you will be loved, nurtured, and empowered to fulfill your God-given destiny. Here, you are not 
                  just a visitor — you are family. We believe that everyone has a place in God's house, and we are 
                  excited to walk this journey of faith with you."
                </p>
                <p className="text-blue-900 font-bold text-right">— Rev. Geoffrey Murungi</p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '500+', label: 'Members' },
                  { number: '6', label: 'Ministries' },
                  { number: '3', label: 'Services Weekly' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-900">{stat.number}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Ministries ───
const Ministries = () => {
  const ministries = [
    {
      name: 'Kingdom Kids',
      description: "A fun, safe, and nurturing environment where children discover God's love through Bible stories, songs, and interactive activities.",
      icon: <Baby size={32} />,
        image: kidsImage,
      color: 'from-amber-500/80 to-orange-600/80',
      cta: 'Learn More',
      features: ['Bible Hero of the Week', 'Memory Verses', 'Kids Gallery'],
    },
    {
      name: 'Youth Ministry',
      description: 'An energetic community empowering young people to live boldly for Christ through discipleship, mentorship, and dynamic fellowship.',
      icon: <Users size={32} />,
      image: youthImage,
      color: 'from-blue-500/80 to-indigo-600/80',
      cta: 'Get Involved',
      features: ['Youth Fellowship', 'Leadership Training', 'Music & Arts'],
    },
    {
      name: "Women's Ministry",
      description: 'A warm and supportive sisterhood where women grow in faith, build meaningful relationships, and serve their families and community.',
      icon: <Heart size={32} />,
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd9a70?w=600&q=80',
      color: 'from-pink-500/80 to-rose-600/80',
      cta: 'Join Us',
      features: ['Bible Study', 'Prayer Circles', 'Community Outreach'],
    },
    {
      name: "Men's Ministry",
      description: 'A bold brotherhood of men committed to spiritual leadership, accountability, and living out their faith with integrity and courage.',
      icon: <Users size={32} />,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80',
      color: 'from-slate-600/80 to-gray-800/80',
      cta: 'Connect',
      features: ['Mens Fellowship', 'Mentorship', 'Family Support'],
    },
    {
      name: 'Worship Team',
      description: 'An inspiring team of musicians and vocalists leading the congregation into authentic worship and the presence of God.',
      icon: <Music size={32} />,
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
      color: 'from-purple-500/80 to-violet-600/80',
      cta: 'Listen',
      features: ['Live Worship', 'Choir', 'Instrumentalists'],
    },
    {
      name: 'Missions & Outreach',
      description: 'Reaching beyond our walls to serve the community, share the Gospel, and demonstrate Christs love through practical acts of service.',
      icon: <Globe size={32} />,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
      color: 'from-emerald-500/80 to-green-600/80',
      cta: 'Serve',
      features: ['Community Projects', 'Evangelism', 'Partnerships'],
    },
  ];

  return (
    <section id="ministries" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Get Involved" 
          title="Our Ministries" 
          subtitle="Discover your place in our community. Each ministry is designed to help you grow, serve, and connect."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <FadeIn key={ministry.name} delay={index * 100}>
              <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer">
                <img 
                  src={ministry.image} 
                  alt={ministry.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${ministry.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`} />

                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      {ministry.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{ministry.name}</h3>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {ministry.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span>{ministry.cta}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Sermons ───
const Sermons = () => {
  const sermons = [
    {
      title: 'Faith That Moves Mountains',
      speaker: 'Rev. Geoffrey Murungi',
      date: 'July 13, 2026',
      duration: '45 min',
      thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
      series: 'Walking by Faith',
    },
    {
      title: 'The Power of Unity',
      speaker: 'Rev. Geoffrey Murungi',
      date: 'July 6, 2026',
      duration: '38 min',
      thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80',
      series: 'One Body',
    },
    {
      title: 'Walking in Love',
      speaker: 'Rev. Geoffrey Murungi',
      date: 'June 29, 2026',
      duration: '42 min',
      thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80',
      series: 'Fruit of the Spirit',
    },
  ];

  return (
    <section id="sermons" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="text-blue-600 font-semibold text-sm tracking-[0.2em] uppercase">Watch & Listen</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Latest Sermons</h2>
          </div>
          <div className="flex gap-3">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
              <FaYoutube size={18} />
              YouTube
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              <FaFacebook size={18} />
              Facebook
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon, index) => (
            <FadeIn key={sermon.title} delay={index * 100}>
              <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} className="text-blue-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    {sermon.duration}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{sermon.series}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-900 transition-colors">{sermon.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{sermon.speaker}</span>
                    <span>{sermon.date}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Events ───
const Events = () => {
  const events = [
    {
      title: 'Youth Convention 2026',
      date: 'August 15-17, 2026',
      description: 'A three-day gathering for young people to worship, learn, and connect.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f503122058c?w=600&q=80',
      tag: 'Featured',
    },
    {
      title: 'Community Outreach Day',
      date: 'July 26, 2026',
      description: 'Join us as we serve our local community with love and practical support.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
      tag: 'Outreach',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Upcoming" 
          title="Events" 
          subtitle="Mark your calendar and be part of what God is doing in our community."
          light
        />

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <FadeIn key={event.title} delay={index * 100}>
              <div className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                    {event.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ───
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      text: "Deliverance Church has been my spiritual home for over 10 years. The teaching here has transformed my understanding of God's Word and deepened my relationship with Christ. Pastor Murungi's messages are always timely and life-changing.",
      author: 'Mary Wanjiku',
      role: 'Member since 2015',
    },
    {
      text: "I found a family here. The warmth and genuine love from everyone made me feel at home from day one. My children love Kingdom Kids, and my faith has grown stronger than ever.",
      author: 'John Mutua',
      role: 'Member since 2019',
    },
    {
      text: "The worship experience at DCI Isiolo is unlike anything I've experienced. The presence of God is tangible, and the community is incredibly supportive. This church truly lives out its motto.",
      author: 'Grace Achieng',
      role: 'Member since 2021',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="text-blue-600 font-semibold text-sm tracking-[0.2em] uppercase">Testimonies</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-12">
            What Our Family Says
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="relative min-h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className="text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-blue-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Visit Us / Contact ───
const VisitUs = () => {
  return (
    <section id="visit" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Find Us" 
          title="Visit Us" 
          subtitle="We would love to welcome you in person. Here is how you can find us."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Location</p>
                    <p className="text-gray-600">Deliverance Church International, Isiolo Town, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+254 712 345 678</p>
                    <p className="text-gray-600">+254 723 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">info@dcisiolo.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Service Times</p>
                    <p className="text-gray-600">Sunday: 7:30 AM & 10:00 AM</p>
                    <p className="text-gray-600">Tuesday: 5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="rounded-3xl overflow-hidden bg-gray-100 h-full min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891906883!2d37.0636!3d0.3538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17885f8c0f0f0f0f%3A0x0!2sIsiolo%2C%20Kenya!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Church Location"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─── Contact Form ───
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Reach Out" 
          title="Contact Us" 
          subtitle="Have a question or need prayer? We are here for you."
        />

        <FadeIn>
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="+254 7XX XXX XXX"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : submitted ? (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Message Sent!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Prayer Request ───
const PrayerRequest = () => {
  const [prayer, setPrayer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setPrayer('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 md:py-32 bg-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="text-blue-300 font-semibold text-sm tracking-[0.2em] uppercase">Prayer</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Prayer Request
            </h2>
            <p className="text-blue-200 text-lg">
              We believe in the power of prayer. Share your request with us and our prayer team will stand with you.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20">
            <textarea
              required
              rows={4}
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/90 border-0 focus:ring-2 focus:ring-white/50 outline-none transition-all resize-none mb-6"
              placeholder="Share your prayer request..."
            />
            <Button type="submit" variant="secondary" className="w-full">
              {submitted ? 'Prayer Submitted ✓' : 'Submit Prayer Request'}
            </Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Gallery ───
const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Worship', 'Youth', 'Kids', 'Events', 'Outreach'];

  const images = [
    { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', category: 'Worship' },
    { src: 'https://images.unsplash.com/photo-1523580494863-6f503122058c?w=400&q=80', category: 'Youth' },
    { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80', category: 'Kids' },
    { src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd9a70?w=400&q=80', category: 'Events' },
    { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80', category: 'Outreach' },
    { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80', category: 'Worship' },
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', category: 'Youth' },
    { src: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80', category: 'Events' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Moments" 
          title="Gallery" 
          subtitle="Glimpses of life and worship at Deliverance Church International."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <FadeIn key={`${filter}-${index}`} delay={index * 50}>
              <div className="group aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer">
                <img 
                  src={image.src} 
                  alt={image.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-sm">{image.category}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">DELIVERANCE CHURCH</div>
                <div className="text-xs text-gray-400 tracking-widest">INTERNATIONAL – ISIOLO</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A Place Where Everybody is Somebody. Knowing Christ, Making Him Known, Transforming Nations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Ministries', 'Sermons', 'Events', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Isiolo Town, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@dcisiolo.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-6">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: <FaYoutube size={20} />, href: 'https://youtube.com', label: 'YouTube' },
                { icon: <FaFacebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <FaInstagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Service Times</p>
              <p className="text-sm">Sun: 7:30 AM & 10:00 AM</p>
              <p className="text-sm">Tue: 5:30 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Deliverance Church International – Isiolo. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with love for the Kingdom.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ─── WhatsApp Button ───
const WhatsAppButton = () => (
  <a
    href="https://wa.me/254712345678"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} className="text-white" fill="currentColor" />
    <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Chat with us
    </span>
  </a>
);

// ─── Main App ───
export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <ServiceTimes />
      <MeetOurPastor />
      <Ministries />
      <Sermons />
      <Events />
      <Testimonials />
      <Gallery />
      <VisitUs />
      <ContactForm />
      <PrayerRequest />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
