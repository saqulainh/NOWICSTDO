import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import * as defaults from '../data/content';

const ContentContext = createContext(null);

/* Icon map — we store icon *names* in DB, resolve to components here */
import {
    Bot, Building2, LayoutDashboard, Rocket, Gauge, ShieldCheck,
    Cpu, Layers, Sparkles, Code2, Globe, Zap, Trophy, Users, Star,
} from 'lucide-react';

const ICON_MAP = {
    Bot, Building2, LayoutDashboard, Rocket, Gauge, ShieldCheck,
    Cpu, Layers, Sparkles, Code2, Globe, Zap, Trophy, Users, Star,
};

function resolveIcon(name) {
    return ICON_MAP[name] || Rocket;
}

function attachIcons(items, iconField = 'icon') {
    if (!Array.isArray(items)) return items;
    return items.map((item) => ({
        ...item,
        [iconField]: typeof item[iconField] === 'string' ? resolveIcon(item[iconField]) : item[iconField],
    }));
}

export function ContentProvider({ children }) {
    const [content, setContent] = useState({
        brand: defaults.brand,
        navLinks: defaults.navLinks,
        services: defaults.services,
        stats: defaults.stats,
        highlights: defaults.highlights,
        whyUs: defaults.whyUs,
        portfolioItems: defaults.portfolioItems,
        teamValues: defaults.teamValues,
        faqs: defaults.faqs,
    });
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        // Skip fetch if Supabase is not configured
        if (!supabase) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('section, data')
                .order('section');

            if (error) throw error;
            if (!data || data.length === 0) {
                setLoading(false);
                return;
            }

            setContent((prev) => {
                const merged = { ...prev };
                data.forEach((row) => {
                    if (row.section && row.data !== undefined) {
                        let val = row.data;
                        if (['services', 'stats', 'highlights', 'whyUs'].includes(row.section)) {
                            val = attachIcons(val);
                        }
                        merged[row.section] = val;
                    }
                });
                return merged;
            });
        } catch (err) {
            console.warn('CMS fetch failed, using defaults:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContent(); }, []);

    return (
        <ContentContext.Provider value={{ ...content, loading, refetch: fetchContent }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error('useContent must be used within ContentProvider');
    return ctx;
}

export default ContentContext;
