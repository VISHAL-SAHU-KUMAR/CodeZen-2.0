import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import LiveDemo from '../components/home/LiveDemo';
import SuccessStories from '../components/home/SuccessStories';
import StatsCounter from '../components/home/StatsCounter';

export default function Home() {
  return (
    <>
      <Head>
        <title>AgriPredict360 - AI-Powered Agriculture</title>
        <meta name="description" content="Empowering farmers with AI-driven insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar and Footer are handled in _app.jsx */}
      <HeroSection />
      <StatsCounter />
      <Features />
      <LiveDemo />
      <SuccessStories />
    </>
  );
}
