import React from 'react';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <section className="text-center py-12 md:py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
                    Welcome to <span className="text-brand-primary">VedaVerse</span>
                </h1>
                <p className="text-xl md:text-2xl text-brand-text/80 mb-8 max-w-2xl mx-auto">
                    Explore the timeless library of Vedic wisdom. Immerse yourself in spiritual knowledge.
                </p>
            </section>

            {/* Book Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Card 1: Bhagavad-gita */}
                <div className="bg-brand-accent rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-brand-primary/10 flex flex-col items-start">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-brand-primary mb-3">
                            Bhagavad-gita As It Is
                        </h2>
                        <p className="text-brand-text mb-6 leading-relaxed">
                            The eternal message of spiritual wisdom. A conversation between Arjuna and Krishna on the battlefield of Kurukshetra.
                        </p>
                    </div>
                    <button className="bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors px-6 py-2 rounded-lg font-semibold shadow-sm w-full md:w-auto">
                        Read Now
                    </button>
                </div>

                {/* Card 2: Srimad-Bhagavatam */}
                <div className="bg-brand-accent rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-brand-primary/10 flex flex-col items-start">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-brand-primary mb-3">
                            Srimad-Bhagavatam
                        </h2>
                        <p className="text-brand-text mb-6 leading-relaxed">
                            The spotless Purana dealing with pure devotional service. A comprehensive history of the universe and the science of God.
                        </p>
                    </div>
                    <button className="bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors px-6 py-2 rounded-lg font-semibold shadow-sm w-full md:w-auto">
                        Read Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
