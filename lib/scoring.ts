
export interface ScoreResult {
    score: number;
}

export function calculateDomainScore(domain: any): ScoreResult {
    let score = 0;
    
    // Internal reasons tracking (useful for debugging, even if not persisted)
    // const reasons: string[] = []; 

    const statusCode = domain.status_code;
    const url = domain.url || domain.input || '';
    const isHttps = url.startsWith('https://') || domain.scheme === 'https';
    const title = (domain.title || '').toLowerCase();
    const technologies = domain.technologies || []; 
    const cdn = domain.cdn || domain.cdn_name;
    const cnames = domain.cname || [];

    // --- 1. STATUS CODE (REFINED) ---
    // 401/403 is the new 200. We want restricted areas.
    if (statusCode) {
        if (statusCode >= 200 && statusCode < 300) {
            score += 20; // Lowered from 30. Marketing sites are often 200.
            // reasons.push('status_2xx');
        } else if (statusCode === 401 || statusCode === 403) {
            score += 30; // High value targets often protected.
            // reasons.push(`status_${statusCode}`);
        } else if (statusCode >= 300 && statusCode < 400) {
            score += 10;
        } else if (statusCode >= 500) {
            score += 20; // Unstable/Misconfig is interesting.
            // reasons.push('status_5xx');
        }

        // Refinement 1: Penalty for 2xx with empty title (likely broken/default)
        if (statusCode >= 200 && statusCode < 300 && !title) {
            score -= 5;
        }
    }

    // --- 2. HTTPS (NERFED) ---
    // HTTPS is standard now. Only small bonus. HTTP gets 0.
    if (isHttps) {
        score += 5;
    }

    // --- 3. TITLE INTENT (SMARTER) ---
    const authIntent = ['login', 'sign in', 'signin', 'auth', 'account', 'session'];
    const adminIntent = ['admin', 'dashboard', 'panel', 'console', 'manage', 'config'];
    // Negative signals
    const boringTitles = ['blog', 'docs', 'documentation', 'help', 'support', 'faq', 'career', 'job'];

    let titleScore = 0;

    if (adminIntent.some(k => title.includes(k))) {
        titleScore += 25;
        // reasons.push('admin_badged_title');
    }

    if (authIntent.some(k => title.includes(k))) {
        titleScore += 15;
        // reasons.push('auth_intent_title');
    }
    
    // Subtract for likely noise
    if (boringTitles.some(b => title.includes(b))) {
        titleScore -= 15;
        // reasons.push('noise_title');
    }
    score += titleScore;

    // --- 4. TECHNOLOGY (ADDITIVE + CAPPED) ---
    // Instead of else-if, we add up points for modern stack signals, but cap the total tech contribution.
    const frameworks = ['laravel', 'django', 'spring', 'rails', 'express', 'nextjs', 'nuxt', 'react', 'vue'];
    const authCloud = ['auth', 'jwt', 'oauth', 'firebase', 'supabase', 'aws', 'gcp', 'azure', 'cognito'];
    const apiTech = ['graphql', 'swagger', 'openapi', 'rest', 'api'];
    const contentSignals = ['wordpress', 'ghost', 'blogger', 'medium', 'hugo', 'jekyll', 'wix', 'squarespace'];
    
    const techsLower = technologies.map((t: string) => t.toLowerCase());
    
    let techScore = 0;

    if (techsLower.some((t: string) => frameworks.some(f => t.includes(f)))) {
        techScore += 15;
    }
    
    if (techsLower.some((t: string) => authCloud.some(ac => t.includes(ac)))) {
        techScore += 20;
    }
    
    if (techsLower.some((t: string) => apiTech.some(at => t.includes(at)))) {
        techScore += 10;
    }

    // Refinement 3: Penalty for Content Sites
    if (techsLower.some((t: string) => contentSignals.some(c => t.includes(c)))) {
        techScore -= 10;
        // reasons.push('content_site_penalty');
    }

    // Cap technology influence to avoidance over-inflation (e.g. 50 points just for stack)
    score += Math.min(techScore, 35);

    // --- 5. CDN (Proximity) ---
    if (cdn) {
        score += 5;
    }

    // --- 6. INFRA COMPLEXITY ---
    if (Array.isArray(cnames) && cnames.length > 1) {
        score += 5;
    }

    // --- FINAL CLAMP ---
    // Ensure 0 - 100 range
    score = Math.max(0, Math.min(score, 100));

    return {
        score
    };
}
