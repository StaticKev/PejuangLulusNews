import { User } from "./user";

export interface Komentar {
  id?:number;
    user: User
    komentar: string
    timestamp: Date;

    replies?: Komentar[];      
  showReplyBox?: boolean;    
  tempReply?: string;        
}
