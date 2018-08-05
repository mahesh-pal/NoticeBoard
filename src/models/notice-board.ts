export interface NoticeBoard {
  boardName: string;
  description: string;
  id?: string;
  imageUrl?: string;
  createdBy: string;
  createdDate: string;
  users: string[];
  admins: string[];
}