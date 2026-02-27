

"use client";
import { Search, Plus, Image as ImageIcon, Video, FileText, CheckCircle, XCircle, Clock, Eye, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchClients, createPost, updatePost, deletePost } from '@/redux/features/socialMediaSlice';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';

export default function SocialMediaApproval() {
  const dispatch = useDispatch();
  const { list: posts, clients, loading, error } = useSelector((state) => state.socialMedia);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    client_id: '',
    platform: 'LINKEDIN',
    content: '',
    media_type: 'TEXT',
    media_url: '',
    schedule_date: '',
  });

  // Fetch posts and clients on mount
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchClients());
  }, [dispatch]);

  // Helper to get client name from clients list
  const getClientName = (clientId) => {
    const client = (clients || []).find(c => c.client_id === clientId);
    return client ? client.client_name : `Client #${clientId}`;
  };

  const resetForm = () => setFormData({
    client_id: '',
    platform: 'LINKEDIN',
    content: '',
    media_type: 'TEXT',
    media_url: '',
    schedule_date: '',
  });

  const openEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      client_id: post.client_id?.toString() || '',
      platform: post.platform || 'LINKEDIN',
      content: post.content || '',
      media_type: post.media_type || 'TEXT',
      media_url: post.media_url || '',
      schedule_date: post.schedule_date ? new Date(post.schedule_date).toISOString().slice(0, 16) : '',
    });
    setIsEditOpen(true);
  };

  const handleAddPost = async () => {
    await dispatch(createPost({
      client_id: parseInt(formData.client_id) || 0,
      platform: formData.platform,
      media_type: formData.media_type,
      media_url: formData.media_url || null,
      content: formData.content,
      schedule_date: formData.schedule_date || null,
    }));
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditPost = async () => {
    if (!selectedPost) return;
    await dispatch(updatePost({
      id: selectedPost.post_id,
      postData: {
        client_id: parseInt(formData.client_id) || 0,
        platform: formData.platform,
        media_type: formData.media_type,
        media_url: formData.media_url || null,
        content: formData.content,
        schedule_date: formData.schedule_date || null,
      }
    }));
    setIsEditOpen(false);
    setSelectedPost(null);
    resetForm();
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    await dispatch(deletePost(selectedPost.post_id));
    setIsDeleteOpen(false);
    setSelectedPost(null);
  };

  // Helper to format platform for display
  const displayPlatform = (p) => {
    const map = { LINKEDIN: 'LinkedIn', FACEBOOK: 'Facebook', INSTAGRAM: 'Instagram', TWITTER: 'Twitter' };
    return map[p] || p;
  };

  // Helper to format status for display
  const displayStatus = (s) => {
    const map = { PENDING: 'Pending', APPROVED: 'Approved', REJECTED: 'Rejected' };
    return map[s] || s;
  };

  // Helper to format media type for display
  const displayMediaType = (t) => {
    const map = { TEXT: 'Text', IMAGE: 'Image', VIDEO: 'Video' };
    return map[t] || t;
  };

  const uniquePlatforms = Array.from(new Set((posts || []).map(p => p.platform)));

  const filteredPosts = (posts || []).filter(post => {
    const matchesSearch = (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || post.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getMediaIcon = (t) => {
    if (t === 'IMAGE') return <ImageIcon className="w-5 h-5 text-blue-600" />;
    if (t === 'VIDEO') return <Video className="w-5 h-5 text-purple-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getBadge = (s) => {
    if (s === 'APPROVED') return <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Approved</span>;
    if (s === 'REJECTED') return <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">Rejected</span>;
    return <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">Pending</span>;
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
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

      {/* Error Banner */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <Input className="pl-10 w-full" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </Select>

        <Select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
          <option value="All">All Platforms</option>
          {uniquePlatforms.map(p => <option key={p} value={p}>{displayPlatform(p)}</option>)}
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article key={post.post_id} className="p-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700 hover:shadow-lg transition">
              <header className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getMediaIcon(post.media_type)}
                  <span className="px-2 py-1 rounded text-sm bg-gray-700 text-gray-100">
                    {displayPlatform(post.platform)}
                  </span>
                </div>
                <div className="ml-2">{getBadge(post.status)}</div>
              </header>

              <div className="mt-3">
                <p className="font-semibold text-white">{post.client_name || getClientName(post.client_id)}</p>
                <p className="text-sm text-gray-300">Created: {formatDate(post.created_date)}</p>
                {post.schedule_date && <p className="text-sm text-gray-300">Scheduled: {formatDate(post.schedule_date)}</p>}
              </div>

              <div className="mt-3 border border-gray-700 rounded p-3 bg-gray-900">
                <p className="line-clamp-3 text-gray-100">{post.content}</p>
              </div>

              {post.rejected_reason && (
                <div className="mt-2 text-sm text-gray-300">
                  <strong>Reason:</strong> {post.rejected_reason}
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <Button onClick={() => { setSelectedPost(post); setIsViewOpen(true); }} className="flex-1 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 rounded px-3 py-2 text-gray-100">View</Button>
                <Button onClick={() => openEdit(post)} className="px-3 py-2 border border-gray-600 rounded text-gray-100 hover:bg-gray-700"><Edit className="w-4 h-4" /></Button>
                <Button onClick={() => { setSelectedPost(post); setIsDeleteOpen(true); }} className="px-3 py-2 border border-transparent rounded bg-red-600 hover:bg-red-700 text-white"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && !loading && (
            <div className="col-span-full text-center py-12 text-gray-400">
              No posts found.
            </div>
          )}
        </div>
      )}

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
                <p className="font-semibold">{selectedPost.client_name || getClientName(selectedPost.client_id)} — <span className="text-sm text-gray-300">{displayPlatform(selectedPost.platform)}</span></p>
                <p className="text-sm text-gray-300">Media: {displayMediaType(selectedPost.media_type)} {selectedPost.media_url ? <a className="underline text-blue-300" href={selectedPost.media_url} target="_blank" rel="noreferrer">view</a> : null}</p>
                <p className="text-sm text-gray-300">Status: {displayStatus(selectedPost.status)}</p>
                <p className="text-sm text-gray-300">Created: {formatDate(selectedPost.created_date)}</p>
                {selectedPost.schedule_date ? <p className="text-sm text-gray-300">Scheduled: {formatDate(selectedPost.schedule_date)}</p> : null}
                {selectedPost.rejected_reason ? <p className="text-sm text-gray-300">Reason: {selectedPost.rejected_reason}</p> : null}
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
            <Label className="text-gray-200">Client</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}>
              <option value="">Select Client</option>
              {(clients || []).map(c => <option key={c.client_id} value={c.client_id}>{c.client_name}</option>)}
            </Select>
            <Label className="text-gray-200">Platform</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
              <option value="LINKEDIN">LinkedIn</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="FACEBOOK">Facebook</option>
              <option value="TWITTER">Twitter</option>
            </Select>
            <Label className="text-gray-200">Media Type</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_type} onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}>
              <option value="TEXT">Text</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </Select>
            <Label className="text-gray-200">Media URL</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_url} onChange={(e) => setFormData({ ...formData, media_url: e.target.value })} />
            <Label className="text-gray-200">Scheduled Date</Label>
            <Input type="datetime-local" className="w-full bg-gray-900 text-white border-gray-700" value={formData.schedule_date} onChange={(e) => setFormData({ ...formData, schedule_date: e.target.value })} />
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
            <Label className="text-gray-200">Client</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}>
              <option value="">Select Client</option>
              {(clients || []).map(c => <option key={c.client_id} value={c.client_id}>{c.client_name}</option>)}
            </Select>
            <Label className="text-gray-200">Platform</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
              <option value="LINKEDIN">LinkedIn</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="FACEBOOK">Facebook</option>
              <option value="TWITTER">Twitter</option>
            </Select>
            <Label className="text-gray-200">Media Type</Label>
            <Select className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_type} onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}>
              <option value="TEXT">Text</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </Select>
            <Label className="text-gray-200">Media URL</Label>
            <Input className="w-full bg-gray-900 text-white border-gray-700" value={formData.media_url} onChange={(e) => setFormData({ ...formData, media_url: e.target.value })} />
            <Label className="text-gray-200">Scheduled Date</Label>
            <Input type="datetime-local" className="w-full bg-gray-900 text-white border-gray-700" value={formData.schedule_date} onChange={(e) => setFormData({ ...formData, schedule_date: e.target.value })} />
            <Label className="text-gray-200">Content</Label>
            <Textarea rows={6} className="w-full bg-gray-900 text-white border-gray-700" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
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
            <p className="text-gray-100">Are you sure you want to delete this <strong>{displayPlatform(selectedPost.platform)}</strong> post for client <strong>{selectedPost.client_name || getClientName(selectedPost.client_id)}</strong>?</p>
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
