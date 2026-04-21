import supabase from './supabase';

/**
 * Save a section's data to the site_content table.
 * Uses upsert so it inserts if missing, updates if exists.
 */
export async function saveSection(section, data) {
    if (!supabase) throw new Error('Supabase not configured. Add your credentials to .env');

    const { error } = await supabase
        .from('site_content')
        .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' });

    if (error) throw error;
    return true;
}

/**
 * Fetch a single section from site_content.
 */
export async function fetchSection(section) {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('section', section)
        .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data?.data ?? null;
}
