
export type FormReply = {
  content: string;
  image?: Blob |string|null;
  thread: number 
};

export type RepliesCard = {
  id?: number;
  content?: string;
  image?: string;
  // created_at?: string;
  likes: [];
  replies: [];
};