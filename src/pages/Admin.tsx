import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewsArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
  published: boolean;
  created_at: string;
}

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  
  // Temporarily disabled
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    content: '',
    published: false
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      navigate('/');
      toast({ title: 'Access denied', variant: 'destructive' });
    }
  }, [adminLoading, isAdmin, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchNews();
    }
  }, [isAdmin]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error loading news', variant: 'destructive' });
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setFormData({ title: '', preview: '', content: '', published: false });
    setIsDialogOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      preview: article.preview,
      content: article.content,
      published: article.published
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;

    const { error } = await supabase.from('news').delete().eq('id', id);
    
    if (error) {
      toast({ title: 'Error deleting', variant: 'destructive' });
    } else {
      toast({ title: 'Deleted' });
      fetchNews();
    }
  };

  const handleTogglePublished = async (article: NewsArticle) => {
    const { error } = await supabase
      .from('news')
      .update({ published: !article.published })
      .eq('id', article.id);

    if (error) {
      toast({ title: 'Error updating', variant: 'destructive' });
    } else {
      fetchNews();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.preview.trim() || !formData.content.trim()) {
      toast({ title: 'Fill all fields', variant: 'destructive' });
      return;
    }

    if (editingArticle) {
      const { error } = await supabase
        .from('news')
        .update(formData)
        .eq('id', editingArticle.id);

      if (error) {
        toast({ title: 'Error updating', variant: 'destructive' });
      } else {
        toast({ title: 'Updated' });
        setIsDialogOpen(false);
        fetchNews();
      }
    } else {
      const { error } = await supabase.from('news').insert({
        ...formData,
        author_id: user?.id
      });

      if (error) {
        toast({ title: 'Error creating', variant: 'destructive' });
      } else {
        toast({ title: 'Created' });
        setIsDialogOpen(false);
        fetchNews();
      }
    }
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="label">Loading...</span>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:opacity-70">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-light tracking-wide">ADMIN / NEWS</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-[10px] uppercase tracking-[0.15em]"
          >
            <Plus className="w-3 h-3" />
            New
          </button>
        </div>

        <div className="space-y-4">
          {news.length === 0 ? (
            <p className="body text-center py-12">No articles yet</p>
          ) : (
            news.map((article) => (
              <div
                key={article.id}
                className="p-4 border border-border space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`label ${article.published ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="label">
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm">{article.title}</h3>
                    <p className="mt-1 body line-clamp-1">{article.preview}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePublished(article)}
                      className="p-2 hover:opacity-70"
                      title={article.published ? 'Unpublish' : 'Publish'}
                    >
                      {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2 hover:opacity-70"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 hover:opacity-70 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingArticle ? 'Edit Article' : 'New Article'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-border focus:border-foreground outline-none text-sm"
                maxLength={200}
              />
            </div>
            
            <div>
              <label className="label">Preview</label>
              <textarea
                value={formData.preview}
                onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-border focus:border-foreground outline-none text-sm resize-none"
                rows={2}
                maxLength={500}
              />
            </div>
            
            <div>
              <label className="label">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-border focus:border-foreground outline-none text-sm resize-none"
                rows={6}
                maxLength={5000}
              />
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="label">Publish immediately</span>
            </label>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] border border-border hover:border-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background text-[10px] uppercase tracking-[0.15em]"
              >
                {editingArticle ? 'Save' : 'Create'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
