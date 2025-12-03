'use client';

import { useState } from 'react';
import {
  Instagram,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  TrendingUp,
  Clock,
  Zap,
  Image as ImageIcon,
  Hash,
  Settings,
  BarChart3,
  Send
} from 'lucide-react';

interface Post {
  id: number;
  content: string;
  scheduledTime: string;
  status: 'scheduled' | 'posted' | 'draft';
  hashtags: string[];
}

interface Analytics {
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics' | 'automate' | 'engage'>('schedule');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: 'Check out our new product launch! 🚀',
      scheduledTime: '2025-12-05 10:00',
      status: 'scheduled',
      hashtags: ['#newproduct', '#launch', '#innovation']
    },
    {
      id: 2,
      content: 'Behind the scenes of our team meeting',
      scheduledTime: '2025-12-06 14:00',
      status: 'scheduled',
      hashtags: ['#teamwork', '#behindthescenes']
    }
  ]);

  const [analytics] = useState<Analytics>({
    followers: 12450,
    engagement: 8.7,
    posts: 342,
    reach: 54320
  });

  const [newPost, setNewPost] = useState({
    content: '',
    scheduledTime: '',
    hashtags: ''
  });

  const [automationSettings, setAutomationSettings] = useState({
    autoLike: true,
    autoFollow: false,
    autoReply: true,
    autoHashtags: true
  });

  const handleAddPost = () => {
    if (newPost.content && newPost.scheduledTime) {
      const post: Post = {
        id: posts.length + 1,
        content: newPost.content,
        scheduledTime: newPost.scheduledTime,
        status: 'scheduled',
        hashtags: newPost.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setPosts([...posts, post]);
      setNewPost({ content: '', scheduledTime: '', hashtags: '' });
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="instagram-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Instagram size={40} />
              <h1 className="text-3xl font-bold">Instagram Manager Bot</h1>
            </div>
            <button className="flex items-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'schedule'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar size={20} />
            Schedule Posts
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={20} />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('automate')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'automate'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Zap size={20} />
            Automation
          </button>
          <button
            onClick={() => setActiveTab('engage')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'engage'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageCircle size={20} />
            Engagement
          </button>
        </div>

        {/* Schedule Posts Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* New Post Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Post</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                    placeholder="Write your post content here..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                    <input
                      type="datetime-local"
                      value={newPost.scheduledTime}
                      onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags (comma-separated)</label>
                    <input
                      type="text"
                      value={newPost.hashtags}
                      onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="#example, #hashtag"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddPost}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Schedule Post
                </button>
              </div>
            </div>

            {/* Scheduled Posts List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Scheduled Posts</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-800 flex-1">{post.content}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        post.status === 'posted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.scheduledTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {post.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 text-sm hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="text-purple-500" size={32} />
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium">Followers</h3>
                <p className="text-3xl font-bold text-gray-800">{analytics.followers.toLocaleString()}</p>
                <p className="text-green-600 text-sm mt-1">+245 this week</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Heart className="text-pink-500" size={32} />
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium">Engagement Rate</h3>
                <p className="text-3xl font-bold text-gray-800">{analytics.engagement}%</p>
                <p className="text-green-600 text-sm mt-1">+1.2% this week</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <ImageIcon className="text-orange-500" size={32} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium">Total Posts</h3>
                <p className="text-3xl font-bold text-gray-800">{analytics.posts}</p>
                <p className="text-gray-600 text-sm mt-1">12 this month</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-blue-500" size={32} />
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium">Reach</h3>
                <p className="text-3xl font-bold text-gray-800">{analytics.reach.toLocaleString()}</p>
                <p className="text-green-600 text-sm mt-1">+3.4k this week</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Performance Overview</h2>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Automation Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <Heart className="text-pink-500" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Auto-Like Posts</h3>
                      <p className="text-sm text-gray-600">Automatically like posts from target accounts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={automationSettings.autoLike}
                      onChange={(e) => setAutomationSettings({ ...automationSettings, autoLike: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <Users className="text-blue-500" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Auto-Follow</h3>
                      <p className="text-sm text-gray-600">Follow users based on hashtags and interests</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={automationSettings.autoFollow}
                      onChange={(e) => setAutomationSettings({ ...automationSettings, autoFollow: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <MessageCircle className="text-green-500" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Auto-Reply to DMs</h3>
                      <p className="text-sm text-gray-600">Send automated responses to direct messages</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={automationSettings.autoReply}
                      onChange={(e) => setAutomationSettings({ ...automationSettings, autoReply: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <Hash className="text-purple-500" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Smart Hashtags</h3>
                      <p className="text-sm text-gray-600">Automatically suggest relevant hashtags for posts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={automationSettings.autoHashtags}
                      onChange={(e) => setAutomationSettings({ ...automationSettings, autoHashtags: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
              <div className="flex items-start gap-4">
                <Zap className="text-purple-600 flex-shrink-0" size={32} />
                <div>
                  <h3 className="font-bold text-purple-900 mb-2">Pro Tip</h3>
                  <p className="text-purple-800">Automation helps you save time, but remember to maintain authenticity. Balance automated actions with genuine engagement for best results.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === 'engage' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <MessageCircle className="text-purple-500" />
                  Recent Comments
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 pb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">User {i}</p>
                          <p className="text-sm text-gray-600">Great content! Keep it up 🔥</p>
                          <button className="text-xs text-purple-600 hover:text-purple-800 mt-1">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <Heart className="text-pink-500" />
                  Top Engaging Posts
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-800 mb-2">Post about exciting new features...</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Heart size={16} className="text-pink-500" />
                          {Math.floor(Math.random() * 1000) + 100}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} className="text-blue-500" />
                          {Math.floor(Math.random() * 100) + 10}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Instagram Manager Bot. Manage your Instagram presence efficiently.</p>
        </div>
      </footer>
    </div>
  );
}
