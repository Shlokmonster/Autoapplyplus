import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Upload } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        keywords: '',
        locations: '',
        autoApplyEnabled: false,
        coverLetterStyle: 'medium'
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/settings');
            const data = res.data;
            setSettings({
                keywords: data.keywords.join(', '),
                locations: data.locations.join(', '),
                autoApplyEnabled: data.autoApplyEnabled,
                coverLetterStyle: data.coverLetterStyle
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        try {
            await axios.post('http://localhost:5001/api/settings/resume-upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Resume uploaded successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Error uploading resume');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...settings,
                keywords: settings.keywords ? settings.keywords.split(',').map(s => s.trim()) : [],
                locations: settings.locations ? settings.locations.split(',').map(s => s.trim()) : []
            };

            await axios.post('http://localhost:5001/api/settings/update', payload);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Error saving settings');
        }
    };

    if (loading) return <p className="p-8">Loading settings...</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Settings</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Keywords (comma separated)</label>
                        <input
                            type="text"
                            name="keywords"
                            value={settings.keywords}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer, React Developer, Backend Intern"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Locations (comma separated)</label>
                        <input
                            type="text"
                            name="locations"
                            value={settings.locations}
                            onChange={handleChange}
                            placeholder="e.g. India, Remote, Bangalore"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter Style</label>
                        <select
                            name="coverLetterStyle"
                            value={settings.coverLetterStyle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="short">Short (Concise)</option>
                            <option value="medium">Medium (Standard)</option>
                            <option value="long">Long (Detailed)</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="autoApply"
                            name="autoApplyEnabled"
                            checked={settings.autoApplyEnabled}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-600 rounded"
                        />
                        <label htmlFor="autoApply" className="text-gray-700 font-medium">Enable Auto-Apply Engine</label>
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Resume Upload</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center pointer-events-none">
                                <Upload className="text-gray-400 mb-2" />
                                <p className="text-gray-500">Drag and drop, or click to browse</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Save size={18} /> Save Settings
                        </button>
                    </div>
                    {message && <p className={`text-center font-medium ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
                </form>
            </div>
        </div>
    );
};
export default Settings;
