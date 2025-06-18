import React, { useState } from 'react';
import Header from '@/Components/common/Header';
import HeroSection from './HeroSection';
import ProductSlider from './ProductSlider';
import FAQSection from './FAQSection';
import LoadingScreen from '@/Components/loading/LoadingScreen';
import gsap from 'gsap';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  const handleShopNow = () => {
    console.log('Navigating to shop...');
    // Add navigation logic here
  };

  const handlePrevious = () => {
    console.log('Previous product slider');
    // Add slider navigation logic here
  };

  const handleNext = () => {
    console.log('Next product slider');
    // Add slider navigation logic here
  };
  
  // Handle the loading screen completion
  const handleLoadingComplete = () => {
    setLoading(false);
    
    // Animate the main content in
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      gsap.fromTo(mainContent, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out'
        }
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div id="main-content" className="min-h-screen bg-global-3 opacity-0">
          {/* Header */}
          <Header />
          
          {/* Hero Section */}
          <HeroSection onShopNow={handleShopNow} />
          
          {/* Product Slider Section */}
          <ProductSlider 
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
          
          {/* FAQ Section */}
          <FAQSection />
          
          {/* Footer */}
          <div className="relative w-full">
            {/* Background Text */}
            <div className="absolute left-[-115px] top-[553px] z-0">
              <span className="text-[420px] font-inter font-bold leading-[509px] text-global-3 uppercase opacity-50">
                skincare
              </span>
            </div>
            
            {/* Footer Content */}
            <div className="relative z-10 w-full h-[930px] bg-global-1">
              <div className="flex flex-col w-full h-[410px] px-[100px] py-[200px]">
                <div className="flex flex-row justify-between w-full h-[121px] mb-[180px]">
                  <div className="flex flex-col">
                    <h3 className="text-[60px] font-inter font-normal leading-[72px] text-global-5 mb-[0px] whitespace-pre-line">
                      Join The Skincare
                      Community Now.
                    </h3>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[30px] font-inter font-normal leading-[37px] text-global-5 mb-[1px]">
                      Get in Touch
                    </span>
                    <span className="text-[60px] font-inter font-normal leading-[73px] text-global-5">
                      contact.skincare.com
                    </span>
                  </div>
                </div>
                
                {/* Footer Links */}
                <div className="flex flex-row justify-between items-center w-full h-[30px]">
                  <div className="flex flex-row gap-x-[100px]">
                    <span className="text-xl font-inter font-normal leading-[25px] text-global-6 capitalize cursor-pointer hover:opacity-80 transition-all duration-300">
                      Facebook
                    </span>
                    <span className="text-xl font-inter font-normal leading-[25px] text-global-6 capitalize cursor-pointer hover:opacity-80 transition-all duration-300">
                      Instagram
                    </span>
                    <span className="text-xl font-inter font-normal leading-[25px] text-global-6 capitalize cursor-pointer hover:opacity-80 transition-all duration-300">
                      YouTube
                    </span>
                  </div>
                  
                  <div className="flex flex-row gap-x-[100px]">
                    <span className="text-xl font-inter font-normal leading-[25px] text-right text-global-6 cursor-pointer hover:opacity-80 transition-all duration-300">
                      Terms of Service
                    </span>
                    <span className="text-xl font-inter font-normal leading-[25px] text-right text-global-6 capitalize cursor-pointer hover:opacity-80 transition-all duration-300">
                      Privacy Policy
                    </span>
                    <span className="text-xl font-inter font-normal leading-[25px] text-right text-global-6 capitalize cursor-pointer hover:opacity-80 transition-all duration-300">
                      Cookies Policy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
