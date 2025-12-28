import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [isPaused, images.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section
            className="hero-carousel"
            aria-label="Promotions"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                marginBottom: 'var(--spacing-xl)',
                boxShadow: 'var(--shadow-lg)'
            }}
        >
            <div
                className="carousel-inner"
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                }}
            >
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${images.length}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: index === currentIndex ? 1 : 0
                        }}
                    />
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={goToPrev}
                className="carousel-control prev"
                aria-label="Previous Slide"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '1rem',
                    transform: 'translateY(-50%)',
                    background: 'rgba(58, 90, 64, 0.8)', // Primary color with opacity
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                }}
            >
                <FaChevronLeft />
            </button>

            <button
                onClick={goToNext}
                className="carousel-control next"
                aria-label="Next Slide"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    transform: 'translateY(-50%)',
                    background: 'rgba(58, 90, 64, 0.8)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                }}
            >
                <FaChevronRight />
            </button>

            {/* Indicators */}
            <div
                className="carousel-indicators"
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem'
                }}
            >
                {images.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)',
                            transition: 'background-color 0.3s'
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
