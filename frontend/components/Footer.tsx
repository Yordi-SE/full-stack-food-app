'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Partner with us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Ride with us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Refund & Cancellation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">FOLLOW US</h3>
            <div className="flex space-x-4 mb-4">
              <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
            </div>
            <p className="text-gray-400 text-sm mb-4">Receive exclusive offers in your mailbox</p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 email-input"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">All rights Reserved © Your Company, 2021</p>
          <p className="text-gray-400 text-sm">Made with ❤️ by Themewagon</p>
        </div>
      </div>
    </footer>
  );
}