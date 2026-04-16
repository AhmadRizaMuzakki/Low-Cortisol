import React, { useState } from 'react';

/**
 * DashboardLayout
 * Struktur layout utama untuk Dashboard.
 * Mengelola state untuk Sidebar (Desktop/Mobile), Dark Mode, dan Dropdown.
 */
const DashboardLayout = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Fungsi toggle
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const togglePagesMenu = () => setIsPagesMenuOpen(!isPagesMenuOpen);
  const toggleTheme = () => setDark(!dark);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${dark ? 'dark' : ''}`}>
      
      {/* Desktop sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <SidebarContent 
          togglePagesMenu={togglePagesMenu} 
          isPagesMenuOpen={isPagesMenuOpen} 
        />
      </aside>

      {/* Mobile sidebar */}
      {isSideMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
            onClick={closeSideMenu}
          ></div>
          <aside
            className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition-all duration-300"
          >
            <SidebarContent 
              togglePagesMenu={togglePagesMenu} 
              isPagesMenuOpen={isPagesMenuOpen} 
            />
          </aside>
        </>
      )}

      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            
            {/* Mobile hamburger */}
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={toggleSideMenu}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Search input */}
            <div className="flex justify-center flex-1 lg:mr-32">
              <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                <div className="absolute inset-y-0 flex items-center pl-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                  type="text"
                  placeholder="Search for projects"
                />
              </div>
            </div>

            <ul className="flex items-center flex-shrink-0 space-x-6">
              {/* Theme toggler */}
              <li className="flex">
                <button className="rounded-md focus:outline-none" onClick={toggleTheme}>
                  {dark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </li>

              {/* Notifications menu */}
              <li className="relative">
                <button
                  className="relative align-middle rounded-md focus:outline-none"
                  onClick={toggleNotificationsMenu}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
                </button>
                {isNotificationsMenuOpen && (
                  <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                    <li className="flex"><a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">Messages <span className="text-red-600">13</span></a></li>
                    <li className="flex"><a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">Sales <span className="text-red-600">2</span></a></li>
                  </ul>
                )}
              </li>

              {/* Profile menu */}
              <li className="relative">
                <button
                  className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                  onClick={toggleProfileMenu}
                >
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=200"
                    alt="Profile"
                  />
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
                    <li className="flex"><a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">Profile</a></li>
                    <li className="flex"><a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">Settings</a></li>
                    <li className="flex"><a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">Log out</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

/**
 * SidebarContent Component
 * Konten sidebar dipisah agar tidak duplikasi antara desktop & mobile view.
 */
const SidebarContent = ({ togglePagesMenu, isPagesMenuOpen }) => (
  <div className="py-4 text-gray-500 dark:text-gray-400">
    <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
      Sistem Sekolah
    </a>
    <ul className="mt-6">
      <li className="relative px-6 py-3">
        <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"></span>
        <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 dark:text-gray-100" href="#">
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="ml-4">Dashboard</span>
        </a>
      </li>
    </ul>
    <ul>
      <li className="relative px-6 py-3">
        <button
          className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={togglePagesMenu}
        >
          <span className="inline-flex items-center">
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span className="ml-4">Pages</span>
          </span>
          <svg className={`w-4 h-4 transition-transform ${isPagesMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isPagesMenuOpen && (
          <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
            <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"><a className="w-full" href="#">Login</a></li>
            <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"><a className="w-full" href="#">Create account</a></li>
            <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"><a className="w-full" href="#">404</a></li>
          </ul>
        )}
      </li>
    </ul>
    <div className="px-6 my-6">
      <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
        Create account <span className="ml-2">+</span>
      </button>
    </div>
  </div>
);

export default DashboardLayout;