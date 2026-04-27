"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  LogOut,
  BarChart3,
  FileText,
  Users,
  Mail,
  Camera,
  Upload,
  Search,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// ============================================================
// Types
// ============================================================
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  cedula: string;
  profession: string;
  specialty: string | null;
  institution: string | null;
  city: string;
  province: string;
  motivation: string | null;
  status: string;
  createdAt: string;
}

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

// ============================================================
// Admin Panel Component
// ============================================================
export function AdminPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Data
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);

  // Loading states
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  // Search
  const [searchPosts, setSearchPosts] = useState("");
  const [searchRegs, setSearchRegs] = useState("");
  const [searchMsgs, setSearchMsgs] = useState("");

  // Blog editor
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [editorData, setEditorData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    published: false,
  });
  const [savingPost, setSavingPost] = useState(false);

  // Upload
  const [uploading, setUploading] = useState(false);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        loadAllData();
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setLoginLoading(false);
    }
  };

  const loadAllData = useCallback(() => {
    loadPosts();
    loadRegistrations();
    loadMessages();
  }, []);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      if (data.success) setPosts(data.posts || []);
    } catch { /* silent */ }
    setLoadingPosts(false);
  };

  const loadRegistrations = async () => {
    setLoadingRegs(true);
    try {
      const res = await fetch("/api/registro");
      const data = await res.json();
      if (data.success) setRegistrations(data.registrations || []);
    } catch { /* silent */ }
    setLoadingRegs(false);
  };

  const loadMessages = async () => {
    setLoadingMsgs(true);
    try {
      const res = await fetch("/api/contacto");
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch { /* silent */ }
    setLoadingMsgs(false);
  };

  // Blog CRUD
  const openNewPost = () => {
    setEditingPost(null);
    setEditorData({ title: "", slug: "", excerpt: "", content: "", coverImage: "", published: false });
    setShowPostEditor(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setEditorData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImage: post.coverImage || "",
      published: post.published,
    });
    setShowPostEditor(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñü]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const savePost = async () => {
    if (!editorData.title || !editorData.slug || !editorData.content) {
      toast({ title: "Error", description: "Título, slug y contenido son obligatorios.", variant: "destructive" });
      return;
    }
    setSavingPost(true);
    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editorData),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: editingPost ? "Artículo actualizado" : "Artículo creado",
          description: `"${editorData.title}" se guardó correctamente.`,
        });
        setShowPostEditor(false);
        loadPosts();
      } else {
        toast({ title: "Error", description: data.error || "No se pudo guardar el artículo.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", description: "No se pudo conectar con el servidor. Intenta de nuevo.", variant: "destructive" });
    } finally {
      setSavingPost(false);
    }
  };

  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const deletePost = async (id: string) => {
    const postToDelete = posts.find(p => p.id === id);
    const postTitle = postToDelete?.title || "este artículo";
    if (!confirm(`¿Estás seguro de eliminar "${postTitle}"?`)) return;
    setDeletingPostId(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Artículo eliminado", description: `"${postTitle}" fue eliminado correctamente.` });
        loadPosts();
      } else {
        toast({ title: "Error al eliminar", description: data.error || "No se pudo eliminar el artículo.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", description: "No se pudo conectar con el servidor.", variant: "destructive" });
    } finally {
      setDeletingPostId(null);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const newPublished = !post.published;
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newPublished }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: newPublished ? "Artículo publicado" : "Artículo despublicado",
          description: `"${post.title}" ahora está ${newPublished ? "publicado" : "como borrador"}.`,
        });
        loadPosts();
      } else {
        toast({ title: "Error", description: data.error || "No se pudo cambiar el estado.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", description: "No se pudo conectar con el servidor.", variant: "destructive" });
    }
  };

  // Upload image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setEditorData({ ...editorData, coverImage: data.url });
        toast({ title: "Imagen subida", description: data.url });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error al subir", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  // Registration status update
  const updateRegStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/registro/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      loadRegistrations();
    } catch { /* silent */ }
  };

  // Message read/delete
  const toggleMsgRead = async (id: string, read: boolean) => {
    try {
      await fetch(`/api/contacto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      loadMessages();
    } catch { /* silent */ }
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    try {
      await fetch(`/api/contacto/${id}`, { method: "DELETE" });
      loadMessages();
    } catch { /* silent */ }
  };

  // Stats
  const totalRegistrations = registrations.length;
  const totalPosts = posts.length;
  const totalMessages = messages.filter((m) => !m.read).length;
  const totalPublishedPosts = posts.filter((p) => p.published).length;

  // Filtered lists
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchPosts.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchPosts.toLowerCase())
  );
  const filteredRegs = registrations.filter(
    (r) =>
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchRegs.toLowerCase()) ||
      r.email.toLowerCase().includes(searchRegs.toLowerCase()) ||
      r.cedula.includes(searchRegs)
  );
  const filteredMsgs = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchMsgs.toLowerCase()) ||
      m.email.toLowerCase().includes(searchMsgs.toLowerCase()) ||
      (m.subject || "").toLowerCase().includes(searchMsgs.toLowerCase())
  );

  // ============================================================
  // LOGIN SCREEN
  // ============================================================
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fp-red to-fp-green flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Panel de Administración</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">SAPG Fuerza del Pueblo</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-pass">Contraseña</Label>
              <Input
                id="admin-pass"
                type="password"
                placeholder="Ingresa la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <p className="text-xs text-muted-foreground">
                Contraseña por defecto: <code className="bg-muted px-1 rounded">sapg2025fp</code>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleLogin}
                disabled={loginLoading || !password}
                className="flex-1 bg-fp-red hover:bg-fp-red-dark text-white"
              >
                {loginLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Ingresar"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================================
  // ADMIN DASHBOARD
  // ============================================================
  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fp-red to-fp-green flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-bold text-lg hidden sm:block">Admin SAPG</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={loadAllData}>
            Actualizar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-fp-red border-fp-red hover:bg-fp-red/5"
            onClick={() => {
              setAuthenticated(false);
              setPassword("");
              onClose();
            }}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Salir
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
                <BarChart3 className="w-4 h-4 mr-1 hidden sm:block" />
                Inicio
              </TabsTrigger>
              <TabsTrigger value="blog" className="text-xs sm:text-sm">
                <FileText className="w-4 h-4 mr-1 hidden sm:block" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="registrations" className="text-xs sm:text-sm">
                <Users className="w-4 h-4 mr-1 hidden sm:block" />
                Registros
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs sm:text-sm">
                <Mail className="w-4 h-4 mr-1 hidden sm:block" />
                Mensajes
              </TabsTrigger>
            </TabsList>

            {/* ===================== DASHBOARD ===================== */}
            <TabsContent value="dashboard">
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Registros", value: totalRegistrations, icon: <Users className="w-6 h-6" />, color: "fp-red" },
                  { label: "Artículos", value: totalPosts, icon: <FileText className="w-6 h-6" />, color: "fp-green" },
                  { label: "Publicados", value: totalPublishedPosts, icon: <CheckCircle2 className="w-6 h-6" />, color: "fp-gold" },
                  { label: "Mensajes Nuevos", value: totalMessages, icon: <Mail className="w-6 h-6" />, color: "fp-red" },
                ].map((stat, i) => (
                  <Card key={i}>
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Últimos Registros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {registrations.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No hay registros aún.</p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {registrations.slice(0, 5).map((r) => (
                          <div key={r.id} className="flex items-center justify-between text-sm">
                            <div>
                              <p className="font-medium">{r.firstName} {r.lastName}</p>
                              <p className="text-muted-foreground text-xs">{r.profession} — {r.email}</p>
                            </div>
                            <Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"} className="text-xs">
                              {r.status === "approved" ? "Aprobado" : r.status === "rejected" ? "Rechazado" : "Pendiente"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Mensajes Recientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messages.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No hay mensajes aún.</p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {messages.slice(0, 5).map((m) => (
                          <div key={m.id} className="flex items-start justify-between text-sm gap-2">
                            <div className="min-w-0">
                              <p className="font-medium flex items-center gap-1.5">
                                {!m.read && <span className="w-2 h-2 rounded-full bg-fp-red flex-shrink-0" />}
                                {m.name}
                              </p>
                              <p className="text-muted-foreground text-xs truncate">{m.subject || m.message}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(m.createdAt).toLocaleDateString("es-DO")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ===================== BLOG ===================== */}
            <TabsContent value="blog">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Artículos del Blog</h2>
                <Button onClick={openNewPost} className="bg-fp-red hover:bg-fp-red-dark text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Artículo
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar artículos..."
                    value={searchPosts}
                    onChange={(e) => setSearchPosts(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loadingPosts ? (
                <div className="text-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        {post.coverImage && (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full sm:w-20 h-24 sm:h-14 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{post.title}</h3>
                            <Badge variant={post.published ? "default" : "secondary"} className="text-xs flex-shrink-0">
                              {post.published ? "Publicado" : "Borrador"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            /{post.slug}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("es-DO", { year: "numeric", month: "long", day: "numeric" })
                              : "Sin publicar"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); togglePublish(post); }}
                            title={post.published ? "Despublicar" : "Publicar"}
                            className="hover:bg-fp-green/10 hover:text-fp-green"
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); openEditPost(post); }}
                            title="Editar"
                            className="hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-red-50"
                            onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                            title="Eliminar"
                            disabled={deletingPostId === post.id}
                          >
                            {deletingPostId === post.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredPosts.length === 0 && !loadingPosts && (
                    <p className="text-center text-muted-foreground py-10">No se encontraron artículos.</p>
                  )}
                </div>
              )}
            </TabsContent>

            {/* ===================== REGISTRATIONS ===================== */}
            <TabsContent value="registrations">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Registros de Profesionales</h2>
                <Badge variant="outline" className="w-fit text-sm">{totalRegistrations} totales</Badge>
              </div>

              <div className="mb-4">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email o cédula..."
                    value={searchRegs}
                    onChange={(e) => setSearchRegs(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loadingRegs ? (
                <div className="text-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRegs.map((reg) => (
                    <Card key={reg.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{reg.firstName} {reg.lastName}</h3>
                              <Badge
                                variant={
                                  reg.status === "approved" ? "default" : reg.status === "rejected" ? "destructive" : "secondary"
                                }
                                className="text-xs"
                              >
                                {reg.status === "approved" ? "Aprobado" : reg.status === "rejected" ? "Rechazado" : "Pendiente"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
                              <p><span className="font-medium text-foreground">Profesión:</span> {reg.profession}</p>
                              <p><span className="font-medium text-foreground">Cédula:</span> {reg.cedula}</p>
                              <p><span className="font-medium text-foreground">Email:</span> {reg.email}</p>
                              <p><span className="font-medium text-foreground">Teléfono:</span> {reg.phone || "N/A"}</p>
                              <p><span className="font-medium text-foreground">Ciudad:</span> {reg.city}, {reg.province}</p>
                              <p><span className="font-medium text-foreground">Fecha:</span> {new Date(reg.createdAt).toLocaleDateString("es-DO")}</p>
                            </div>
                            {reg.motivation && (
                              <p className="text-sm mt-2 italic text-muted-foreground">&ldquo;{reg.motivation}&rdquo;</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {reg.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-fp-green hover:bg-fp-green-dark text-white text-xs" onClick={() => updateRegStatus(reg.id, "approved")}>
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Aprobar
                                </Button>
                                <Button size="sm" variant="destructive" className="text-xs" onClick={() => updateRegStatus(reg.id, "rejected")}>
                                  <X className="w-3 h-3 mr-1" />
                                  Rechazar
                                </Button>
                              </>
                            )}
                            {reg.status !== "pending" && (
                              <Button size="sm" variant="outline" className="text-xs" onClick={() => updateRegStatus(reg.id, "pending")}>
                                <Clock className="w-3 h-3 mr-1" />
                                Pendiente
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredRegs.length === 0 && !loadingRegs && (
                    <p className="text-center text-muted-foreground py-10">No se encontraron registros.</p>
                  )}
                </div>
              )}
            </TabsContent>

            {/* ===================== MESSAGES ===================== */}
            <TabsContent value="messages">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Mensajes de Contacto</h2>
                <Badge variant="outline" className="w-fit text-sm">{totalMessages} sin leer</Badge>
              </div>

              <div className="mb-4">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar mensajes..."
                    value={searchMsgs}
                    onChange={(e) => setSearchMsgs(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loadingMsgs ? (
                <div className="text-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMsgs.map((msg) => (
                    <Card key={msg.id} className={!msg.read ? "border-l-4 border-l-fp-red" : ""}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {!msg.read && <span className="w-2.5 h-2.5 rounded-full bg-fp-red flex-shrink-0" />}
                              <h3 className={`font-semibold ${!msg.read ? "" : "text-muted-foreground"}`}>{msg.name}</h3>
                              {msg.subject && <Badge variant="outline" className="text-xs">{msg.subject}</Badge>}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span>{msg.email}</span>
                              {msg.phone && <span> · {msg.phone}</span>}
                              <span> · {new Date(msg.createdAt).toLocaleDateString("es-DO")} {new Date(msg.createdAt).toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button size="icon" variant="ghost" onClick={() => toggleMsgRead(msg.id, msg.read)} title={msg.read ? "Marcar no leído" : "Marcar leído"}>
                              {msg.read ? <Mail className="w-4 h-4" /> : <Mail className="w-4 h-4 text-fp-red" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteMsg(msg.id)} title="Eliminar">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredMsgs.length === 0 && !loadingMsgs && (
                    <p className="text-center text-muted-foreground py-10">No se encontraron mensajes.</p>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ===================== POST EDITOR DIALOG ===================== */}
      <Dialog open={showPostEditor} onOpenChange={setShowPostEditor}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Editar Artículo" : "Nuevo Artículo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título *</Label>
              <Input
                value={editorData.title}
                onChange={(e) => {
                  setEditorData({
                    ...editorData,
                    title: e.target.value,
                    slug: editingPost ? editorData.slug : generateSlug(e.target.value),
                  });
                }}
                placeholder="Título del artículo"
              />
            </div>

            <div className="space-y-2">
              <Label>URL (Slug) *</Label>
              <Input
                value={editorData.slug}
                onChange={(e) => setEditorData({ ...editorData, slug: e.target.value })}
                placeholder="url-del-articulo"
              />
            </div>

            <div className="space-y-2">
              <Label>Resumen</Label>
              <Textarea
                value={editorData.excerpt}
                onChange={(e) => setEditorData({ ...editorData, excerpt: e.target.value })}
                placeholder="Breve resumen del artículo..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Contenido *</Label>
              <Textarea
                value={editorData.content}
                onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
                placeholder="Escribe el contenido completo del artículo aquí..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen de Portada</Label>
              <div className="flex gap-2">
                <Input
                  value={editorData.coverImage}
                  onChange={(e) => setEditorData({ ...editorData, coverImage: e.target.value })}
                  placeholder="URL de la imagen o sube una"
                />
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" size="icon" asChild disabled={uploading}>
                    <span>
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    </span>
                  </Button>
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              </div>
              {editorData.coverImage && (
                <img
                  src={editorData.coverImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Estado:</Label>
                <Select
                  value={editorData.published ? "published" : "draft"}
                  onValueChange={(v) => setEditorData({ ...editorData, published: v === "published" })}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPostEditor(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={savePost}
                  disabled={savingPost}
                  className="bg-fp-red hover:bg-fp-red-dark text-white"
                >
                  {savingPost ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      {editingPost ? "Actualizar" : "Publicar"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
