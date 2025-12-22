import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CantoList = () => {
    const [cantos, setCantos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/sb/cantos.json')
            .then(res => res.json())
            .then(data => {
                setCantos(data.cantos);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching cantos:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-brand-text">Loading Cantos...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-brand-primary mb-8 text-center">Srimad-Bhagavatam</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cantos.map(canto => (
                    <Link
                        key={canto.id}
                        to={`/sb/${canto.number}`}
                        className="block bg-brand-accent p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-brand-primary/10"
                    >
                        <h2 className="text-xl font-semibold text-brand-primary mb-2">Canto {canto.number}</h2>
                        <p className="text-brand-text opacity-90">{canto.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CantoList;
