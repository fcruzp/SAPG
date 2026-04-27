# 🇩🇴 SAPG - Portal de la Secretaría de Asuntos Profesionales y Gremiales

**Partido Fuerza del Pueblo** | Santo Domingo, República Dominicana

---

## 📋 Descripción del Proyecto

Portal web institucional tipo landing page para la **Secretaría de Asuntos Profesionales y Gremiales (SAPG)** del Partido Fuerza del Pueblo de la República Dominicana. Incluye registro de profesionales, blog, galería de fotos, eventos, formulario de contacto y un panel de administración completo.

**Entidad**: SAPG Fuerza del Pueblo  
**Ubicación**: Santo Domingo, Distrito Nacional, República Dominicana  
**Líder partidario**: Dr. Leonel Fernández (fundador del partido)  
**Secretario SAPG**: Freddy Pérez  
**Colores institucionales**: Rojo (#DC2626) y Verde (#16A34A)  
**Sitio web real**: https://www.sapgfuerzadelpueblo.org  
**Facebook oficial**: https://facebook.com/SAPGFPOficial  
**Instagram oficial**: https://instagram.com/fpcomunica  

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16 (App Router) | Framework principal |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Tipado estático |
| **Tailwind CSS** | 4 | Estilos y diseño responsive |
| **shadcn/ui** | New York style | Componentes UI |
| **Framer Motion** | 12 | Animaciones |
| **Prisma ORM** | 6 | Base de datos |
| **SQLite** | - | Motor de base de datos (archivo local) |
| **Lucide React** | - | Iconos |
| **Zustand** | 5 | Estado del cliente |
| **TanStack Query** | 5 | Estado del servidor |

---

## 📁 Estructura del Proyecto

```
/home/z/my-project/
├── prisma/
│   ├── schema.prisma          # Schema de la base de datos
│   └── seed.ts                # Datos iniciales (blog, eventos, galería, testimonios)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Layout principal (SEO, meta tags, fuentes)
│   │   ├── page.tsx           # Página principal (landing page completa)
│   │   ├── globals.css        # Estilos globales y variables CSS
│   │   └── api/
│   │       ├── auth/route.ts           # Autenticación admin (POST)
│   │       ├── blog/
│   │       │   ├── route.ts            # Blog CRUD (GET lista, POST crear)
│   │       │   └── [id]/route.ts       # Blog individual (PUT editar, DELETE eliminar)
│   │       ├── contacto/
│   │       │   ├── route.ts            # Contacto (GET lista, POST crear)
│   │       │   └── [id]/route.ts       # Contacto individual (PUT leer, DELETE)
│   │       ├── registro/
│   │       │   ├── route.ts            # Registros (GET lista, POST crear)
│   │       │   └── [id]/route.ts       # Registro individual (PUT estado, DELETE)
│   │       └── upload/route.ts         # Subida de imágenes (POST multipart)
│   ├── components/
│   │   ├── admin/
│   │   │   └── admin-panel.tsx         # Panel de administración completo
│   │   └── ui/                         # Componentes shadcn/ui (no modificar)
│   ├── hooks/
│   │   ├── use-toast.ts                # Hook de notificaciones toast
│   │   └── use-mobile.ts               # Hook de detección móvil
│   └── lib/
│       ├── db.ts                       # Cliente Prisma (import { db })
│       └── utils.ts                    # Utilidades (cn, etc.)
├── public/
│   └── images/
│       ├── fp-logo.png                 # Logo oficial de SAPG
│       ├── hero-banner.png             # Imagen del hero section
│       ├── about-team.png              # Foto del equipo/nosotros
│       ├── gallery-event1.png          # Galería: Encuentro nacional
│       ├── gallery-event2.png          # Galería: Reunión coordinadores
│       ├── gallery-event3.png          # Galería: Seminario capacitación
│       ├── gallery-event4.png          # Galería: Jornada comunitaria
│       ├── gallery-event5.png          # Galería: Ceremonia reconocimiento
│       ├── blog-thumb1.png             # Thumbnail blog
│       ├── logo-icon.png               # Icono/logo generado por IA
│       └── uploads/                    # Imágenes subidas por admin (dinámico)
├── db/
│   └── custom.db                       # Base de datos SQLite
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── worklog.md                          # Bitácora de desarrollo
├── dev.log                             # Log del servidor de desarrollo
└── Caddyfile                           # Configuración del gateway/proxy
```

---

## 🗄️ Base de Datos (Prisma Schema)

### Modelos:

#### 1. `ProfessionalRegistration` - Registros de profesionales
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| id | String (cuid) | Auto | ID único |
| firstName | String | ✅ | Nombre |
| lastName | String | ✅ | Apellido |
| email | String (unique) | ✅ | Correo electrónico |
| phone | String? | - | Teléfono |
| cedula | String (unique) | ✅ | Cédula de identidad dominicana |
| profession | String | ✅ | Profesión |
| specialty | String? | - | Especialidad |
| institution | String? | - | Institución/Empresa |
| city | String | ✅ (default: "Santo Domingo") | Ciudad |
| province | String | ✅ (default: "Distrito Nacional") | Provincia |
| motivation | String? | - | Motivación para unirse |
| status | String | ✅ (default: "pending") | Estado: pending/approved/rejected |
| createdAt | DateTime | Auto | Fecha de creación |
| updatedAt | DateTime | Auto | Fecha de actualización |

#### 2. `BlogPost` - Artículos del blog
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| id | String (cuid) | Auto | ID único |
| title | String | ✅ | Título del artículo |
| slug | String (unique) | ✅ | URL amigable |
| excerpt | String? | - | Resumen breve |
| content | String | ✅ | Contenido completo (texto plano) |
| coverImage | String? | - | URL de imagen de portada |
| author | String | Auto | Autor (default: "SAPG Fuerza del Pueblo") |
| published | Boolean | Auto | Si está publicado |
| publishedAt | DateTime? | Auto | Fecha de publicación |
| createdAt | DateTime | Auto | Fecha de creación |
| updatedAt | DateTime | Auto | Fecha de actualización |

#### 3. `GalleryImage` - Imágenes de galería
| Campo | Tipo | Descripción |
|---|---|---|
| id, title, description, imageUrl, category, featured, createdAt |

#### 4. `Event` - Eventos
| Campo | Tipo | Descripción |
|---|---|---|
| id, title, description, date, location, imageUrl, featured, createdAt, updatedAt |

#### 5. `ContactMessage` - Mensajes de contacto
| Campo | Tipo | Descripción |
|---|---|---|
| id, name, email, phone, subject, message, read, createdAt |

#### 6. `Testimonial` - Testimonios
| Campo | Tipo | Descripción |
|---|---|---|
| id, name, profession, content, imageUrl, featured, createdAt |

---

## 🔌 API Routes

Todas las APIs usan JSON. Las rutas están bajo `/api/`.

### Autenticación
```
POST /api/auth
Body: { "password": "sapg2025fp" }
Response: { "success": true, "authenticated": true }
```
- Contraseña configurada en `process.env.ADMIN_PASSWORD` o default: `sapg2025fp`

### Blog
```
GET  /api/blog              → Lista artículos publicados
GET  /api/blog?slug=xxx     → Detalle de un artículo
POST /api/blog              → Crear artículo { title, slug, excerpt, content, coverImage, published }
PUT  /api/blog/[id]         → Actualizar artículo
DELETE /api/blog/[id]       → Eliminar artículo
```

### Registros
```
GET    /api/registro        → Lista registros (últimos 10)
POST   /api/registro        → Crear registro profesional
PUT    /api/registro/[id]   → Cambiar estado { status: "approved"|"rejected"|"pending" }
DELETE /api/registro/[id]   → Eliminar registro
```

### Contacto
```
GET    /api/contacto        → Lista mensajes (últimos 20)
POST   /api/contacto        → Enviar mensaje { name, email, phone, subject, message }
PUT    /api/contacto/[id]   → Marcar leído/no leído { read: true/false }
DELETE /api/contacto/[id]   → Eliminar mensaje
```

### Upload de imágenes
```
POST /api/upload            → Subir imagen (multipart/form-data, campo: "file")
Response: { "success": true, "url": "/images/uploads/filename.png" }
```

---

## 🖥️ Panel de Administración

### Acceso
- Botón circular oscuro en la **esquina inferior izquierda** de la página (icono 📊)
- Contraseña por defecto: `sapg2025fp`

### Secciones del Panel

#### Dashboard (Inicio)
- Estadísticas: total registros, artículos, publicados, mensajes nuevos
- Últimos registros de profesionales
- Mensajes de contacto recientes

#### Blog
- **Crear artículo**: título, slug (auto-generado), resumen, contenido, imagen de portada
- **Subir imagen** desde computadora o pegar URL
- **Publicar/Despublicar** con un click
- **Editar** artículos existentes
- **Eliminar** artículos
- **Buscar** por título o slug

#### Registros de Profesionales
- Lista completa con todos los campos
- **Aprobar/Rechazar** registros pendientes
- **Revertir** a pendiente
- Buscar por nombre, email o cédula

#### Mensajes de Contacto
- Lista con indicador visual de no leídos (línea roja + punto)
- **Marcar leído/no leído**
- **Eliminar** mensajes
- Buscar por nombre, email o asunto

---

## 🎨 Diseño y Estilos

### Colores personalizados (definidos en globals.css)
```css
--color-fp-red: #DC2626;        /* Rojo del partido */
--color-fp-red-dark: #991B1B;
--color-fp-red-light: #FEE2E2;
--color-fp-green: #16A34A;       /* Verde del partido */
--color-fp-green-dark: #166534;
--color-fp-green-light: #DCFCE7;
--color-fp-gold: #D97706;        /* Dorado de acento */
--color-fp-gold-light: #FEF3C7;
```

### Uso en Tailwind: `bg-fp-red`, `text-fp-green`, `border-fp-gold`, etc.

### Secciones de la Landing Page
1. **Navbar** - Responsive con menú móvil, logo oficial, links de navegación
2. **Hero** - Banner con imagen, texto animado rotativo, estadísticas, CTAs
3. **Sobre Nosotros** - Imagen + descripción + valores institucionales
4. **Misión y Visión** - Dos tarjetas con estilos diferenciados
5. **Servicios** - 6 tarjetas de servicios con iconos
6. **Formulario de Registro** - Formulario completo de inscripción profesional
7. **Blog** - 3 tarjetas de artículos + modal de lectura completa
8. **Galería** - Grid de fotos con lightbox, efecto hover, categorías
9. **Eventos** - 4 tarjetas con fecha, ubicación y hora
10. **Testimonios** - Carrusel automático con 3 testimonios
11. **Contacto** - Formulario + info de contacto + redes sociales
12. **CTA** - Call to action final
13. **Footer** - 4 columnas con enlaces, servicios, contacto, redes sociales

### Reglas importantes de diseño
- **NO usar colores indigo o azul** (excepto los por defecto del sistema)
- **Mobile-first**: diseño responsivo obligatorio
- **Sticky footer** que empuje hacia abajo con contenido
- **shadcn/ui** para todos los componentes (no construir desde cero)
- **Framer Motion** para animaciones sutiles

---

## 🚀 Comandos de Desarrollo

```bash
# Levantar servidor de desarrollo (puerto 3000, obligatorio)
cd c:\Users\HOMEPC\Desktop\SAPGFP
npm run dev

# Sincronizar base de datos
npm run db:push

# Seedear datos iniciales (usando npx tsx)
npx tsx prisma/seed.ts
```

---

## 🔑 Variables de Entorno

Archivo `.env` (ya existe en el proyecto):
```env
DATABASE_URL="file:./db/custom.db"
ADMIN_PASSWORD="sapg2025fp"
```

---

## 📌 Reglas Críticas del Entorno

1. **Solo se puede usar el puerto 3000** para el dev server
2. **NO ejecutar `bun run build`** — solo usar dev mode
3. **`z-ai-web-dev-sdk` SOLO en el backend** — nunca en código del cliente
4. **Solo existe la ruta `/`** — no crear otras rutas en `src/app/`
5. **API requests siempre con ruta relativa** — NO incluir `http://localhost:3000` ni puertos directos
6. **Para otros servicios**: usar query param `XTransformPort` (ej: `fetch('/api/test?XTransformPort=3030')`)
7. **El servidor se cae periódicamente** — siempre verificar con `curl` antes de trabajar y reiniciar si es necesario
8. **Gateway Caddy** — solo se expone un puerto externamente, todo pasa por Caddy
9. **El cron job de webDevReview NO se pudo crear** (error 401) — el sistema lo ejecuta automáticamente de todos modos y puede interferir con el servidor

---

## 📊 Datos Iniciales (Seed)

El seed (`prisma/seed.ts`) crea:
- **4 artículos de blog** sobre eventos reales de la SAPG
- **3 testimonios** de profesionales ficticios
- **6 imágenes de galería** con categorías
- **4 eventos** próximos con fechas y ubicaciones

Para re-seedear:
```bash
# Eliminar datos (opcional) y re-seedear
cd c:\Users\HOMEPC\Desktop\SAPGFP
npx tsx prisma/seed.ts
```

---

## 🔄 Flujo de Trabajo para IA

### Para continuar desarrollo:

1. **Verificar servidor**: Abrir http://localhost:3000/
2. **Si está caído**: Iniciar con `npm run dev`
3. **Leer worklog.md** para entender progreso actual
4. **Hacer cambios** en los archivos necesarios
5. **Verificar lint**: `npm run lint`
6. **Esperar hot-reload** (Next.js detecta cambios automáticamente)
7. **Actualizar worklog.md** con lo realizado

### Para modificar la base de datos:

1. Editar `prisma/schema.prisma`
2. Ejecutar `npm run db:push`
3. Actualizar API routes si es necesario

### Para agregar nuevas secciones a la landing:

1. Crear el componente de sección en `page.tsx` (todo está en un solo archivo)
2. Agregar el link en `navLinks` (arreglo en page.tsx)
3. Agregar la sección en el `<main>` del componente `Home`

---

## ⚠️ Problemas Conocidos

1. **El servidor se cae periódicamente** sin dejar error en logs — probablemente por el proceso automático del sistema que hace "review and iteration"
2. **Las imágenes subidas por admin** se guardan en `public/images/uploads/` — pueden perderse si se limpia el directorio
3. **No hay autenticación robusta** — solo contraseña simple sin sessions/cookies
4. **El blog usa texto plano** — no hay editor rich-text (Markdown sería una mejora)
5. **No hay paginación** en las listas del admin (registros, mensajes)

---

## 📝 Historial de Desarrollo

Ver archivo `worklog.md` para el historial detallado de cada fase de desarrollo.

---

## 📞 Información de Contacto de la Institución

- **Nombre completo**: Secretaría de Asuntos Profesionales y Gremiales (SAPG)
- **Partido**: Fuerza del Pueblo (FP)
- **Presidente del partido**: Dr. Leonel Fernández Reyna
- **Secretario SAPG**: Freddy Pérez
- **Ciudad**: Santo Domingo, Distrito Nacional
- **País**: República Dominicana
- **Facebook**: @SAPGFPOficial
- **Instagram**: @fpcomunica
- **Web institucional**: https://www.sapgfuerzadelpueblo.org
