"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [categoryName, setCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagPrice, setNewTagPrice] = useState('');
  const [showTagForm, setShowTagForm] = useState(false);
  const [selectedTagPrice, setSelectedTagPrice] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      router.push('/admin9876');
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to check admin status');
        }

        if (!data.hasAdmin) {
          setError('No admin data found');
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('Failed to check admin status');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  useEffect(() => {
    // Fetch images when category changes
    if (categoryName) {
      fetchCategoryImages(categoryName);
    } else {
      setCategoryImages([]);
    }
  }, [categoryName]);

  useEffect(() => {
    // Fetch tags on component mount
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/tags');
      const data = await response.json();
      if (response.ok) {
        setTags(data.tags);
      } else {
        throw new Error(data.error || 'Failed to fetch tags');
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError('Failed to load tags');
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    if (!newTagPrice || isNaN(newTagPrice) || parseFloat(newTagPrice) <= 0) {
      setError('Please enter a valid starting price');
      return;
    }

    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newTagName.trim(),
          starting_price: parseFloat(newTagPrice)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tag');
      }

      setTags([...tags, data.tag]);
      setNewTagName('');
      setNewTagPrice('');
      setShowTagForm(false);
      setSuccess('Tag created successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/tags', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tagId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete tag');
      }

      setTags(tags.filter(tag => tag.id !== tagId));
      setSuccess('Tag deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTagPrice = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setError('Please select a category');
      return;
    }

    if (!selectedTagPrice || isNaN(selectedTagPrice) || parseFloat(selectedTagPrice) <= 0) {
      setError('Please enter a valid starting price');
      return;
    }

    try {
      const response = await fetch('/api/admin/tags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: tags.find(tag => tag.slug === categoryName)?.id,
          starting_price: parseFloat(selectedTagPrice)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update tag');
      }

      setTags(tags.map(t => t.slug === categoryName ? { ...t, starting_price: parseFloat(selectedTagPrice) } : t));
      setSelectedTagPrice('');
      setSuccess('Starting price updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCategoryImages = async (tag) => {
    setLoadingImages(true);
    setCategoryImages([]);
    try {
      // Fetch images from Cloudinary with the specified tag
      const response = await fetch(`/api/cloudinary?tag=${tag}`);
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      setCategoryImages(data.resources || []);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load category images');
    } finally {
      setLoadingImages(false);
    }
  };

  const handleDeleteImage = async (publicId) => {
    try {
      // Call API to delete image from Cloudinary
      const response = await fetch('/api/cloudinary', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) throw new Error('Failed to delete image');

      // Remove deleted image from state
      setCategoryImages(prev => prev.filter(img => img.public_id !== publicId));
      setSuccess('Image deleted successfully');
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('File must be JPG, PNG, or GIF');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!categoryName) {
      setError('Please select a category');
      setIsLoading(false);
      return;
    }

    try {
      if (!selectedFile) {
        throw new Error('Please select an image file');
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('tags', categoryName); // Use the selected tag's slug

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      setSelectedFile(null);
      setSuccess('Product added successfully!');
      fetchCategoryImages(categoryName);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the form');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setError(err.message || 'An error occurred while changing the password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin9876');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {showPasswordForm ? (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#526D5F] hover:bg-[#3A4F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#526D5F]"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                  onClick={() => setShowTagForm(!showTagForm)}
                  className="bg-[#526D5F] text-white px-4 py-2 rounded-md hover:bg-[#3a4d42] transition-colors"
                >
                  {showTagForm ? 'Cancel' : 'Create New Category'}
                </button>
              </div>

              {showTagForm && (
                <form onSubmit={handleCreateTag} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price (₹)
                    </label>
                    <input
                      type="number"
                      value={newTagPrice}
                      onChange={(e) => setNewTagPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#526D5F] text-white px-4 py-2 rounded-md hover:bg-[#3a4d42] transition-colors"
                  >
                    Create Category
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div key={tag.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{tag.name}</h3>
                        <p className="text-gray-600">Starting Price: ₹{tag.starting_price}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Update Starting Price</h2>
              <form onSubmit={handleUpdateTagPrice} className="p-4 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Category
                  </label>
                  <select
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      const selectedTag = tags.find(tag => tag.slug === e.target.value);
                      setSelectedTagPrice(selectedTag?.starting_price?.toString() || '');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                  >
                    <option value="">Select a category</option>
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.slug}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                {categoryName && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Starting Price (₹)
                    </label>
                    <input
                      type="number"
                      value={selectedTagPrice}
                      onChange={(e) => setSelectedTagPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}
                {categoryName && (
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="bg-[#526D5F] text-white px-4 py-2 rounded-md hover:bg-[#3a4d42] transition-colors"
                    >
                      Update Price
                    </button>
                    {success && success.includes('Starting price') && (
                      <span className="text-green-600">{success}</span>
                    )}
                  </div>
                )}
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.slug}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#526D5F] hover:text-[#3A4F44] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-ring-[#526D5F]"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 text-sm text-center">{success}</div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#526D5F] hover:bg-[#3A4F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#526D5F]"
                  >
                    {isLoading ? 'Uploading...' : 'Upload Product'}
                  </button>
                </div>
              </form>
            </div>

            {/* Category Images Gallery */}
            {categoryName && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {tags.find(tag => tag.slug === categoryName)?.name || categoryName.replace(/-/g, ' ')} Images
                </h2>
                
                {loadingImages ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#526D5F]"></div>
                  </div>
                ) : categoryImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categoryImages.map((image) => (
                      <div key={image.public_id} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={image.secure_url}
                            alt={image.public_id}
                            className="h-48 w-full object-cover object-center"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteImage(image.public_id)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No images found in this category</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 