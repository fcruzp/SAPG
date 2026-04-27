"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  ChevronUp,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Calendar,
  ArrowRight,
  Star,
  Send,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shield,
  Target,
  Award,
  BookOpen,
  Camera,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AdminPanel } from "@/components/admin/admin-panel";

// ============================================================
// Navigation
// ============================================================
const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#registro", label: "Registro" },
  { href: "#blog", label: "Blog" },
  { href: "#galeria", label: "Galería" },
  { href: "#eventos", label: "Eventos" },
  { href: "#contacto", label: "Contacto" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/images/fp-logo.png"
              alt="SAPG Fuerza del Pueblo"
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg border-2 ${scrolled ? 'border-white' : 'border-white/50'}`}
            />
            <div className="hidden sm:block">
              <p
                className={`font-bold text-sm md:text-base leading-tight ${scrolled ? "text-gray-900" : "text-white"}`}
              >
                SAPG
              </p>
              <p
                className={`text-xs leading-tight ${scrolled ? "text-gray-500" : "text-white/80"}`}
              >
                Fuerza del Pueblo
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-fp-red hover:bg-fp-red/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-3 bg-fp-red hover:bg-fp-red-dark text-white"
            >
              <a href="#registro">Únete Ahora</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:text-fp-red hover:bg-fp-red/5 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="w-full mt-3 bg-fp-red hover:bg-fp-red-dark text-white"
              >
                <a href="#registro" onClick={() => setIsOpen(false)}>
                  Únete Ahora
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ============================================================
// Hero Section
// ============================================================
function HeroSection() {
  const words = ["profesionales", "comprometidos", "unidos", "capacitados"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-banner.png')" }}
      />
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
            <Star className="w-3.5 h-3.5 mr-1.5" />
            Partido Fuerza del Pueblo
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Secretaría de
            <br />
            <span className="text-fp-gold-light">Asuntos Profesionales</span>
            <br />
            <span className="text-lg sm:text-xl md:text-2xl font-medium text-white/80 mt-2 block">
              y Gremiales
            </span>
          </h1>

          <div className="h-10 md:h-12 mb-8 flex items-center justify-center">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light">
              Profesionales{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-bold text-fp-gold-light"
                  transition={{ duration: 0.5 }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>{" "}
              por un mejor país
            </p>
          </div>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Súmate a nuestra comunidad de profesionales comprometidos con el
            desarrollo y la transformación de la República Dominicana. Tu
            experiencia y conocimiento son fundamentales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-fp-red hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-xl"
            >
              <a href="#registro">
                <Users className="w-5 h-5 mr-2" />
                Regístrate Aquí
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
            >
              <a href="#nosotros">
                Conoce Más
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "5,000+", label: "Profesionales" },
            { value: "31", label: "Provincias" },
            { value: "50+", label: "Profesiones" },
            { value: "100+", label: "Eventos" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
            >
              <p className="text-2xl md:text-4xl font-extrabold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}

// ============================================================
// About Section
// ============================================================
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-team.png"
                alt="Profesionales de Fuerza del Pueblo"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-fp-red text-white border-none">
                  Nuestro Equipo
                </Badge>
              </div>
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-fp-green text-white p-5 rounded-xl shadow-xl hidden md:block"
            >
              <p className="text-3xl font-extrabold">10+</p>
              <p className="text-sm text-green-100">Años de servicio</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="outline" className="text-fp-red border-fp-red mb-4">
              Sobre Nosotros
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Comprometidos con el{" "}
              <span className="gradient-text">desarrollo profesional</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              La <strong>Secretaría de Asuntos Profesionales y Gremiales (SAPG)</strong> del
              Partido Fuerza del Pueblo es la instancia encargada de organizar, articular y
              fortalecer la participación de los profesionales dominicanos en la construcción
              de un país más justo y próspero.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Bajo el liderazgo del <strong>Dr. Leonel Fernández</strong> y con la coordinación
              de nuestro secretario <strong>Freddy Pérez</strong>, trabajamos para que cada
              profesional aporte su conocimiento y experiencia al proyecto de nación que
              necesita la República Dominicana.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Transparencia",
                  desc: "Gestión clara y honesta",
                },
                {
                  icon: <Target className="w-5 h-5" />,
                  title: "Compromiso",
                  desc: "Dedicación total al servicio",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Unidad",
                  desc: "Trabajo en equipo solidario",
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: "Excelencia",
                  desc: "Los mejores profesionales",
                },
              ].map((value, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-fp-red/10 text-fp-red flex items-center justify-center flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {value.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-fp-red hover:bg-fp-red-dark text-white font-semibold"
            >
              <a href="#registro">
                Únete al Equipo <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Mission & Vision
// ============================================================
function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-fp-red/10 text-fp-red flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Organizar y capacitar a los profesionales dominicanos para que sean
              agentes de cambio activos en la transformación social, económica y
              política de la República Dominicana, promoviendo la justicia social,
              la equidad y el desarrollo sostenible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-fp-green to-fp-green-dark rounded-2xl p-8 md:p-10 shadow-lg text-white hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 text-white flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
            <p className="text-green-50 leading-relaxed text-lg">
              Ser la secretaría de profesionales más fuerte, organizada e
              influyente del país, articulando el talento y la experiencia de
              miles de dominicanos comprometidos con construir una nación próspera,
              moderna y con igualdad de oportunidades para todos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Services Section
// ============================================================
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Registro Profesional",
      desc: "Inscríbete en nuestra base de datos de profesionales y sé parte de la red más grande del país.",
      color: "fp-red",
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: "Capacitación",
      desc: "Accede a programas de formación, talleres y seminarios para potenciar tus habilidades profesionales.",
      color: "fp-green",
    },
    {
      icon: <Briefcase className="w-7 h-7" />,
      title: "Red de Contactos",
      desc: "Conecta con otros profesionales de tu área y crea alianzas estratégicas para el desarrollo.",
      color: "fp-gold",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Trabajo Comunitario",
      desc: "Participa en proyectos sociales que impactan positivamente a las comunidades dominicanas.",
      color: "fp-red",
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Asesoría Legal",
      desc: "Orientación y asesoría en temas laborales, gremiales y de ejercicio profesional.",
      color: "fp-green",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Reconocimientos",
      desc: "Programa de reconocimiento al mérito profesional y destacados contributions a la sociedad.",
      color: "fp-gold",
    },
  ];

  return (
    <section id="servicios" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-fp-green border-fp-green mb-4">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ¿Qué ofrecemos?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Servicios diseñados para empoderar a los profesionales dominicanos y
            fortalecer su impacto en la sociedad.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group h-full border-gray-100 hover:border-fp-red/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div
                    className={`w-14 h-14 rounded-xl bg-${service.color}/10 text-${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Registration Form Section
// ============================================================
function RegistrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cedula: "",
    profession: "",
    specialty: "",
    institution: "",
    city: "Santo Domingo",
    province: "Distrito Nacional",
    motivation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "¡Registro Exitoso!",
          description:
            "Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.",
          variant: "default",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          cedula: "",
          profession: "",
          specialty: "",
          institution: "",
          city: "Santo Domingo",
          province: "Distrito Nacional",
          motivation: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Ocurrió un error al enviar tu registro.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const professions = [
    "Abogado/a",
    "Administrador/a",
    "Arquitecto/a",
    "Contador/a",
    "Educador/a",
    "Enfermero/a",
    "Farmacéutico/a",
    "Ingeniero/a",
    "Médico/a",
    "Odontólogo/a",
    "Psicólogo/a",
    "Periodista",
    "Técnico/a",
    "Otro/a",
  ];

  return (
    <section
      id="registro"
      className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <Badge className="bg-fp-red text-white border-none mb-4">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Registro de Profesionales
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Únete a Nuestro Equipo
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Completa el formulario de inscripción y sé parte de la red de
            profesionales de Fuerza del Pueblo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto shadow-2xl border-0">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Tu nombre"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Tu apellido"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(809) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ID & Profession */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula de Identidad *</Label>
                    <Input
                      id="cedula"
                      name="cedula"
                      placeholder="000-0000000-0"
                      required
                      value={formData.cedula}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profesión *</Label>
                    <Select
                      value={formData.profession}
                      onValueChange={(value) =>
                        setFormData({ ...formData, profession: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu profesión" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Specialty & Institution */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Input
                      id="specialty"
                      name="specialty"
                      placeholder="Tu especialidad"
                      value={formData.specialty}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institución / Empresa</Label>
                    <Input
                      id="institution"
                      name="institution"
                      placeholder="Donde trabajas"
                      value={formData.institution}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia *</Label>
                    <Input
                      id="province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-2">
                  <Label htmlFor="motivation">
                    ¿Por qué deseas unirte a la SAPG?
                  </Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    placeholder="Cuéntanos sobre tu motivación..."
                    rows={4}
                    value={formData.motivation}
                    onChange={handleChange}
                  />
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-sm text-gray-500">
                    Al enviar este formulario, aceptas nuestros términos y
                    condiciones de uso.
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-fp-red hover:bg-fp-red-dark text-white font-bold px-8 py-6 min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Enviar Registro
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// Blog Section
// ============================================================
function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<
    { id: string; title: string; slug: string; excerpt: string; coverImage: string | null; publishedAt: string | null }[]
  >([]);
  const [selectedPost, setSelectedPost] = useState<{
    id: string;
    title: string;
    content: string;
    publishedAt: string | null;
    author: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  const handlePostClick = (slug: string) => {
    fetch(`/api/blog?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.post) setSelectedPost(data.post);
      })
      .catch(() => {});
  };

  const defaultPosts = [
    {
      id: "1",
      title: "SAPG convoca a asamblea nacional de profesionales",
      slug: "asamblea-nacional",
      excerpt:
        "La Secretaría de Asuntos Profesionales y Gremiales anuncia la realización de una asamblea nacional que reunirá a profesionales de todo el país.",
      coverImage: "/images/blog-thumb1.png",
      publishedAt: "2025-05-06T10:00:00",
    },
    {
      id: "2",
      title: "Programa de capacitación para profesionales jóvenes",
      slug: "capacitacion-jovenes",
      excerpt:
        "Lanzamos un programa de formación integral dirigido a profesionales jóvenes que desean potenciar sus habilidades y contribuir al desarrollo nacional.",
      coverImage: "/images/gallery-event2.png",
      publishedAt: "2025-04-28T10:00:00",
    },
    {
      id: "3",
      title: "Jornada de servicios comunitarios en Santo Domingo",
      slug: "jornada-comunitaria",
      excerpt:
        "Profesionales de diversas áreas ofrecieron servicios gratuitos a la comunidad en una jornada exitosa celebrada en la capital.",
      coverImage: "/images/gallery-event4.png",
      publishedAt: "2025-04-15T10:00:00",
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section id="blog" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-fp-red border-fp-red mb-4">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Blog y Noticias
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Últimas Noticias
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mantente informado sobre las actividades, noticias y eventos de la
            SAPG Fuerza del Pueblo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-100"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.coverImage || "/images/blog-thumb1.png"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-fp-red text-white border-none text-xs">
                      Noticias
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("es-DO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Reciente"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-fp-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt || "Lee el artículo completo para más información."}
                  </p>
                  <div className="mt-4 flex items-center text-fp-red font-semibold text-sm group-hover:gap-2 transition-all">
                    Leer más <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Post Detail Dialog */}
        <Dialog
          open={!!selectedPost}
          onOpenChange={() => setSelectedPost(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPost?.title}</DialogTitle>
            </DialogHeader>
            {selectedPost && (
              <div className="prose prose-gray max-w-none mt-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.publishedAt
                      ? new Date(selectedPost.publishedAt).toLocaleDateString("es-DO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedPost.author}
                  </span>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// ============================================================
// Gallery Section
// ============================================================
function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const images = [
    {
      src: "/images/gallery-event1.png",
      title: "Encuentro Nacional de Profesionales",
      category: "Eventos",
    },
    {
      src: "/images/gallery-event2.png",
      title: "Reunión de Coordinadores Provinciales",
      category: "Reuniones",
    },
    {
      src: "/images/gallery-event3.png",
      title: "Seminario de Capacitación Profesional",
      category: "Capacitación",
    },
    {
      src: "/images/gallery-event4.png",
      title: "Jornada de Servicios Comunitarios",
      category: "Comunidad",
    },
    {
      src: "/images/about-team.png",
      title: "Equipo de Dirección Nacional",
      category: "Equipo",
    },
    {
      src: "/images/gallery-event5.png",
      title: "Ceremonia de Reconocimiento",
      category: "Eventos",
    },
  ];

  const displayedImages = showAll ? images : images.slice(0, 4);

  return (
    <section id="galeria" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-fp-green border-fp-green mb-4">
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            Galería
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Momentos Importantes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Revive los momentos más significativos de nuestras actividades y
            eventos a lo largo del país.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setLightboxImg(img.src)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2">
                    {img.category}
                  </Badge>
                  <h4 className="text-white font-semibold text-lg">
                    {img.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {images.length > 4 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-fp-green text-fp-green hover:bg-fp-green/5 px-8"
            >
              {showAll ? (
                <>
                  Ver Menos <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Ver Más Fotos <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightboxImg(null)}
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={lightboxImg}
                alt="Gallery"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                className="absolute top-6 right-6 text-white/80 hover:text-white"
                onClick={() => setLightboxImg(null)}
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// Events Section
// ============================================================
function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      date: "15",
      month: "Jun",
      title: "Gran Asamblea de Profesionales",
      location: "Hotel Santo Domingo, DN",
      time: "9:00 AM",
      featured: true,
    },
    {
      date: "22",
      month: "Jun",
      title: "Taller de Liderazgo Profesional",
      location: "Centro de Convenciones, SD",
      time: "2:00 PM",
      featured: false,
    },
    {
      date: "5",
      month: "Jul",
      title: "Foro de Políticas Públicas",
      location: "Universidad UASD, SD",
      time: "10:00 AM",
      featured: false,
    },
    {
      date: "18",
      month: "Jul",
      title: "Jornada de Salud Comunitaria",
      location: "Villa Mella, SD",
      time: "8:00 AM",
      featured: false,
    },
  ];

  return (
    <section id="eventos" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-fp-gold border-fp-gold mb-4">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Próximos Eventos
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Calendario de Eventos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            No te pierdas nuestras próximas actividades. Participa y sé parte del
            cambio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className={`h-full hover:shadow-xl transition-all duration-300 ${
                  event.featured
                    ? "border-2 border-fp-red/20 bg-gradient-to-r from-fp-red/5 to-transparent"
                    : "border-gray-100"
                }`}
              >
                <CardContent className="p-6 flex gap-5">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center">
                    <div className="w-16 h-16 rounded-xl bg-fp-red/10 text-fp-red flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold leading-none">
                        {event.date}
                      </span>
                      <span className="text-xs font-medium uppercase mt-0.5">
                        {event.month}
                      </span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {event.featured && (
                      <Badge className="bg-fp-red text-white border-none mb-2 text-xs">
                        Destacado
                      </Badge>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Testimonials Section
// ============================================================
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Dra. María Santos",
      profession: "Médica Cirujana",
      content:
        "Ser parte de la SAPG me ha permitido conectar con otros profesionales comprometidos con el desarrollo de nuestro país. Juntos podemos hacer la diferencia.",
      rating: 5,
    },
    {
      name: "Lic. Carlos Reyes",
      profession: "Abogado",
      content:
        "La SAPG es un espacio donde los profesionales encontramos herramientas para contribuir al progreso de la República Dominicana de manera organizada.",
      rating: 5,
    },
    {
      name: "Ing. Ana Martínez",
      profession: "Ingeniera Civil",
      content:
        "Gracias a la red de contactos de la SAPG he podido participar en proyectos de impacto social que mejoran la vida de miles de dominicanos.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-fp-red to-fp-red-dark text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Lo Que Dicen Nuestros Profesionales
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-fp-gold-light fill-current"
                    />
                  )
                )}
              </div>
              <blockquote className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </blockquote>
              <div>
                <p className="font-bold text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-white/70">
                  {testimonials[current].profession}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() =>
                setCurrent(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % testimonials.length)
              }
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Contact Section
// ============================================================
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "¡Mensaje Enviado!",
          description: "Hemos recibido tu mensaje. Te responderemos pronto.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.error || "Ocurrió un error.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error de conexión",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-fp-red border-fp-red mb-4">
            Contacto
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comunicate con Nosotros
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ¿Tienes preguntas o deseas más información? No dudes en
            comunicarte con nosotros.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-fp-red to-fp-red-dark text-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-bold">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Dirección</p>
                      <p className="text-white/80 text-sm">
                        Santo Domingo, República Dominicana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-white/80 text-sm">
                        (809) 000-0000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Correo</p>
                      <p className="text-white/80 text-sm">
                        contacto@sapgfuerzadelpueblo.org
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="bg-white/20" />
                <div>
                  <p className="font-semibold mb-3">Síguenos</p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com/SAPGFPOficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com/fpcomunica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com/fpzimbawe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-3"
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nombre *</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Tu nombre"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Teléfono</Label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="(809) 000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Asunto</Label>
                      <Input
                        id="contact-subject"
                        name="subject"
                        placeholder="Asunto del mensaje"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Mensaje *</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Escribe tu mensaje..."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-fp-red hover:bg-fp-red-dark text-white font-bold py-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Enviar Mensaje
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA Section
// ============================================================
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-r from-fp-green to-fp-green-dark text-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para ser parte del cambio?
          </h2>
          <p className="text-green-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Únete a miles de profesionales que están trabajando por una
            República Dominicana mejor. Tu participación importa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-fp-green hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-xl"
            >
              <a href="#registro">
                <Users className="w-5 h-5 mr-2" />
                Regístrate Ahora
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <a href="#contacto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Contáctanos
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/fp-logo.png"
                alt="SAPG Fuerza del Pueblo"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
              />
              <div>
                <p className="font-bold">SAPG</p>
                <p className="text-xs text-gray-400">
                  Fuerza del Pueblo
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Secretaría de Asuntos Profesionales y Gremiales del Partido
              Fuerza del Pueblo. Organizando a los profesionales dominicanos
              por un mejor país.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-5">Servicios</h4>
            <ul className="space-y-3">
              {[
                "Registro Profesional",
                "Capacitación",
                "Red de Contactos",
                "Trabajo Comunitario",
                "Asesoría Legal",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-fp-green" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Santo Domingo, República Dominicana
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                (809) 000-0000
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                contacto@sapgfuerzadelpueblo.org
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href="https://facebook.com/SAPGFPOficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-fp-red flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/fpcomunica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-fp-green flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/fpzimbawe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-fp-gold flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} SAPG - Secretaría de Asuntos Profesionales
            y Gremiales. Partido Fuerza del Pueblo. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Desarrollado con ❤️ para la República Dominicana
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// Back to Top Button
// ============================================================
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-fp-red text-white shadow-lg hover:bg-fp-red-dark transition-colors flex items-center justify-center"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MissionVisionSection />
        <ServicesSection />
        <RegistrationSection />
        <BlogSection />
        <GallerySection />
        <EventsSection />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />

      {/* Admin Access Button - bottom left corner */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow-lg transition-colors flex items-center justify-center"
        title="Panel de Administración"
      >
        <BarChart3 className="w-5 h-5" />
      </button>

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
