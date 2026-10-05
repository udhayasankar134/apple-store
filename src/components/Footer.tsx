import React from 'react';
import { CategoryId } from '../types/store';

interface FooterProps {
  onSelectCategory: (category: CategoryId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#F5F5F7] border-t border-black/5 text-[#86868B] text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Footnotes & Legal disclosures */}
        <div className="space-y-2 border-b border-black/10 pb-6 text-[11px] leading-relaxed">
          <p>
            1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to an Apple Gift Card.
          </p>
          <p>
            2. Apple Intelligence is available in beta on all iPhone 16 models, iPhone 15 Pro, and Mac and iPad with M1 and later, with Siri and device language set to English (U.S.), as part of iOS 18, iPadOS 18, and macOS Sequoia.
          </p>
          <p>
            3. Apple Card Monthly Installments (ACMI) is a 0% APR payment option that is only available if you select it at checkout in the U.S. for eligible products purchased at Apple Store locations, apple.com, the Apple Store app, or by calling 1-800-MY-APPLE.
          </p>
        </div>

        {/* Directory links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pt-2">
          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Shop and Learn</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('mac')} className="hover:underline hover:text-[#1D1D1F]">
                  Mac
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ipad')} className="hover:underline hover:text-[#1D1D1F]">
                  iPad
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('iphone')} className="hover:underline hover:text-[#1D1D1F]">
                  iPhone
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('watch')} className="hover:underline hover:text-[#1D1D1F]">
                  Apple Watch
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('airpods')} className="hover:underline hover:text-[#1D1D1F]">
                  AirPods
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Apple Wallet</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Wallet</li>
              <li className="hover:underline cursor-pointer">Apple Card</li>
              <li className="hover:underline cursor-pointer">Apple Pay</li>
              <li className="hover:underline cursor-pointer">Apple Cash</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Apple Store</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Find a Store</li>
              <li className="hover:underline cursor-pointer">Genius Bar</li>
              <li className="hover:underline cursor-pointer">Today at Apple</li>
              <li className="hover:underline cursor-pointer">Apple Camp</li>
              <li className="hover:underline cursor-pointer">Apple Trade In</li>
              <li className="hover:underline cursor-pointer">Order Status</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">For Business</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Apple and Business</li>
              <li className="hover:underline cursor-pointer">Shop for Business</li>
              <li className="hover:underline cursor-pointer">Apple and Education</li>
              <li className="hover:underline cursor-pointer">Shop for University</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Apple Values</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Accessibility</li>
              <li className="hover:underline cursor-pointer">Education</li>
              <li className="hover:underline cursor-pointer">Environment</li>
              <li className="hover:underline cursor-pointer">Inclusion and Diversity</li>
              <li className="hover:underline cursor-pointer">Privacy</li>
              <li className="hover:underline cursor-pointer">Racial Equity and Justice</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Sales and Refunds</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Legal</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Site Map</span>
          </div>
          <div className="font-medium text-[#1D1D1F]">
            United States
          </div>
        </div>
      </div>
    </footer>
  );
};
