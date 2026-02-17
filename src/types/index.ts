export interface User {
    id: string;
    username: string;
    reputation_score: number;
    streak_count: number;
    created_at: string;
}

export interface Debate {
    id: string;
    title: string;
    description: string;
    category: string;
    created_by: string;
    created_at: string;
    agree_count: number;
    disagree_count: number;
    undecided_count: number;
    // Join fields usually
    creator?: User;
}

export type VoteType = 'agree' | 'disagree' | 'undecided';

export interface Vote {
    id: string;
    user_id: string;
    debate_id: string;
    vote_type: VoteType;
    created_at: string;
}

export interface Comment {
    id: string;
    debate_id: string;
    user_id: string;
    content: string;
    created_at: string;
    user?: User; // Joined user
}
