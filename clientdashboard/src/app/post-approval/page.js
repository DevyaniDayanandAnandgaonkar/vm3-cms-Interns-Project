"use client";
import { Search, Image as ImageIcon, Video, FileText, CheckCircle, XCircle, Clock, Eye, MessageSquare } from 'lucide-react';
import { useState, useMemo } from 'react';

// All posts data (in production, this would come from an API)
const allPosts = [
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
  },
  {
    id: 3,
    client_id: 2,
    client_name: 'Global Solutions',
    platform: 'Facebook',
    content: 'We are thrilled to share our latest success story with one of our valued clients.',
    media_type: 'Text',
    status: 'Pending',
    created_date: '2024-12-26'
  },
  {
    id: 4,
    client_id: 2,
    client_name: 'Global Solutions',
    platform: 'Twitter',
    content: 'Check out our latest blog post on industry trends and insights. Link in bio! #Industry #Trends',
    media_type: 'Image',
    media_url: 'https://via.placeholder.com/600x400',
    status: 'Approved',
    created_date: '2024-12-24',
    approved_date: '2024-12-24'
  },
  {
    id: 5,
    client_id: 3,
    client_name: 'Innovation Inc',
    platform: 'YouTube',
    content: 'Watch our CEO discuss the future of technology in this exclusive interview.',
    media_type: 'Video',
    status: 'Rejected',
    created_date: '2024-12-23',
    rejected_date: '2024-12-24',
    client_comment: 'Please revise the messaging to be more aligned with our brand voice.'
  },
  {
    id: 6,
    client_id: 1,
    client_name: 'Tech Corp',
    platform: 'GMB',
    content: 'Visit us today! Special holiday offers available this week only.',
    media_type: 'Image',
    media_url: 'https://via.placeholder.com/600x400',
    status: 'Pending',
    created_date: '2024-12-26'
  },
  {
    id: 7,
    client_id: 3,
    client_name: 'Innovation Inc',
    platform: 'LinkedIn',
    content: 'Hiring alert! We are looking for talented individuals to join our team. Check out open positions on our careers page.',
    media_type: 'Text',
    status: 'Pending',
    created_date: '2024-12-26'
  },
  {
    id: 8,
    client_id: 2,
    client_name: 'Global Solutions',
    platform: 'Instagram',
    content: 'Transform your business with our innovative solutions. Swipe to see before and after results!',
    media_type: 'Image',
    media_url: 'https://via.placeholder.com/600x400',
    status: 'Approved',
    created_date: '2024-12-25',
    approved_date: '2024-12-26'
  }
];

