import { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { saveSection, fetchSection } from '../../lib/cms';

export default function BrandEditor() {
    const { brand: defaultBrand, refetch } = useContent();
    const [form, setForm] = useState({ ...defaultBrand });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSection('brand').then((data) => {
            if (data) setForm(data);
        });
    }, []);

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSection('brand', form);
            await refetch();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            alert('Failed to save: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Brand Name', placeholder: 'Nowic Studio' },
        { name: 'tagline', label: 'Tagline', placeholder: 'Vision to Version' },
        { name: 'email', label: 'Email', placeholder: 'hello@nowicstudio.com' },
        { name: 'phone', label: 'Phone', placeholder: '+91 98765 43210' },
        { name: 'location', label: 'Location', placeholder: 'India 🇮🇳' },
        { name: 'logoPrimary', label: 'Logo URL', placeholder: '/image.png' },
    ];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#f0f0f3]">Brand Settings</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">Edit your brand identity and contact info.</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="admin-save-btn">
                    {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}</>}
                </button>
            </div>

            <div className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-6 space-y-5">
                {fields.map((f) => (
                    <div key={f.name}>
                        <label className="admin-label">{f.label}</label>
                        <input
                            type="text"
                            name={f.name}
                            value={form[f.name] || ''}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            className="admin-input"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
