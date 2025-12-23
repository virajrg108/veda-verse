import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerseDetail = () => {
    const { cantoId, chapterId, verseId } = useParams();
    const [verseData, setVerseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chapterData, setChapterData] = useState(null);

    useEffect(() => {
        // We fetch the entire chapter data to find the specific verse and allow navigation
        fetch(`/data/sb/canto_${cantoId}/chapter_${chapterId}.json`)
            .then(res => res.json())
            .then(data => {
                setChapterData(data);
                const verse = data.verses.find(v => v.id === `sb_${cantoId}_${chapterId}_${verseId}`);
                setVerseData(verse);
                setLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching chapter ${chapterId}:`, err);
                setLoading(false);
            });
    }, [cantoId, chapterId, verseId]);

    if (loading) return <div className="text-center py-10 text-brand-text">Loading Verse...</div>;
    if (!verseData) return <div className="text-center py-10 text-brand-text">Verse not found.</div>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            {/* Breadcrumbs */}
            <div className="mb-8 flex items-center text-sm text-brand-text/60">
                <Link to="/sb" className="hover:text-brand-primary">SB</Link>
                <span className="mx-2">/</span>
                <Link to={`/sb/${cantoId}`} className="hover:text-brand-primary">Canto {cantoId}</Link>
                <span className="mx-2">/</span>
                <Link to={`/sb/${cantoId}/${chapterId}`} className="hover:text-brand-primary">Chapter {chapterId}</Link>
                <span className="mx-2">/</span>
                <span className="text-brand-primary font-medium">{verseData.title}</span>
            </div>

            {/* Main Content */}
            <div className="bg-white/50 rounded-xl py-8 px-2 shadow-sm border border-brand-primary/10">
                <h1 className="text-3xl font-bold text-brand-primary mb-8 text-center">{verseData.title}</h1>

                {/* Sanskrit */}
                <div className="mb-8 text-center">
                    {verseData.sanskrit.split('\n').map((line, i) => (
                        <p key={i} className="text-xl md:text-2xl font-serif text-brand-text leading-loose mb-1">
                            {line}
                        </p>
                    ))}
                </div>

                {/* IAST */}
                <div className="mb-8 text-center">
                    {verseData.iast.split('\n').map((line, i) => (
                        <p key={i} className="text-lg text-brand-text/80 italic mb-1 font-serif">
                            {line}
                        </p>
                    ))}
                </div>

                {/* Synonyms */}
                <div className="mb-8 bg-brand-accent/30 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2">Synonyms</h3>
                    <p className="text-brand-text text-sm leading-relaxed">
                        {verseData.word_to_word}
                    </p>
                </div>

                {/* Translation */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2">Translation</h3>
                    <p className="text-lg font-medium text-brand-text leading-relaxed">
                        {verseData.translation}
                    </p>
                </div>

                {/* Purport */}
                <div className="prose prose-stone max-w-none">
                    <h3 className="text-sm font-bold text-brand-secondary uppercase tracking-wider mb-4">Purport</h3>
                    {verseData.purport.map((para, i) => (
                        <p key={i} className="text-brand-text leading-relaxed mb-4 text-justify">
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between mt-8 pt-4 border-t border-brand-primary/20">
                {verseData.prev_verse ? (
                    <Link
                        to={`/sb/${cantoId}/${chapterId}/${verseData.prev_verse}`}
                        className="flex items-center text-brand-primary hover:underline font-medium"
                    >
                        &larr; Previous Verse
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Previous</span>
                )}

                {verseData.next_verse ? (
                    <Link
                        to={`/sb/${cantoId}/${chapterId}/${verseData.next_verse}`}
                        className="flex items-center text-brand-primary hover:underline font-medium"
                    >
                        Next Verse &rarr;
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Next</span>
                )}
            </div>
        </div>
    );
};

export default VerseDetail;
