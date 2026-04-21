import { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { saveSection, fetchSection } from '../../lib/cms';

const ICON_OPTIONS = ['Rocket', 'Code2', 'Bot', 'Sparkles', 'Users', 'Layers', 'Globe', 'Zap', 'Trophy', 'Star'];

export default function AboutEditor() {
    const { whyUs: defaultWhyUs, teamValues: defaultValues, refetch } = useContent();
    const [whyUs, setWhyUs] = useState([]);
    const [teamValues, setTeamValues] = useState([]);
    const [milestones, setMilestones] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        Promise.all([
            fetchSection('whyUs'),
            fetchSection('teamValues'),
            fetchSection('milestones'),
        ]).then(([wu, tv, ms]) => {
            setWhyUs(wu || defaultWhyUs.map((i) => ({ ...i, icon: i.icon?.displayName || i.icon?.name || 'Rocket' })));
            setTeamValues(tv || defaultValues || []);
            setMilestones(ms || [
                { year: '2023', title: 'Studio Founded', desc: 'Nowic Studio was born from a belief: great products deserve great execution.' },
                { year: '2024', title: '25+ Projects', desc: 'Expanded to full-stack platforms, AI apps, and healthcare solutions.' },
                { year: '2025', title: 'AI-First', desc: 'Integrated AI workflows for 3× faster product delivery.' },
                { year: '2026', title: '50+ & Growing', desc: 'Serving founders and enterprises across India and globally.' },
            ]);
        });
    }, []);

    const updateWhyUs = (idx, field, val) => {
        setWhyUs((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));
        setSaved(false);
    };

    const addWhyUs = () => setWhyUs((prev) => [...prev, { icon: 'Rocket', title: '', desc: '' }]);
    const removeWhyUs = (idx) => { setWhyUs((prev) => prev.filter((_, i) => i !== idx)); setSaved(false); };

    const updateValue = (idx, val) => {
        setTeamValues((prev) => prev.map((v, i) => i === idx ? val : v));
        setSaved(false);
    };
    const addValue = () => setTeamValues((prev) => [...prev, '']);
    const removeValue = (idx) => { setTeamValues((prev) => prev.filter((_, i) => i !== idx)); setSaved(false); };

    const updateMilestone = (idx, field, val) => {
        setMilestones((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));
        setSaved(false);
    };
    const addMilestone = () => setMilestones((prev) => [...prev, { year: '', title: '', desc: '' }]);
    const removeMilestone = (idx) => { setMilestones((prev) => prev.filter((_, i) => i !== idx)); setSaved(false); };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSection('whyUs', whyUs);
            await saveSection('teamValues', teamValues);
            await saveSection('milestones', milestones);
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
                    <h1 className="text-2xl font-bold text-[#f0f0f3]">About Page</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">Why Us, values, and milestones.</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="admin-save-btn">
                    {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save All'}</>}
                </button>
            </div>

            {/* Why Us */}
            <h2 className="text-sm font-bold text-[#34d99a] uppercase tracking-wider mb-3">Why Choose Us</h2>
            <div className="space-y-3 mb-8">
                {whyUs.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-4">
                        <div className="flex justify-end mb-2">
                            <button onClick={() => removeWhyUs(idx)} className="text-red-400 hover:text-red-300"><Trash2 size={13} /></button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label className="admin-label">Icon</label>
                                <select value={item.icon} onChange={(e) => updateWhyUs(idx, 'icon', e.target.value)} className="admin-input">
                                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="admin-label">Title</label>
                                <input type="text" value={item.title} onChange={(e) => updateWhyUs(idx, 'title', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Description</label>
                                <input type="text" value={item.desc} onChange={(e) => updateWhyUs(idx, 'desc', e.target.value)} className="admin-input" />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={addWhyUs} className="admin-add-btn"><Plus size={14} /> Add Item</button>
            </div>

            {/* Team Values */}
            <h2 className="text-sm font-bold text-[#34d99a] uppercase tracking-wider mb-3">Team Values</h2>
            <div className="space-y-2 mb-8">
                {teamValues.map((val, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input type="text" value={val} onChange={(e) => updateValue(idx, e.target.value)} className="admin-input flex-1" placeholder="Value statement" />
                        <button onClick={() => removeValue(idx)} className="text-red-400 hover:text-red-300 px-2"><Trash2 size={13} /></button>
                    </div>
                ))}
                <button onClick={addValue} className="admin-add-btn"><Plus size={14} /> Add Value</button>
            </div>

            {/* Milestones */}
            <h2 className="text-sm font-bold text-[#34d99a] uppercase tracking-wider mb-3">Milestones / Timeline</h2>
            <div className="space-y-3">
                {milestones.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-4">
                        <div className="flex justify-end mb-2">
                            <button onClick={() => removeMilestone(idx)} className="text-red-400 hover:text-red-300"><Trash2 size={13} /></button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label className="admin-label">Year</label>
                                <input type="text" value={item.year} onChange={(e) => updateMilestone(idx, 'year', e.target.value)} className="admin-input" placeholder="2024" />
                            </div>
                            <div>
                                <label className="admin-label">Title</label>
                                <input type="text" value={item.title} onChange={(e) => updateMilestone(idx, 'title', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                                <label className="admin-label">Description</label>
                                <input type="text" value={item.desc} onChange={(e) => updateMilestone(idx, 'desc', e.target.value)} className="admin-input" />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={addMilestone} className="admin-add-btn"><Plus size={14} /> Add Milestone</button>
            </div>
        </div>
    );
}
