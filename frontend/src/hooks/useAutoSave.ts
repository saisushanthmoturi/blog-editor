import { useCallback, useEffect, useRef } from 'react';
import { blogAPI } from '../services/api';
import { Blog } from '../types/blog';
import { AUTO_SAVE_DELAY, AUTO_SAVE_INTERVAL } from '../utils/constants';
import { useDebounce } from './useDebounce';

interface UseAutoSaveProps {
  blog: Partial<Blog>;
  blogId?: string;
  onSaveSuccess?: (savedBlog: Blog) => void;
  onSaveError?: (error: string) => void;
}

export const useAutoSave = ({
  blog,
  blogId,
  onSaveSuccess,
  onSaveError
}: UseAutoSaveProps) => {
  const debouncedBlog = useDebounce(blog, AUTO_SAVE_DELAY);
  const lastSavedRef = useRef<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const saveDraft = useCallback(async () => {
    if (!blog.title?.trim() || !blog.content?.trim()) {
      return; // Don't save empty blogs
    }

    const currentBlogString = JSON.stringify(blog);
    if (currentBlogString === lastSavedRef.current) {
      return; // No changes since last save
    }

    try {
      const response = await blogAPI.saveDraft(blog, blogId);
      lastSavedRef.current = currentBlogString;
      onSaveSuccess?.(response.blog!);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save draft';
      onSaveError?.(errorMessage);
    }
  }, [blog, blogId, onSaveSuccess, onSaveError]);

  // Debounced auto-save (after user stops typing)
  useEffect(() => {
    if (debouncedBlog.title || debouncedBlog.content) {
      saveDraft();
    }
  }, [debouncedBlog, saveDraft]);

  // Interval-based auto-save (every 30 seconds)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (blog.title?.trim() || blog.content?.trim()) {
        saveDraft();
      }
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [saveDraft, blog]);

  // Manual save function
  const manualSave = useCallback(() => {
    return saveDraft();
  }, [saveDraft]);

  return { manualSave };
};