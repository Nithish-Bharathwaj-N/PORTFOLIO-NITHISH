'use server';

import fs from 'fs';
import path from 'path';

export async function getJourneyImages(slug: string): Promise<string[]> {
    if (!slug) return [];

    const lowerSlug = slug.toLowerCase();

    const slugImageMap: Record<string, string[]> = {
        'aws': ['/images/timeline-aws-internship.png'],
        'intern': ['/images/timeline-aws-internship.png'],
        'virtual': ['/images/timeline-aws-internship.png'],
        'specialist': ['/images/timeline-aws-internship.png'],
        'subaero': ['/images/subaero-preview.jpg', '/images/aircraft.jpg'],
        'aerothon': ['/images/subaero-preview.jpg', '/images/aircraft.jpg'],
        'developer': ['/images/subaero-preview.jpg'],
        '3d': ['/images/subaero-preview.jpg'],
        'securox': ['/images/timeline-securox.png'],
        'cybersecurity': ['/images/timeline-securox.png'],
        'architect': ['/images/timeline-securox.png'],
        'chennai': ['/images/timeline-cit-college.png'],
        'cit': ['/images/timeline-cit-college.png'],
        'college': ['/images/timeline-cit-college.png'],
        'joining': ['/images/timeline-cit-college.png'],
        'student': ['/images/timeline-cit-college.png'],
        'degree': ['/images/timeline-cit-college.png'],
        'education': ['/images/timeline-cit-college.png'],
        'cisco': ['/certificate/cisco-cybersecurity.png', '/certificate/cisco-python-essentials-1-1.png', '/certificate/cisco-modern-ai.png'],
        'leetcode': ['/images/timeline-leetcode-cp.png'],
        'rating': ['/images/timeline-leetcode-cp.png'],
        'solved': ['/images/timeline-leetcode-cp.png'],
        'queue': ['/images/queuecure-preview.jpg'],
        'healthcare': ['/images/queuecure-preview.jpg'],
        'voyage': ['/images/voyage-preview.jpg'],
        'finsight': ['/images/e-commerce.jpg'],
        'fintech': ['/images/e-commerce.jpg'],
        'banking': ['/images/e-commerce.jpg'],
        'hackathon': ['/images/nithish-about.jpg', '/images/subaero-preview.jpg']
    };

    const matchedKey = Object.keys(slugImageMap).find(k => lowerSlug.includes(k));
    if (matchedKey) {
        return slugImageMap[matchedKey];
    }

    return ['/images/subaero-preview.jpg', '/images/timeline-securox.png'];
}
