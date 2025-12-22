import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CantoAccordion = ({ canto, isOpen, onToggle }) => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const accordionRef = useRef(null);

    useEffect(() => {
        if (isOpen && !loaded && !loading) {
            setLoading(true);
            fetch(`/data/sb/canto_${canto.id.split('_')[1]}.json`)
                .then(res => res.json())
                .then(data => {
                    setChapters(data.chapters);
                    setLoaded(true);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(`Error fetching chapters for Canto ${canto.number}:`, err);
                    setLoading(false);
                });
        }
    }, [isOpen, loaded, loading, canto.id, canto.number]);

    // Scroll into view when opened
    useEffect(() => {
        if (isOpen && accordionRef.current) {
            // Small timeout to allow the previous accordion to collapse (if any)
            // and the DOM layout to adjust slightly before scrolling
            setTimeout(() => {
                accordionRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }, [isOpen]);

    return (
        <div
            ref={accordionRef}
            className="mb-4 bg-brand-bg rounded-xl shadow-sm border border-brand-primary/10 overflow-hidden transition-all duration-300 ease-in-out scroll-mt-24"
        >
            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-200 ${isOpen ? 'bg-brand-accent/50' : 'hover:bg-brand-accent/20'
                    }`}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-bold transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`}>
                        {canto.number}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-brand-primary leading-tight">
                            {canto.title.split(':')[0]}
                        </h3>
                        <p className="text-sm text-brand-text/70 mt-0.5">
                            {canto.title.split(':').slice(1).join(':').trim()}
                        </p>
                    </div>
                </div>

                {/* Chevron Icon */}
                <svg
                    className={`w-5 h-5 text-brand-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Accordion Content */}
            <div
                className={`transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-2 border-t border-brand-primary/5 bg-brand-bg/50">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-brand-text/60 italic">Loading chapters...</div>
                    ) : (
                        <div className="space-y-1">
                            {chapters.map((chapter) => (
                                <Link
                                    key={chapter.id}
                                    to={`/sb/${canto.number}/${chapter.number}`}
                                    className="group flex items-start p-3 rounded-lg hover:bg-brand-primary/5 transition-colors"
                                >
                                    <img
                                        src="/icons/scroll.svg"
                                        alt=""
                                        className="w-5 h-5 mt-0.5 text-brand-secondary opacity-50 group-hover:opacity-100 transition-opacity mr-3 hidden sm:block"
                                        onError={(e) => { e.target.style.display = 'none'; }} // Hide if icon missing
                                    />
                                    <div>
                                        <span className="block text-sm font-medium text-brand-primary group-hover:text-brand-primary/80">
                                            Chapter {chapter.number}
                                        </span>
                                        <span className="block text-sm text-brand-text/80 leading-snug">
                                            {chapter.title.replace(/^CHAPTER [A-Z]+:\s*/i, '')}
                                        </span>
                                    </div>
                                    <div className="ml-auto pl-2 self-center opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary">
                                        &rarr;
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CantoAccordion;
