import { User } from "./user";

export interface Komentar {
    user: User
    komentar: string
    timestamp: Date;

    replies?: Komentar[];      // list balasan (nested)
  showReplyBox?: boolean;    // untuk toggle input balasan
  tempReply?: string;        
}
