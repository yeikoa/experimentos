"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const routes = [
    { href: '/maintenance', name: 'Maintenance', subroutes: ['Reactive', 'Preventive'] },
    { href: '/magic', name: 'MagicLink' },
    {href: '/google', name: 'Google'},
    {href: '/ingresar', name: 'Ingresar'},
    { href: '/contact', name: 'Contacto' },
  ];

  return (
    <nav className="flex items-center justify-between p-2" style={{ backgroundColor: 'rgb(53, 53, 53)' }}>
      <div className="flex items-center">
        <Image src="/bus1.jpg" alt="Logo de la empresa" width={50} height={50} className='rounded-full' />
        <Link href="/">
          <span className="ml-2 text-white text-lg font-bold cursor-pointer">Inicio</span>
        </Link>
      </div>
      <div className="flex items-center">
        {routes.map((route) => (
          <div key={route.href} className="relative">
            {route.name === 'Maintenance' ? (
              <div className="relative">
                <span
                  className="text-white mr-4 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {route.name}
                </span>
                {showDropdown && route.subroutes && (
                  <div className="absolute z-10 bg-white rounded shadow-md py-2">
                    {route.subroutes.map((subroute) => (
                      <Link key={subroute} href={`/maintenance/${subroute.toLowerCase()}`}>
                        <span className="block text-gray-800 px-4 py-2 hover:bg-blue-100 cursor-pointer">
                          {subroute}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={route.href} href={route.href}>
                <span className="text-white mr-4 cursor-pointer">{route.name}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;