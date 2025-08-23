import banner from './assets/banner-roblux.png'
import CS from './assets/CS2.png'
import discord from './assets/discord2logo.png'
import DOTA from './assets/DOTA2.png'
import ingame from './assets/ingame.png'
import limited from './assets/limiteds.png'
import logo from './assets/logo.png'
import robluxface from './assets/roblux-face.png'
import rust from './assets/rust.png'
import bitcoin from './assets/bitcoin.png'
import litcoin from './assets/litcoin.png'
import ethereum from './assets/etheruim.png'
import crypto3 from './assets/crypto 3.png'
import crypto4 from './assets/crypto4.png'
import litecoin from './assets/litecoin.png'
import qrcode from './assets/bitcoin-qrcode.png'
import eth  from './assets/eth-qrcode.png'

import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  User,
  Github,
  Twitter,
  Youtube,
  X,
  Search
} from 'lucide-react';

// Import the content JSON
import contentData from './content/items.json';

// Image mapping for dynamic loading
const imageMap: Record<string, string> = {
  '/src/assets/banner-roblux.png': banner,
  '/src/assets/CS2.png': CS,
  '/src/assets/discord2logo.png': discord,
  '/src/assets/DOTA2.png': DOTA,
  '/src/assets/ingame.png': ingame,
  '/src/assets/limiteds.png': limited,
  '/src/assets/logo.png': logo,
  '/src/assets/roblux-face.png': robluxface,
  '/src/assets/rust.png': rust,
  '/src/assets/bitcoin.png': bitcoin,
  '/src/assets/litcoin.png': litcoin,
  '/src/assets/etheruim.png': ethereum,
  '/src/assets/crypto 3.png': crypto3,
  '/src/assets/crypto4.png': crypto4,
  '/src/assets/litecoin.png': litecoin,
  '/src/assets/bitcoin-qrcode.png': qrcode,
  '/src/assets/eth-qrcode.png': eth
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchUsername, setSearchUsername] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Auto-scroll reviews on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % contentData.trustpilot.mobileReviews.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchUsername.trim()) {
      setCurrentStep(2);
    }
  };

  const handlePaymentSelect = (paymentType: string) => {
    setSelectedPayment(paymentType);
    setTransactionId(`hLhzZH2XsdJfgfSZ5mUUPYPiizARgBwgvDvnJc9p`);
    setCurrentStep(3);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSearchUsername('');
    setSelectedPayment('');
    setTransactionId('');
    setShowError(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Create payment info from content data
  const paymentInfo: Record<string, { address: string; qr: string }> = {};
  contentData.modal.paymentMethods.forEach(method => {
    paymentInfo[method.id] = {
      address: method.address,
      qr: imageMap[method.qrCode]
    };
  });

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-4 sm:p-6">
            {/* Username Search */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg font-medium text-white mb-4 text-center">
                {contentData.modal.searchStep.title}
              </h4>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={contentData.modal.searchStep.placeholder}
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-colors"
                >
                  {contentData.modal.searchStep.buttonText}
                </button>
              </div>
            </div>

            {/* Account Requirements */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3 text-center">
                {contentData.modal.accountRequirements.title}
              </h4>
              <p className="text-gray-400 text-center mb-6 text-sm">
                {contentData.modal.accountRequirements.description}
              </p>
              
              <div className="flex justify-between items-center mb-6">
                {contentData.modal.accountRequirements.requirements.map((req, index) => (
                  <div key={index} className="text-center flex-1">
                    <div className="text-white font-medium text-xs sm:text-sm">{req.title}</div>
                    <div className="text-white font-medium text-xs sm:text-sm">{req.subtitle}</div>
                  </div>
                ))}
              </div>
              
              {/* Dotted line connecting requirements */}
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dotted border-red-500 transform -translate-y-1/2"></div>
                <div className="flex justify-between relative">
                  {contentData.modal.accountRequirements.requirements.map((_, index) => (
                    <div key={index} className="w-2 h-2 bg-red-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-4 sm:p-6">
            {/* Item Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{contentData.modal.items.playfulVampire.name}</h3>
              <p className="text-gray-400 text-sm mb-1">RAP: {contentData.modal.items.playfulVampire.rap}</p>
              <p className="text-gray-400 text-sm mb-6">Buyer: {contentData.modal.items.playfulVampire.buyer}</p>
              
              <div className="text-3xl sm:text-4xl font-bold text-white mb-6">${contentData.modal.items.playfulVampire.price}<span className="text-gray-400">.00</span></div>
              
              <p className="text-gray-300 text-sm mb-6 sm:mb-8">Please select a payment method:</p>
            </div>

            {/* Payment Methods */}
            {/* Payment Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
              {contentData.modal.paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 sm:p-6 text-center transition-colors border-2 border-transparent hover:border-orange-500"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 flex items-center justify-center">
                    {method.id === "crypto" ? (
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                        {method.images?.map((img, index) => (
                          <img
                            key={index}
                            src={imageMap[img]}
                            alt="Crypto"
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                          />
                        ))}
                      </div>
                    ) : (
                      method.image && (
                        <img
                          src={imageMap[method.image]}
                          alt={method.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                        />
                      )
                    )}
                  </div>
                  <div className="text-white font-medium text-sm sm:text-base mb-1">
                    {method.name}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">{method.symbol}</div>
                </button>
              ))}
            </div>

            
            {/* Transaction Info */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm mb-4">
                {contentData.modal.transactionMessages.step2}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Transaction ID - {transactionId}
              </p>
            </div>
          </div>
        );

      case 3:
        const selectedPaymentMethod = contentData.modal.paymentMethods.find(p => p.id === selectedPayment);
        return (
          <div className="p-4 sm:p-6">
            {/* Item Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{contentData.modal.items.clockworksShades.name}</h3>
              <p className="text-gray-400 text-sm mb-1">RAP: {contentData.modal.items.clockworksShades.rap}</p>
              <p className="text-gray-400 text-sm mb-6">Buyer: {contentData.modal.items.clockworksShades.buyer}</p>
              
              <div className="text-3xl sm:text-4xl font-bold text-white mb-6">${contentData.modal.items.clockworksShades.price}<span className="text-gray-400">.00</span></div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto px-2">
                {contentData.modal.transactionMessages.step3Warning.replace('{CURRENCY}', selectedPaymentMethod?.symbol.toUpperCase() || selectedPayment.toUpperCase())}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white p-3 sm:p-4 rounded-lg">
                <img 
                  src={paymentInfo[selectedPayment]?.qr} 
                  alt={`${selectedPayment} QR Code`} 
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mb-6 text-center px-2">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
                <span className="text-white text-xs sm:text-sm font-mono bg-transparent text-center break-all">
                  {paymentInfo[selectedPayment]?.address}
                </span>
                <button
                  onClick={() => copyToClipboard(paymentInfo[selectedPayment]?.address || "")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors whitespace-nowrap"
                >
                  {contentData.modal.transactionMessages.copyButton}
                </button>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-colors"
              >
                {contentData.modal.transactionMessages.backButton}
              </button>
            </div>

            {/* Transaction Info */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm mb-4 px-2">
                {contentData.modal.transactionMessages.step3Info}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Transaction ID - {transactionId}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Header */}
      <header className="bg-[#0e0e0e] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-8 sm:h-10 w-auto mr-2" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {contentData.header.navigation.map((item, index) => (
                  <a key={index} href={item.url} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {contentData.header.discordButton.enabled && (
                <button className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-black border border-red-600 rounded-md hover:bg-red-600/20 transition-colors">
                  <img 
                    src={discord}
                    alt="Discord logo"
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{contentData.header.discordButton.text}</span>
                </button>
              )}
              <button className="px-3 sm:px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors text-sm">
                {contentData.header.loginButton.text}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Game Categories */}
      {/* Desktop Banner */}
      <div className="hidden md:flex justify-center space-x-4">
        {contentData.gameCategories.map((category, index) => (
          <a key={index} href={category.url}>
            <div className="w-32 h-24 rounded-lg overflow-hidden bg-black flex items-center justify-center">
              <img src={imageMap[category.image]} alt={category.name} className="w-full h-full object-cover" />
            </div>
          </a>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden overflow-x-auto">
        <div className="flex flex-nowrap space-x-3">
          {contentData.gameCategories.map((category, index) => (
            <a key={index} href={category.url}>
              <div className="min-w-[8rem] h-24 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                <img src={imageMap[category.image]} alt={category.name} className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Trustpilot Reviews */}
      <div className="bg-[#0e0e0e] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
          {/* Desktop view */}
          <div className="hidden sm:flex items-center justify-center space-x-4 text-sm">
            {/* Left Text */}
            <span className="text-gray-300">{contentData.trustpilot.leftText}</span>

            {/* Red Star Boxes */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-red-600 w-5 h-5 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 2l2.39 7.26h7.63l-6.18 4.49 2.39 7.26L12 16.51l-6.18 4.5 2.39-7.26-6.18-4.49h7.63z" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Review Text */}
            <span className="text-white">{contentData.trustpilot.rating}</span>

            {/* Trustpilot Green Star + Text */}
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-green-500"
              >
                <path d="M12 2l2.39 7.26h7.63l-6.18 4.49 2.39 7.26L12 16.51l-6.18 4.5 2.39-7.26-6.18-4.49h7.63z" />
              </svg>
              <span className="text-green-500 font-semibold">Trustpilot</span>
            </div>
          </div>
          
          {/* Mobile carousel */}
          <div className="sm:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
              >
                {contentData.trustpilot.mobileReviews.map((review, index) => (
                  <div key={index} className="w-full flex-shrink-0 flex flex-col items-center justify-center text-sm px-4">
                    <span className="text-gray-300 mb-2">{review.text}</span>
                    {review.subtitle && (
                      <span className="text-white">{review.subtitle}</span>
                    )}
                    {index === 0 && (
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-red-600 w-4 h-4 flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="w-2.5 h-2.5"
                            >
                              <path d="M12 2l2.39 7.26h7.63l-6.18 4.49 2.39 7.26L12 16.51l-6.18 4.5 2.39-7.26-6.18-4.49h7.63z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    )}
                    {index === 1 && (
                      <div className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-green-500"
                        >
                          <path d="M12 2l2.39 7.26h7.63l-6.18 4.49 2.39 7.26L12 16.51l-6.18 4.5 2.39-7.26-6.18-4.49h7.63z" />
                        </svg>
                        <span className="text-green-500 font-semibold">Trustpilot</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-3 space-x-2">
                {contentData.trustpilot.mobileReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      currentReviewIndex === index ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative h-32 sm:h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageMap[contentData.hero.bannerImage]})` }}
      >
      </div>

      {/* Profile Section */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6 -mt-12 sm:-mt-16">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gray-700">
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 sm:w-16 sm:h-16 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">{contentData.profile.username}</h1>
          </div>
        </div>
      </div>

      {/* LIMITEDS Section */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
          {contentData.limiteds.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {contentData.limiteds.items.map((item) => (
            <div
              key={item.id}
              className="group bg-[#1c1c1c] rounded-lg p-3 sm:p-6 cursor-pointer overflow-hidden relative flex flex-col"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Image */}
              <div className="w-full h-32 sm:h-40 rounded-lg mb-3 overflow-hidden bg-[#1c1c1c] flex items-center justify-center">
                <img
                  src={imageMap[item.image]}
                  alt={item.name}
                  className="max-h-24 sm:max-h-36 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base text-center">
                {item.name}
              </h3>

              {/* RAP & Price */}
              <div className="flex justify-between items-center text-center">
                <div>
                  <div className="text-red-400 text-xs sm:text-sm font-semibold">RAP</div>
                  <div className="text-white font-bold text-sm sm:text-base">{item.rap}</div>
                </div>
                <div>
                  <div className="text-red-400 text-xs sm:text-sm font-semibold">Price</div>
                  <div className="text-white font-bold text-sm sm:text-base">${item.price}</div>
                </div>
              </div>

              {/* Animated bottom border */}
              <span className="absolute left-0 bottom-0 h-1 bg-red-500 w-0 transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo and Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="mb-4">
                <img 
                  src={logo} 
                  alt="Adurite Logo" 
                  className="h-8 sm:h-10 w-auto" 
                />
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <ul className="space-y-3">
                {contentData.footer.links.column1.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <ul className="space-y-3">
                {contentData.footer.links.column2.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact and Social */}
            <div>
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{contentData.footer.social.title}</h3>
                <div className="flex space-x-3">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div className="text-xs sm:text-sm text-gray-400">
                <p className="mb-1">Email: {contentData.footer.companyInfo.email}</p>
                <p className="font-semibold text-white mb-1">Main Business Address</p>
                <p className="mb-1">{contentData.footer.companyInfo.name}</p>
                {contentData.footer.companyInfo.address.map((line, index) => (
                  <p key={index} className="mb-1">{line}</p>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="flex space-x-2 mt-4">
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-600 rounded flex items-center justify-center text-xs text-white font-bold">M</div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-red-600 rounded flex items-center justify-center text-xs text-white font-bold">M</div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-black border border-gray-600 rounded flex items-center justify-center text-xs text-white font-bold">⋯</div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-800 rounded flex items-center justify-center text-xs text-white font-bold">V</div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              {contentData.footer.copyright}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed max-w-4xl mx-auto px-2">
              {contentData.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-black rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative p-4 sm:p-6 border-b border-gray-700">
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 ${currentStep >= 1 ? 'bg-red-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                    1
                  </div>
                  <div className={`w-8 sm:w-12 h-0.5 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-600'}`}></div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                    2
                  </div>
                  <div className={`w-8 sm:w-12 h-0.5 ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-600'}`}></div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                    3
                  </div>
                  <div className={`w-8 sm:w-12 h-0.5 ${currentStep >= 4 ? 'bg-red-600' : 'bg-gray-600'}`}></div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 ${currentStep >= 4 ? 'bg-red-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                    4
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {currentStep === 1 ? contentData.modal.items.playfulVampire.name : contentData.modal.items.clockworksShades.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    RAP: {currentStep === 1 ? contentData.modal.items.playfulVampire.rap : contentData.modal.items.clockworksShades.rap}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {currentStep === 1 ? `Seller: ${contentData.modal.items.playfulVampire.buyer}` : `Buyer: ${contentData.modal.items.clockworksShades.buyer}`}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs sm:text-sm">Total</div>
                  <div className="text-red-400 text-lg sm:text-2xl font-bold">
                    ${currentStep === 1 ? contentData.modal.items.playfulVampire.price : contentData.modal.items.clockworksShades.price}.00
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Modal Content */}
            {getStepContent()}

            {/* Disclaimer */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xs text-gray-400 text-center leading-relaxed px-2">
                {contentData.modal.disclaimer}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 sm:p-8 text-center mx-2">
            {/* Error Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            {/* Error Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{contentData.modal.error.title}</h3>
            
            {/* Error Message */}
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {contentData.modal.error.message}
            </p>
            
            {/* Try Again Button */}
            <button
              onClick={() => setShowError(false)}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base"
            >
              {contentData.modal.error.buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;