import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ChapterList = () => {
    const { cantoId } = useParams();
    const [cantoData, setCantoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/data/sb/canto_${cantoId}.json`)
            .then(res => res.json())
            .then(data => {
                setCantoData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching canto ${cantoId}:`, err);
                setLoading(false);
            });
    }, [cantoId]);

    if (loading) return <div className="text-center py-10 text-brand-text">Loading Chapters...</div>;
    if (!cantoData) return <div className="text-center py-10 text-brand-text">Canto not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-6">
                <Link to="/sb" className="text-brand-primary hover:underline">&larr; Back to Cantos</Link>
            </div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">{cantoData.title}</h1>
            <h2 className="text-xl text-brand-text/80 mb-8">Chapters</h2>

            <div className="grid grid-cols-1 gap-4">
                {cantoData.chapters.map(chapter => (
                    <Link
                        key={chapter.id}
                        to={`/sb/${cantoId}/${chapter.number}`}
                        className="flex items-center p-4 bg-brand-accent rounded-lg shadow-sm hover:translate-x-1 transition-transform border border-brand-primary/10"
                    >
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-primary/10 text-brand-primary font-bold rounded-full mr-4">
                            {chapter.number}
                        </span>
                        <span className="text-lg font-medium text-brand-text">{chapter.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChapterList;
