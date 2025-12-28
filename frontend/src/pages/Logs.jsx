import { useState, useEffect } from 'react';
import axios from 'axios';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/applications');
            setLogs(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Application Logs</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-600">Date</th>
                            <th className="p-4 font-medium text-gray-600">Company</th>
                            <th className="p-4 font-medium text-gray-600">Job Title</th>
                            <th className="p-4 font-medium text-gray-600">Status</th>
                            <th className="p-4 font-medium text-gray-600">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50">
                                    <td className="p-4 text-gray-600">{new Date(log.appliedAt).toLocaleDateString()}</td>
                                    <td className="p-4 font-medium text-gray-900">{log.company}</td>
                                    <td className="p-4 text-gray-600">{log.jobTitle}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === 'success' ? 'bg-green-100 text-green-700' :
                                            log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {log.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{log.message}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {!loading && logs.length === 0 && <p className="p-6 text-center text-gray-500">No logs found.</p>}
            </div>
        </div>
    );
};
export default Logs;
