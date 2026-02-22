"use client";
import { Search, Image as ImageIcon, Video, FileText, CheckCircle, XCircle, Clock, Eye, MessageSquare } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { fetchClientPosts, approvePost, rejectPost } from '@/store/slices/socialMediaPostsSlice';

// Helper: DB stores UPPERCASE enums, UI uses Title Case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function ClientPostApproval() {
  const dispatch = useDispatch();
  const { posts: rawPosts, loading, error, actionLoading } = useSelector((state) => state.socialMediaPosts);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [clientComment, setClientComment] = useState('');

  // Fetch posts on mount
  useEffect(() => {
    dispatch(fetchClientPosts());
  }, [dispatch]);

  // Normalize DB enums to title case for display
  const posts = useMemo(() =>
    rawPosts.map(p => ({
      ...p,
      id: p.post_id,
      platform: toTitleCase(p.platform),
      media_type: toTitleCase(p.media_type),
      status: toTitleCase(p.status),
      created_date: p.created_date ? new Date(p.created_date).toISOString().split('T')[0] : '',
      scheduled_date: p.schedule_date ? new Date(p.schedule_date).toISOString().split('T')[0] : '',
    }))
    , [rawPosts]);

  // Get unique platforms for filters
  const uniquePlatforms = Array.from(new Set(posts.map(p => p.platform)));

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || post.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Count posts by status
  const statusCounts = useMemo(() => ({
    pending: posts.filter(p => p.status === 'Pending').length,
    approved: posts.filter(p => p.status === 'Approved').length,
    rejected: posts.filter(p => p.status === 'Rejected').length
  }), [posts]);

  const handleApprovePost = async () => {
    if (selectedPost) {
      await dispatch(approvePost(selectedPost.post_id));
      setIsApproveDialogOpen(false);
      setSelectedPost(null);
      setClientComment('');
    }
  };

  const handleRejectPost = async () => {
    if (selectedPost) {
      await dispatch(rejectPost({ postId: selectedPost.post_id, rejected_reason: clientComment }));
      setIsRejectDialogOpen(false);
      setSelectedPost(null);
      setClientComment('');
    }
  };

  const getMediaIcon = (mediaType) => {
    switch (mediaType) {
      case 'Image': return <ImageIcon className="w-5 h-5 text-blue-600" />;
      case 'Video': return <Video className="w-5 h-5 text-purple-600" />;
      case 'Text': return <FileText className="w-5 h-5 text-gray-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Approved</span>;
      case 'Rejected': return <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">Rejected</span>;
      case 'Pending': return <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">Pending Review</span>;
      default: return null;
    }
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Linkedin': 'bg-blue-100 text-blue-700',
      'Instagram': 'bg-pink-100 text-pink-700',
      'Facebook': 'bg-blue-100 text-blue-800',
      'Twitter': 'bg-sky-100 text-sky-700',
      'Youtube': 'bg-red-100 text-red-700',
      'Gmb': 'bg-green-100 text-green-700'
    };
    return colors[platform] || 'bg-gray-100 text-gray-700';
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-white mb-2">Post Approval</h1>
          <p className="text-gray-400">Review and approve posts created for your social media accounts</p>
        </div>
        <div className="p-12 bg-gray-800 rounded-md shadow text-center">
          <p className="text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-white mb-2">Post Approval</h1>
          <p className="text-gray-400">Review and approve posts created for your social media accounts</p>
        </div>
        <div className="p-12 bg-gray-800 rounded-md shadow text-center">
          <p className="text-red-400">{error}</p>
          <Button className="mt-4" onClick={() => dispatch(fetchClientPosts())}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Post Approval</h1>
        <p className="text-gray-400">Review and approve posts created for your social media accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Pending Review</p>
              <p className="text-white">{statusCounts.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Approved</p>
              <p className="text-white">{statusCounts.approved}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Rejected</p>
              <p className="text-white">{statusCounts.rejected}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-gray-800 rounded-md shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full rounded-md border px-3 py-2" />
          </div>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-md border px-3 py-2">
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)} className="rounded-md border px-3 py-2">
            <option value="All">All Platforms</option>
            {uniquePlatforms.map(platform => <option key={platform} value={platform}>{platform}</option>)}
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.post_id} className="p-6 bg-gray-800 rounded-md shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getMediaIcon(post.media_type)}
                  <span className={`px-2 py-1 rounded text-sm ${getPlatformColor(post.platform)}`}>{post.platform}</span>
                </div>
                {getStatusBadge(post.status)}
              </div>

              <div>
                <p className="text-gray-400">Created: {post.created_date}</p>
              </div>

              <div className="border border-gray-700 rounded-lg p-3">
                <p className="text-gray-300 line-clamp-3">{post.content}</p>
              </div>

              {post.media_url && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {post.media_type === 'Image' && <img src={post.media_url} alt="Post media" className="w-full h-48 object-cover" />}
                  {post.media_type === 'Video' && (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <Video className="w-12 h-12 text-gray-400" />
                      <span className="ml-2 text-gray-600">Video Content</span>
                    </div>
                  )}
                </div>
              )}

              {post.scheduled_date && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled: {post.scheduled_date}</span>
                </div>
              )}

              {post.rejected_reason && (
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-400">Rejection Reason:</p>
                      <p className="text-gray-300">{post.rejected_reason}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => { setSelectedPost(post); setIsViewDialogOpen(true); }}>
                  <Eye className="w-4 h-4" /> View
                </Button>

                {post.status === 'Pending' && (
                  <>
                    <Button variant="success" className="flex-1" disabled={actionLoading} onClick={() => { setSelectedPost(post); setIsApproveDialogOpen(true); }}>
                      <CheckCircle className="w-4 h-4" /> Approve
                    </Button>
                    <Button className="flex-1" disabled={actionLoading} onClick={() => { setSelectedPost(post); setIsRejectDialogOpen(true); }}>
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full">
            <div className="p-12 bg-gray-800 rounded-md shadow text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-200 mb-2">No Posts Found</h3>
              <p className="text-gray-400">No posts match your current filters</p>
            </div>
          </div>
        )}
      </div>

      {/* View Post Modal */}
      {isViewDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsViewDialogOpen(false)} />
          <div className="relative bg-gray-800 rounded-md max-w-2xl w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-4">Post Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400">Platform</label>
                  <p className={`inline-block px-2 py-1 rounded text-sm ${getPlatformColor(selectedPost.platform)}`}>{selectedPost.platform}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Media Type</label>
                  <div className="flex items-center gap-2">{getMediaIcon(selectedPost.media_type)} <span className="text-gray-300">{selectedPost.media_type}</span></div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Status</label>
                  <div>{getStatusBadge(selectedPost.status)}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Created Date</label>
                  <p className="text-gray-300">{selectedPost.created_date}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400">Content</label>
                <div className="border border-gray-700 rounded-lg p-4 mt-2"><p className="text-gray-300 whitespace-pre-wrap">{selectedPost.content}</p></div>
              </div>

              {selectedPost.media_url && (
                <div>
                  <label className="block text-sm text-gray-400">Media</label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
                    {selectedPost.media_type === 'Image' && <img src={selectedPost.media_url} alt="Post media" className="w-full" />}
                    {selectedPost.media_type === 'Video' && <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><Video className="w-16 h-16 text-gray-400" /><span className="ml-2 text-gray-600">Video Content</span></div>}
                  </div>
                </div>
              )}

              {selectedPost.rejected_reason && (
                <div>
                  <label className="block text-sm text-gray-400">Rejection Reason</label>
                  <div className="border border-gray-200 rounded-lg p-4 mt-2"><p className="text-gray-500">{selectedPost.rejected_reason}</p></div>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsApproveDialogOpen(false)} />
          <div className="relative bg-gray-800 rounded-md max-w-md w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-2">Approve Post</h3>
            <p className="text-gray-400 mb-4">Are you sure you want to approve this post for {selectedPost.platform}?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
              <Button variant="success" onClick={handleApprovePost} disabled={actionLoading}>{actionLoading ? 'Approving...' : 'Approve Post'}</Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsRejectDialogOpen(false)} />
          <div className="relative bg-gray-800 rounded-md max-w-md w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-2">Reject Post</h3>
            <p className="text-gray-400 mb-4">Are you sure you want to reject this post for {selectedPost.platform}?</p>
            <label className="block text-sm text-gray-400 mb-1">Reason for Rejection (Required)</label>
            <textarea value={clientComment} onChange={(e) => setClientComment(e.target.value)} placeholder="Provide a reason for rejection..." rows={3} className="w-full rounded-md border px-3 py-2 mb-4" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleRejectPost} disabled={!clientComment.trim() || actionLoading}>{actionLoading ? 'Rejecting...' : 'Reject Post'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
