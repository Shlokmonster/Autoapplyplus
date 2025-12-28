import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/jobs');
            setJobs(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        try {
            // We will implement manual trigger later or let auto-apply handle it
            alert('Auto-apply engine will pick this up in the next run!');
        } catch (error) {
            console.error(error);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Job Listings</h2>
                <div className="flex gap-4">
                    <button
                        onClick={async () => {
                            try {
                                alert('Starting Scraper...');
                                await axios.get('http://localhost:5001/api/scraper/run');
                                alert('Scraper finished!');
                                fetchJobs();
                            } catch (e) {
                                alert('Scraper failed');
                            }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Run Scraper Now
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                alert('Starting Auto-Apply...');
                                await axios.post('http://localhost:5001/api/applications/run');
                                alert('Auto-Apply batch finished!');
                                fetchJobs();
                            } catch (e) {
                                console.error(e);
                                alert('Auto-Apply failed: ' + e.response?.data?.message || e.message);
                            }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Run Auto-Apply
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Job List */}
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <div className="grid gap-4">
                    {filteredJobs.length === 0 ? <p className="text-gray-500">No jobs found.</p> : null}
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                    <p className="text-gray-600">{job.company}</p>
                                    <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.source === 'LinkedIn' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {job.source}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(job.scrapedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {job.applied ? (
                                        <span className="flex items-center text-green-600 gap-1 font-medium">
                                            <CheckCircle size={16} /> Applied
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleApply(job._id)}
                                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors"
                                        >
                                            <Clock size={16} /> Queue Apply
                                        </button>
                                    )}
                                    <a
                                        href={job.applyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                                    >
                                        View <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Jobs;
