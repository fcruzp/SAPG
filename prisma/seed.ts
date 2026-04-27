import { db } from "@/lib/db";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed blog posts
  const blogPosts = [
    {
      title: "SAPG convoca a asamblea nacional de profesionales",
      slug: "asamblea-nacional",
      excerpt:
        "La Secretaría de Asuntos Profesionales y Gremiales anuncia la realización de una asamblea nacional que reunirá a profesionales de todo el país para discutir las prioridades del sector.",
      content:
        "La Secretaría de Asuntos Profesionales y Gremiales (SAPG) del Partido Fuerza del Pueblo convoca a todos los profesionales inscritos a la Gran Asamblea Nacional que se celebrará en el Hotel Santo Domingo el próximo 15 de junio.\n\nEste evento marcará un hito importante en la organización profesional del país, ya que se presentarán los planes estratégicos para los próximos dos años, incluyendo programas de capacitación, redes de contacto profesional, y proyectos de impacto comunitario.\n\nEl secretario Freddy Pérez destacó la importancia de este encuentro: \"Por primera vez en la historia de nuestro partido, los profesionales tendremos un espacio propio para articular nuestras propuestas y contribuir al proyecto de nación que propone Leonel Fernández.\"\n\nEntre los temas a discutir se encuentran:\n\n1. Plan Nacional de Capacitación Profesional 2025-2027\n2. Red de Profesionales por la Comunidad\n3. Programa de Asesoría Legal y Laboral\n4. Alianzas con universidades y centros de formación\n5. Sistema de reconocimiento al mérito profesional\n\nLa participación es gratuita y se extenderá una certificación de asistencia a todos los asistentes. Para registrarse, pueden hacerlo a través de nuestro portal web o comunicándose con los coordinadores provinciales.",
      coverImage: "/images/blog-thumb1.png",
      published: true,
      publishedAt: new Date("2025-05-06"),
    },
    {
      title: "Programa de capacitación para profesionales jóvenes",
      slug: "capacitacion-jovenes",
      excerpt:
        "Lanzamos un programa de formación integral dirigido a profesionales jóvenes que desean potenciar sus habilidades y contribuir al desarrollo nacional.",
      content:
        "La SAPG pone en marcha el Programa de Liderazgo Profesional Joven (PLPJ), una iniciativa innovadora dirigida a profesionales menores de 35 años que buscan desarrollar sus competencias de liderazgo, gestión y emprendimiento.\n\nEste programa, que tendrá una duración de 6 meses, incluirá:\n\n• Talleres mensuales de liderazgo y gestión pública\n• Mentoría personalizada con profesionales reconocidos\n• Proyectos prácticos de impacto comunitario\n• Networking con líderes de diversos sectores\n• Certificación oficial al completar el programa\n\n\"Creemos firmemente que los jóvenes profesionales son el motor del cambio que necesita nuestro país. Este programa les dará las herramientas para convertirse en agentes de transformación\", expresó el equipo coordinador de la SAPG.\n\nLas inscripciones están abiertas a todos los profesionales de cualquier área que deseen participar. Las plazas son limitadas y se seleccionarán los 100 mejores perfiles.",
      coverImage: "/images/gallery-event2.png",
      published: true,
      publishedAt: new Date("2025-04-28"),
    },
    {
      title: "Jornada de servicios comunitarios en Santo Domingo",
      slug: "jornada-comunitaria",
      excerpt:
        "Profesionales de diversas áreas ofrecieron servicios gratuitos a la comunidad en una jornada exitosa celebrada en la capital.",
      content:
        "Más de 200 profesionales de la SAPG participaron en la Gran Jornada de Servicios Comunitarios celebrada en el sector de Villa Mella, Santo Domingo.\n\nDurante la jornada, que se extendió desde las 8 de la mañana hasta las 4 de la tarde, los profesionales ofrecieron:\n\n• Consultas médicas gratuitas\n• Asesoría legal\n• Talleres de educación financiera\n• Servicios psicológicos\n• Charlas de nutrición y salud preventiva\n• Asistencia técnica\n\nLa jornada fue un éxito rotundo, atendiendo a más de 500 familias de la comunidad. Los vecinos expresaron su agradecimiento a los profesionales por su desinteresado aporte.\n\n\"Esto es lo que significa servir al pueblo. Nuestros profesionales demostrando que con conocimiento y compromiso podemos transformar comunidades enteras\", destacó el coordinador de la jornada.\n\nLa SAPG continuará realizando estas jornadas de manera mensual en diferentes comunidades del Distrito Nacional y las provincias del país.",
      coverImage: "/images/gallery-event4.png",
      published: true,
      publishedAt: new Date("2025-04-15"),
    },
    {
      title: "Freddy Pérez juramenta nuevos coordinadores provinciales",
      slug: "juramentacion-coordinadores",
      excerpt:
        "En una emotiva ceremonia celebrada en la sede nacional, se juramentaron 31 nuevos coordinadores provinciales de la SAPG.",
      content:
        "El secretario de Asuntos Profesionales y Gremiales de Fuerza del Pueblo, Freddy Pérez, juramentó a decenas de dirigentes profesionales que se encargarán de coordinar las actividades de la secretaría en cada una de las 31 provincias y el Distrito Nacional.\n\nLa ceremonia, celebrada en la sede nacional del partido, contó con la presencia de miembros de la dirección política y representantes de los diferentes gremios profesionales.\n\nLos nuevos coordinadores provinciales se comprometieron a:\n\n• Fortalecer la inscripción de profesionales en sus provincias\n• Organizar actividades de capacitación y formación\n• Mantener comunicación constante con la sede nacional\n• Representar los intereses de los profesionales ante las autoridades locales\n• Promover la participación ciudadana\n\n\"Hoy damos un paso importante en la consolidación de nuestra red profesional a nivel nacional. Estos coordinadores son el puente entre los profesionales de las comunidades y las políticas de nuestro partido\", afirmó Pérez durante la juramentación.",
      coverImage: "/images/about-team.png",
      published: true,
      publishedAt: new Date("2025-03-20"),
    },
  ];

  for (const post of blogPosts) {
    await db.blogPost.create({ data: post });
    console.log(`  ✅ Created post: ${post.title}`);
  }

  // Seed testimonials
  const testimonials = [
    {
      name: "Dra. María Santos",
      profession: "Médica Cirujana",
      content:
        "Ser parte de la SAPG me ha permitido conectar con otros profesionales comprometidos con el desarrollo de nuestro país. Juntos podemos hacer la diferencia.",
      featured: true,
    },
    {
      name: "Lic. Carlos Reyes",
      profession: "Abogado",
      content:
        "La SAPG es un espacio donde los profesionales encontramos herramientas para contribuir al progreso de la República Dominicana de manera organizada y efectiva.",
      featured: true,
    },
    {
      name: "Ing. Ana Martínez",
      profession: "Ingeniera Civil",
      content:
        "Gracias a la red de contactos de la SAPG he podido participar en proyectos de impacto social que mejoran la vida de miles de dominicanos.",
      featured: true,
    },
  ];

  for (const t of testimonials) {
    await db.testimonial.create({ data: t });
    console.log(`  ✅ Created testimonial: ${t.name}`);
  }

  // Seed gallery images
  const galleryImages = [
    {
      title: "Encuentro Nacional de Profesionales",
      description:
        "Profesionales de todas las provincias se reunieron en Santo Domingo para el encuentro nacional anual.",
      imageUrl: "/images/gallery-event1.png",
      category: "Eventos",
      featured: true,
    },
    {
      title: "Reunión de Coordinadores Provinciales",
      description: "Coordinadores de las 31 provincias del país en reunión de planificación estratégica.",
      imageUrl: "/images/gallery-event2.png",
      category: "Reuniones",
      featured: false,
    },
    {
      title: "Seminario de Capacitación Profesional",
      description: "Seminario sobre liderazgo y gestión pública para profesionales de todas las áreas.",
      imageUrl: "/images/gallery-event3.png",
      category: "Capacitación",
      featured: false,
    },
    {
      title: "Jornada de Servicios Comunitarios",
      description: "Profesionales ofreciendo servicios gratuitos a la comunidad de Villa Mella.",
      imageUrl: "/images/gallery-event4.png",
      category: "Comunidad",
      featured: true,
    },
    {
      title: "Equipo de Dirección Nacional",
      description: "Miembros de la dirección nacional de la SAPG en sesión de trabajo.",
      imageUrl: "/images/about-team.png",
      category: "Equipo",
      featured: false,
    },
    {
      title: "Ceremonia de Reconocimiento",
      description: "Entrega de reconocimientos a profesionales destacados por su labor comunitaria.",
      imageUrl: "/images/gallery-event5.png",
      category: "Eventos",
      featured: false,
    },
  ];

  for (const img of galleryImages) {
    await db.galleryImage.create({ data: img });
    console.log(`  ✅ Created gallery image: ${img.title}`);
  }

  // Seed events
  const events = [
    {
      title: "Gran Asamblea de Profesionales",
      description:
        "Asamblea nacional que reunirá a profesionales de todo el país para discutir los planes estratégicos de la SAPG.",
      date: new Date("2025-06-15T09:00:00"),
      location: "Hotel Santo Domingo, Distrito Nacional",
      featured: true,
    },
    {
      title: "Taller de Liderazgo Profesional",
      description:
        "Taller intensivo de un día sobre técnicas de liderazgo y gestión para profesionales jóvenes.",
      date: new Date("2025-06-22T14:00:00"),
      location: "Centro de Convenciones, Santo Domingo",
      featured: false,
    },
    {
      title: "Foro de Políticas Públicas",
      description:
        "Foro abierto sobre el papel de los profesionales en la formulación de políticas públicas en República Dominicana.",
      date: new Date("2025-07-05T10:00:00"),
      location: "Universidad Autónoma de Santo Domingo",
      featured: false,
    },
    {
      title: "Jornada de Salud Comunitaria",
      description:
        "Profesionales de la salud ofrecerán consultas y servicios gratuitos a la comunidad.",
      date: new Date("2025-07-18T08:00:00"),
      location: "Villa Mella, Santo Domingo",
      featured: false,
    },
  ];

  for (const event of events) {
    await db.event.create({ data: event });
    console.log(`  ✅ Created event: ${event.title}`);
  }

  console.log("\n✅ Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
