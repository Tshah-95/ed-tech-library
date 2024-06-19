declare type video = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
};

declare type comment = {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: string;
};
