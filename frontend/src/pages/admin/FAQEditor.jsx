import { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { saveSection, fetchSection } from '../../lib/cms';

export default function FAQEditor() {
    const { faqs: defaults, refetch } = useContent();
    const [items, setItems] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSection('faqs').then((data) => {
            if (data) setItems(data);
            else setItems(defaults || []);
        });
    }, []);

    const update = (idx, field, value) => {
        setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
        setSaved(false);
    };

    const addItem = () => setItems((prev) => [...prev, { q: '', a: '' }]);

    const removeItem = (idx) => {
        if (!confirm('Delete this FAQ?')) return;
        setItems((prev) => prev.filter((_, i) => i !== idx));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSection('faqs', items);
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
                    <h1 className="text-2xl font-bold text-[#f0f0f3]">FAQs</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">{items.length} questions</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={addItem} className="admin-add-btn"><Plus size={14} /> Add FAQ</button>
                    <button onClick={handleSave} disabled={saving} className="admin-save-btn">
                        {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save'}</>}
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold text-[#34d99a]">#{idx + 1}</span>
                            <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="admin-label">Question</label>
                                <input type="text" value={item.q} onChange={(e) => update(idx, 'q', e.target.value)} className="admin-input" placeholder="Enter question..." />
                            </div>
                            <div>
                                <label className="admin-label">Answer</label>
                                <textarea value={item.a} onChange={(e) => update(idx, 'a', e.target.value)} rows={2} className="admin-input resize-none" placeholder="Enter answer..." />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
