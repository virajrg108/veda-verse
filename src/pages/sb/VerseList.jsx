import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerseList = () => {
    const { cantoId, chapterId } = useParams();
    const [chapterMetadata, setChapterMetadata] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/data/sb/canto_${cantoId}/metadata_chapter_${chapterId}.json`)
            .then(res => res.json())
            .then(data => {
                setChapterMetadata(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching metadata for chapter ${chapterId}:`, err);
                setLoading(false);
            });
    }, [cantoId, chapterId]);

    if (loading) return <div className="text-center py-10 text-brand-text">Loading Verses...</div>;
    if (!chapterMetadata) return <div className="text-center py-10 text-brand-text">Chapter data not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-6 flex items-center text-sm text-brand-primary">
                <Link to="/sb" className="hover:underline">SB</Link>
                <span className="mx-2">/</span>
                <Link to={`/sb/${cantoId}`} className="hover:underline">Canto {cantoId}</Link>
            </div>

            <h1 className="text-3xl font-bold text-brand-primary mb-2">
                {chapterMetadata.verseTitle ? chapterMetadata.verseTitle : `Chapter ${chapterId}`}
            </h1>
            <h2 className="text-xl text-brand-text/80 mb-8 italic">{chapterMetadata.chapter_title}</h2>

            <div className="space-y-4">
                {chapterMetadata.verses_list.map(verse => (
                    <Link
                        key={verse.id}
                        to={`/sb/${cantoId}/${chapterId}/${verse.id.split('_').pop()}`}
                        className="block p-5 bg-brand-accent rounded-lg shadow-sm hover:shadow-md transition-shadow border border-brand-primary/10"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                            <span className="font-bold text-brand-primary text-lg">{verse.verseTitle}</span>
                        </div>
                        <p className="text-brand-text leading-relaxed line-clamp-2 md:line-clamp-none">
                            {verse.translation}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VerseList;
