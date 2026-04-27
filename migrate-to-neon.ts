/**
 * Script de migración: SQLite (custom.db) → PostgreSQL (Neon)
 * Ejecutar con: npx tsx migrate-to-neon.ts
 */
import Database from 'better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const pg = new PrismaClient();
const sqlite = new Database(path.resolve('./db/custom.db'));

async function migrate() {
  console.log('🚀 Iniciando migración SQLite → Neon (PostgreSQL)...\n');

  // --- BlogPost ---
  const posts = sqlite.prepare('SELECT * FROM BlogPost').all() as any[];
  console.log(`📝 Migrando ${posts.length} artículos de blog...`);
  for (const p of posts) {
    await pg.blogPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? null,
        content: p.content,
        coverImage: p.coverImage ?? null,
        author: p.author,
        published: p.published === 1,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      },
    });
  }
  console.log(`   ✅ ${posts.length} artículos migrados.`);

  // --- ProfessionalRegistration ---
  const regs = sqlite.prepare('SELECT * FROM ProfessionalRegistration').all() as any[];
  console.log(`👤 Migrando ${regs.length} registros de profesionales...`);
  for (const r of regs) {
    await pg.professionalRegistration.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        firstName: r.firstName,
        lastName: r.lastName,
        email: r.email,
        phone: r.phone ?? null,
        cedula: r.cedula,
        profession: r.profession,
        specialty: r.specialty ?? null,
        institution: r.institution ?? null,
        address: r.address ?? null,
        city: r.city,
        province: r.province,
        motivation: r.motivation ?? null,
        status: r.status,
        createdAt: new Date(r.createdAt),
        updatedAt: new Date(r.updatedAt),
      },
    });
  }
  console.log(`   ✅ ${regs.length} profesionales migrados.`);

  // --- GalleryImage ---
  const images = sqlite.prepare('SELECT * FROM GalleryImage').all() as any[];
  console.log(`🖼️  Migrando ${images.length} imágenes de galería...`);
  for (const img of images) {
    await pg.galleryImage.upsert({
      where: { id: img.id },
      update: {},
      create: {
        id: img.id,
        title: img.title,
        description: img.description ?? null,
        imageUrl: img.imageUrl,
        category: img.category,
        featured: img.featured === 1,
        createdAt: new Date(img.createdAt),
      },
    });
  }
  console.log(`   ✅ ${images.length} imágenes migradas.`);

  // --- Event ---
  const events = sqlite.prepare('SELECT * FROM Event').all() as any[];
  console.log(`📅 Migrando ${events.length} eventos...`);
  for (const e of events) {
    await pg.event.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        title: e.title,
        description: e.description,
        date: new Date(e.date),
        location: e.location,
        imageUrl: e.imageUrl ?? null,
        featured: e.featured === 1,
        createdAt: new Date(e.createdAt),
        updatedAt: new Date(e.updatedAt),
      },
    });
  }
  console.log(`   ✅ ${events.length} eventos migrados.`);

  // --- ContactMessage ---
  const messages = sqlite.prepare('SELECT * FROM ContactMessage').all() as any[];
  console.log(`💬 Migrando ${messages.length} mensajes de contacto...`);
  for (const m of messages) {
    await pg.contactMessage.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone ?? null,
        subject: m.subject ?? null,
        message: m.message,
        read: m.read === 1,
        createdAt: new Date(m.createdAt),
      },
    });
  }
  console.log(`   ✅ ${messages.length} mensajes migrados.`);

  // --- Testimonial ---
  const testimonials = sqlite.prepare('SELECT * FROM Testimonial').all() as any[];
  console.log(`⭐ Migrando ${testimonials.length} testimonios...`);
  for (const t of testimonials) {
    await pg.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        profession: t.profession,
        content: t.content,
        imageUrl: t.imageUrl ?? null,
        featured: t.featured === 1,
        createdAt: new Date(t.createdAt),
      },
    });
  }
  console.log(`   ✅ ${testimonials.length} testimonios migrados.`);

  console.log('\n🎉 ¡Migración completada exitosamente!');
  await pg.$disconnect();
  sqlite.close();
}

migrate().catch(async (e) => {
  console.error('❌ Error en la migración:', e);
  await pg.$disconnect();
  process.exit(1);
});