export default function ClientPostApproval(props) {
  const clientInfo = props?.clientInfo || { client_id: 1, client_name: 'Default' };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [clientComment, setClientComment] = useState('');

  const [posts, setPosts] = useState(allPosts);

  // Filter posts for this client only
  const clientPosts = useMemo(() => posts.filter(p => p.client_id === clientInfo.client_id), [posts, clientInfo.client_id]);

  // Get unique platforms for filters
  const uniquePlatforms = Array.from(new Set(clientPosts.map(p => p.platform)));

  // Filter posts
  const filteredPosts = clientPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesPlatform = filterPlatform === 'All' || post.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Count posts by status for this client
  const statusCounts = useMemo(() => ({
    pending: clientPosts.filter(p => p.status === 'Pending').length,
    approved: clientPosts.filter(p => p.status === 'Approved').length,
    rejected: clientPosts.filter(p => p.status === 'Rejected').length
  }), [clientPosts]);

  const handleApprovePost = () => {
    if (selectedPost) {
      setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, status: 'Approved', approved_date: new Date().toISOString().split('T')[0], client_comment: clientComment } : p));
      setIsApproveDialogOpen(false);
      setSelectedPost(null);
      setClientComment('');
    }
  };

  const handleRejectPost = () => {
    if (selectedPost) {
      setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, status: 'Rejected', rejected_date: new Date().toISOString().split('T')[0], client_comment: clientComment } : p));
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
      'LinkedIn': 'bg-blue-100 text-blue-700',
      'Instagram': 'bg-pink-100 text-pink-700',
      'Facebook': 'bg-blue-100 text-blue-800',
      'Twitter': 'bg-sky-100 text-sky-700',
      'YouTube': 'bg-red-100 text-red-700',
      'GMB': 'bg-green-100 text-green-700'
    };
    return colors[platform] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Post Approval</h1>
        <p className="text-gray-600">Review and approve posts created for your social media accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Pending Review</p>
              <p className="text-gray-900">{statusCounts.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Approved</p>
              <p className="text-gray-900">{statusCounts.approved}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Rejected</p>
              <p className="text-gray-900">{statusCounts.rejected}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white rounded-md shadow">
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
          <div key={post.id} className="p-6 bg-white rounded-md shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getMediaIcon(post.media_type)}
                  <span className={`px-2 py-1 rounded text-sm ${getPlatformColor(post.platform)}`}>{post.platform}</span>
                </div>
                {getStatusBadge(post.status)}
              </div>

              <div>
                <p className="text-gray-600">Created: {post.created_date}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-gray-700 line-clamp-3">{post.content}</p>
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
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled: {post.scheduled_date}</span>
                </div>
              )}

              {post.client_comment && (
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-600">Your Feedback:</p>
                      <p className="text-gray-700">{post.client_comment}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button onClick={() => { setSelectedPost(post); setIsViewDialogOpen(true); }} className="flex-1 border rounded-md px-3 py-2 flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> View
                </button>

                {post.status === 'Pending' && (
                  <> 
                    <button onClick={() => { setSelectedPost(post); setIsApproveDialogOpen(true); }} className="flex-1 bg-green-600 text-white rounded-md px-3 py-2 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button onClick={() => { setSelectedPost(post); setIsRejectDialogOpen(true); }} className="flex-1 bg-red-600 text-white rounded-md px-3 py-2 flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full">
            <div className="p-12 bg-white rounded-md shadow text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No Posts Found</h3>
              <p className="text-gray-600">No posts match your current filters</p>
            </div>
          </div>
        )}
      </div>

      {/* View Post Modal */}
      {isViewDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsViewDialogOpen(false)} />
          <div className="relative bg-white rounded-md max-w-2xl w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-4">Post Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Platform</label>
                  <p className={`inline-block px-2 py-1 rounded text-sm ${getPlatformColor(selectedPost.platform)}`}>{selectedPost.platform}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Media Type</label>
                  <div className="flex items-center gap-2">{getMediaIcon(selectedPost.media_type)} <span className="text-gray-900">{selectedPost.media_type}</span></div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Status</label>
                  <div>{getStatusBadge(selectedPost.status)}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Created Date</label>
                  <p className="text-gray-900">{selectedPost.created_date}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Content</label>
                <div className="border border-gray-200 rounded-lg p-4 mt-2"><p className="text-gray-900 whitespace-pre-wrap">{selectedPost.content}</p></div>
              </div>

              {selectedPost.media_url && (
                <div>
                  <label className="block text-sm text-gray-600">Media</label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
                    {selectedPost.media_type === 'Image' && <img src={selectedPost.media_url} alt="Post media" className="w-full" />}
                    {selectedPost.media_type === 'Video' && <div className="w-full h-64 bg-gray-100 flex items-center justify-center"><Video className="w-16 h-16 text-gray-400" /><span className="ml-2 text-gray-600">Video Content</span></div>}
                  </div>
                </div>
              )}

              {selectedPost.client_comment && (
                <div>
                  <label className="block text-sm text-gray-600">Your Feedback</label>
                  <div className="border border-gray-200 rounded-lg p-4 mt-2"><p className="text-gray-900">{selectedPost.client_comment}</p></div>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setIsViewDialogOpen(false)} className="px-4 py-2 rounded-md border">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsApproveDialogOpen(false)} />
          <div className="relative bg-white rounded-md max-w-md w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-2">Approve Post</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to approve this post for {selectedPost.platform}?</p>
            <label className="block text-sm text-gray-600 mb-1">Comment (Optional)</label>
            <textarea value={clientComment} onChange={(e) => setClientComment(e.target.value)} placeholder="Add any comments or feedback..." rows={3} className="w-full rounded-md border px-3 py-2 mb-4" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsApproveDialogOpen(false)} className="px-4 py-2 rounded-md border">Cancel</button>
              <button onClick={handleApprovePost} className="px-4 py-2 rounded-md bg-green-600 text-white">Approve Post</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectDialogOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsRejectDialogOpen(false)} />
          <div className="relative bg-white rounded-md max-w-md w-full p-6 z-10">
            <h3 className="text-lg font-medium mb-2">Reject Post</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to reject this post for {selectedPost.platform}?</p>
            <label className="block text-sm text-gray-600 mb-1">Reason for Rejection (Required)</label>
            <textarea value={clientComment} onChange={(e) => setClientComment(e.target.value)} placeholder="Provide a reason for rejection..." rows={3} className="w-full rounded-md border px-3 py-2 mb-4" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsRejectDialogOpen(false)} className="px-4 py-2 rounded-md border">Cancel</button>
              <button onClick={handleRejectPost} className="px-4 py-2 rounded-md bg-red-600 text-white" disabled={!clientComment.trim()}>Reject Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
