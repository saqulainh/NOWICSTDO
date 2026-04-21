import { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { saveSection, fetchSection } from '../../lib/cms';

const ICON_OPTIONS = ['Gauge', 'Sparkles', 'Cpu', 'Layers', 'ShieldCheck', 'Users', 'Zap', 'Trophy', 'Star', 'Code2', 'Rocket', 'Bot'];

export default function StatsEditor() {
    const { stats: defaultStats, highlights: defaultHighlights, refetch } = useContent();
    const [stats, setStats] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        Promise.all([fetchSection('stats'), fetchSection('highlights')]).then(([s, h]) => {
            setStats(s || defaultStats.map((i) => ({ ...i, icon: i.icon?.displayName || i.icon?.name || 'Gauge' })));
            setHighlights(h || defaultHighlights.map((i) => ({ ...i, icon: i.icon?.displayName || i.icon?.name || 'Zap' })));
        });
    }, []);

    const updateStat = (idx, field, value) => {
        setStats((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
        setSaved(false);
    };

    const updateHighlight = (idx, field, value) => {
        setHighlights((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSection('stats', stats);
            await saveSection('highlights', highlights);
            await refetch();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            alert('Failed to save: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#f0f0f3]">Stats & Highlights</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">Key metrics shown across the site.</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="admin-save-btn">
                    {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save'}</>}
                </button>
            </div>

            {/* Highlights */}
            <h2 className="text-sm font-bold text-[#34d99a] uppercase tracking-wider mb-3">Highlights (Stats Bar)</h2>
            <div className="space-y-3 mb-8">
                {highlights.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label className="admin-label">Icon</label>
                                <select value={item.icon} onChange={(e) => updateHighlight(idx, 'icon', e.target.value)} className="admin-input">
                                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="admin-label">Value</label>
                                <input type="text" value={item.value} onChange={(e) => updateHighlight(idx, 'value', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Label</label>
                                <input type="text" value={item.label} onChange={(e) => updateHighlight(idx, 'label', e.target.value)} className="admin-input" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <h2 className="text-sm font-bold text-[#34d99a] uppercase tracking-wider mb-3">Stats (Details)</h2>
            <div className="space-y-3">
                {stats.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label className="admin-label">Icon</label>
                                <select value={item.icon} onChange={(e) => updateStat(idx, 'icon', e.target.value)} className="admin-input">
                                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="admin-label">Value</label>
                                <input type="text" value={item.value} onChange={(e) => updateStat(idx, 'value', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Label</label>
                                <input type="text" value={item.label} onChange={(e) => updateStat(idx, 'label', e.target.value)} className="admin-input" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
