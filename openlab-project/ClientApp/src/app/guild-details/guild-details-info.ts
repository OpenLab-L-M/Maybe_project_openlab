import { UserInfo } from "../user-info";

export interface GuildDetailsInfo {
    id: number;
    name: string;
    capacity: number;
    description: string;
    members: UserInfo[];
}