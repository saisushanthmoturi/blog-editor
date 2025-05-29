export interface Blog {
  _id?: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  author?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  tags: string;
}

export interface BlogListResponse {
  blogs: Blog[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface ApiResponse<T = any> {
  message: string;
  blog?: Blog;
  data?: T;
  error?: string;
}