"use client";
import { Search, Plus, Image as ImageIcon, Video, FileText, CheckCircle, XCircle, Clock, Eye, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';

const initialPosts = [
  {
    id: 1,
    client_id: 1,
    client_name: 'Tech Corp',
    platform: 'LinkedIn',
    content: 'Excited to announce our new product launch! Join us this Friday for an exclusive webinar showcasing our latest innovations. #Innovation #TechLaunch',
    media_type: 'Image',
    media_url: 'https://via.placeholder.com/600x400',
    status: 'Pending',
    created_date: '2024-12-26',
    scheduled_date: '2024-12-28'
  },
  {
    id: 2,
    client_id: 1,
    client_name: 'Tech Corp',
    platform: 'Instagram',
    content: 'Behind the scenes at our office! Check out how our team collaborates. #WorkLife #TeamCulture',
    media_type: 'Video',
    status: 'Approved',
    created_date: '2024-12-25',
    approved_date: '2024-12-25',
    client_comment: 'Great content! Approved for posting.'
  }
];

export default function SocialMediaApproval() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [filterClient, setFilterClient] = useState('All');
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState(initialPosts);

  const [formData, setFormData] = useState({
    client_id: '',
    client_name: '',
    platform: '',
    content: '',
    media_type: 'Text',
    media_url: '',
    scheduled_date: '',
    status: 'Pending',
    client_comment: ''
  });

  const resetForm = () => setFormData({ client_id: '', client_name: '', platform: '', content: '', media_type: 'Text', media_url: '', scheduled_date: '', status: 'Pending', client_comment: '' });

  const openEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      client_id: post.client_id?.toString() || '',
      client_name: post.client_name || '',
      platform: post.platform || '',
      content: post.content || '',
      media_type: post.media_type || 'Text',
      media_url: post.media_url || '',
      scheduled_date: post.scheduled_date || '',
      status: post.status || 'Pending',
      client_comment: post.client_comment || ''
    });
    setIsEditOpen(true);
  };

  const handleAddPost = () => {
    const newId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost = {
      id: newId,
      client_id: parseInt(formData.client_id || '0') || 0,
      client_name: formData.client_name,
      platform: formData.platform,
      content: formData.content,
      media_type: formData.media_type,
      media_url: formData.media_url || undefined,
      status: formData.status || 'Pending',
      client_comment: formData.client_comment || undefined,
      created_date: new Date().toISOString().split('T')[0],
      scheduled_date: formData.scheduled_date || undefined
    };
    setPosts([newPost, ...posts]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditPost = () => {
    if (!selectedPost) return;
    setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, client_id: parseInt(formData.client_id || '0') || 0, client_name: formData.client_name, platform: formData.platform, content: formData.content, media_type: formData.media_type, media_url: formData.media_url || undefined, scheduled_date: formData.scheduled_date || undefined, status: formData.status || p.status, client_comment: formData.client_comment || p.client_comment } : p));
    setIsEditOpen(false);
    setSelectedPost(null);
    resetForm();
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;
    setPosts(posts.filter(p => p.id !== selectedPost.id));
    setIsDeleteOpen(false);
    setSelectedPost(null);
  };

  const uniqueClients = Array.from(new Set(posts.map(p => p.client_name)));
  const uniquePlatforms = Array.from(new Set(posts.map(p => p.platform)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || post.platform === filterPlatform;
    const matchesClient = filterClient === 'All' || post.client_name === filterClient;
    return matchesSearch && matchesStatus && matchesPlatform && matchesClient;
  });

  const getMediaIcon = (t) => {
    if (t === 'Image') return <ImageIcon className="w-5 h-5 text-blue-600" />;
    if (t === 'Video') return <Video className="w-5 h-5 text-purple-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getBadge = (s) => {
    if (s === 'Approved') return <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Approved</span>;
    if (s === 'Rejected') return <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">Rejected</span>;
    return <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">Pending</span>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Social Media Posts</h1>
          <p className="text-sm text-gray-600">Create and manage social media posts for clients</p>
        </div>
        <Button onClick={() => { resetForm(); setIsAddOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">Create Post</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <Input className="pl-10 w-full" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </Select>

        <Select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
          <option>All</option>
          {uniquePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
        </Select>

        <Select value={filterClient} onChange={(e) => setFilterClient(e.target.value)}>
          <option>All</option>
          {uniqueClients.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article key={post.id} className="p-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700 hover:shadow-lg transition">
            <header className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getMediaIcon(post.media_type)}
                <span className="px-2 py-1 rounded text-sm bg-gray-700 text-gray-100">
                  {post.platform}
                </span>
              </div>
              <div className="ml-2">{getBadge(post.status)}</div>
            </header>

            <div className="mt-3">
              <p className="font-semibold text-white">{post.client_name}</p>
              <p className="text-sm text-gray-300">Created: {post.created_date}</p>
            </div>

            <div className="mt-3 border border-gray-700 rounded p-3 bg-gray-900">
              <p className="line-clamp-3 text-gray-100">{post.content}</p>
            </div>

            <div className="mt-3 flex gap-2">
              <Button onClick={() => { setSelectedPost(post); setIsViewOpen(true); }} className="flex-1 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 rounded px-3 py-2 text-gray-100">View</Button>
              <Button onClick={() => openEdit(post)} className="px-3 py-2 border border-gray-600 rounded text-gray-100 hover:bg-gray-700"><Edit className="w-4 h-4" /></Button>
              <Button onClick={() => { setSelectedPost(post); setIsDeleteOpen(true); }} className="px-3 py-2 border border-transparent rounded bg-red-600 hover:bg-red-700 text-white"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </article>
        ))}
      </div>

      {/* View Post Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-3xl bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription className="text-gray-400">View full details of the social media post</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="font-semibold">{selectedPost.client_name} — <span className="text-sm text-gray-300">{selectedPost.platform}</span></p>
                <p className="text-sm text-gray-300">Media: {selectedPost.media_type} {selectedPost.media_url ? <a className="underline text-blue-300" href={selectedPost.media_url} target="_blank" rel="noreferrer">view</a> : null}</p>
                <p className="text-sm text-gray-300">Status: {selectedPost.status}</p>
                <p className="text-sm text-gray-300">Created: {selectedPost.created_date}{selectedPost.approved_date ? ` • Approved: ${selectedPost.approved_date}` : ''}</p>
                {selectedPost.scheduled_date ? <p className="text-sm text-gray-300">Scheduled: {selectedPost.scheduled_date}</p> : null}
                {selectedPost.client_comment ? <p className="text-sm text-gray-300">Comment: {selectedPost.client_comment}</p> : null}
              </div>
              <div className="border border-gray-700 rounded p-3 bg-gray-900">
                <p className="text-gray-100">{selectedPost.content}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="px-4 py-2 border border-gray-600 text-white bg-transparent hover:bg-gray-700">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-3xl bg-gray-800 text-white border-gray-700 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription className="text-gray-400">Fill in the details to create a new social media post</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="text-gray-200">Client ID</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} />
            <Label className="text-gray-200">Client Name</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} />
            <Label className="text-gray-200">Platform</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Twitter</option>
            </Select>
            <Label className="text-gray-200">Media Type</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_type} onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}>
              <option>Text</option>
              <option>Image</option>
              <option>Video</option>
            </Select>
            <Label className="text-gray-200">Media URL</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_url} onChange={(e) => setFormData({ ...formData, media_url: e.target.value })} />
            <Label className="text-gray-200">Scheduled Date</Label>
            <Input type="date" className="w-full bg-gray-900 text-white border-gray-700" value={formData.scheduled_date} onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })} />
            <Label className="text-gray-200">Content</Label>
            <Textarea rows={6} className="w-full bg-gray-900 text-white border-gray-700" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="px-4 py-2 border border-gray-600 text-white bg-transparent hover:bg-gray-700">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddPost} className="px-4 py-2 bg-blue-600 text-white">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-3xl bg-gray-800 text-white border-gray-700 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription className="text-gray-400">Modify the post details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="text-gray-200">Client ID</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} />
            <Label className="text-gray-200">Client Name</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} />
            <Label className="text-gray-200">Platform</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Twitter</option>
            </Select>
            <Label className="text-gray-200">Media Type</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_type} onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}>
              <option>Text</option>
              <option>Image</option>
              <option>Video</option>
            </Select>
            <Label className="text-gray-200">Media URL</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_url} onChange={(e) => setFormData({ ...formData, media_url: e.target.value })} />
            <Label className="text-gray-200">Scheduled Date</Label>
            <Input type="date" className="w-full bg-gray-900 text-white border-gray-700" value={formData.scheduled_date} onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })} />
            <Label className="text-gray-200">Status</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.status || (selectedPost?.status || 'Pending')} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </Select>
            <Label className="text-gray-200">Client Comment</Label>
            <Textarea rows={4} className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_comment || ''} onChange={(e) => setFormData({ ...formData, client_comment: e.target.value })} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => { setSelectedPost(null); resetForm(); }} className="px-4 py-2 border border-gray-600 text-white bg-transparent hover:bg-gray-700">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditPost} className="px-4 py-2 bg-green-600 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="text-gray-400">This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <p className="text-gray-100">Are you sure you want to delete this post by <strong>{selectedPost.client_name}</strong> on <strong>{selectedPost.platform}</strong>?</p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setSelectedPost(null)} className="px-4 py-2 border border-gray-600 text-white bg-transparent hover:bg-gray-700">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDeletePost} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
