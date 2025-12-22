import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-brand-accent/90 backdrop-blur-sm border-b border-brand-primary/20 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-brand-primary tracking-tight">
                        VedaVerse
                    </div>
                    <nav className="flex space-x-6">
                        <Link to="/" className="text-brand-text hover:text-brand-primary font-medium transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/about" className="text-brand-text hover:text-brand-primary font-medium transition-colors duration-200">
                            About
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-brand-text text-brand-bg py-6 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm opacity-90">
                        &copy; 2025 VedaVerse. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
