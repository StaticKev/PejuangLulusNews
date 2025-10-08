import { User } from "./user";

export interface Komentar {
    user: User
    komentar: string
    timestamp: Date
}
