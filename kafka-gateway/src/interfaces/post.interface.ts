export interface CreatePost {
  title: string;
  content: string;
  authorId: number;
}

export interface EditPost {
  title?: string;
  content: string;
}
