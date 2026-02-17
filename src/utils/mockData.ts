import { Debate } from '../types';

export const MOCK_DEBATES: Debate[] = [
    {
        id: '1',
        title: 'Universal Basic Income is Necessary',
        description: 'With the rise of AI and automation, traditional jobs are disappearing. UBI is the only way to ensure social stability and economic participation for all citizens.',
        category: 'Economics',
        created_by: 'user1',
        created_at: new Date().toISOString(),
        agree_count: 120,
        disagree_count: 45,
        undecided_count: 10,
    },
    {
        id: '2',
        title: 'Remote Work Should Be a Legal Right',
        description: 'Employees should have the right to work remotely if their job allows it. This reduces traffic, improves mental health, and boosts productivity.',
        category: 'Society',
        created_by: 'user2',
        created_at: new Date().toISOString(),
        agree_count: 85,
        disagree_count: 90,
        undecided_count: 5,
    },
    {
        id: '3',
        title: 'Cryptocurrency will Replace Fiat',
        description: 'Decentralized finance is the future. Central banks are printing money recklessly, while crypto offers a finite, secure alternative.',
        category: 'Technology',
        created_by: 'user3',
        created_at: new Date().toISOString(),
        agree_count: 300,
        disagree_count: 50,
        undecided_count: 20,
    },
    {
        id: '4',
        title: 'Mars Colonization is a Priority',
        description: 'Humanity must become a multi-planetary species to ensure survival. Investment in space travel drives innovation on Earth too.',
        category: 'Science',
        created_by: 'user4',
        created_at: new Date().toISOString(),
        agree_count: 60,
        disagree_count: 120,
        undecided_count: 15,
    },
];

import { Comment } from '../types';

export const MOCK_COMMENTS: Comment[] = [
    {
        id: 'c1',
        debate_id: '1',
        user_id: 'user2',
        content: 'While UBI sounds good, inflation is a real concern. If everyone has more money, prices will just go up.',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        user: {
            id: 'user2',
            username: 'EconomistX',
            reputation_score: 150,
            streak_count: 5,
            created_at: '',
        }
    },
    {
        id: 'c2',
        debate_id: '1',
        user_id: 'user3',
        content: 'Automation is creating more wealth than ever. We just need to distribute it better. UBI is the floor, not the ceiling.',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        user: {
            id: 'user3',
            username: 'FuturistJane',
            reputation_score: 320,
            streak_count: 12,
            created_at: '',
        }
    },
    {
        id: 'c3',
        debate_id: '1',
        user_id: 'user4',
        content: 'I agree with Jane. We are entering a post-scarcity era for digital goods, but physical goods still obey supply and demand.',
        created_at: new Date(Date.now() - 900000).toISOString(),
        user: {
            id: 'user4',
            username: 'TechBro',
            reputation_score: 80,
            streak_count: 2,
            created_at: '',
        }
    }
];
