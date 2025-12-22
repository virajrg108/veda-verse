import React, { useState, useEffect } from 'react';
import CantoAccordion from '../../components/CantoAccordion';

const CantoList = () => {
    const [cantos, setCantos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCantoId, setOpenCantoId] = useState(null);

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

    const handleToggle = (id) => {
        setOpenCantoId(prev => (prev === id ? null : id));
    };

    if (loading) return <div className="text-center py-10 text-brand-text">Loading Cantos...</div>;

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold text-brand-primary mb-2">Srimad-Bhagavatam</h1>
                <p className="text-brand-text/80 italic">The Beautiful Story of the Personality of Godhead</p>
            </div>

            <div className="space-y-4">
                {cantos.map(canto => (
                    <CantoAccordion
                        key={canto.id}
                        canto={canto}
                        isOpen={openCantoId === canto.id}
                        onToggle={() => handleToggle(canto.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CantoList;
