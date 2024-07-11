'use client'

import '@/app/globals.css';

import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'; 
import { Book as BookIcon, Home as HomeIcon } from '@mui/icons-material';

import { ToastContainer } from 'react-toastify';
import Link from 'next/link'

import { SessionProvider } from "next-auth/react"

import SignInOutLink from '@/components/auth/sign-in-out-link';

export default function Layout({ children }) {

    return (
      <SessionProvider>
        <html>
          <body className="flex flex-col min-h-screen">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h1 className="text-xl">Boilerplate with a Book Management System</h1>
              <div id="signed-user" className="flex items-center">
                <SignInOutLink />
              </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
              <nav className="bg-gray-200 w-64 pr-2 pl-4 flex-shrink-0">
                <List>
                  <ListItemButton key={"Books"} component={Link} href="/books">
                    <ListItemIcon><BookIcon /></ListItemIcon>
                    <ListItemText primary={"Books"} />
                  </ListItemButton>
                </List>
              </nav>

              <main className="flex-1 p-4 overflow-auto">
                <ToastContainer />
                {children}
              </main>
            </div>

            <footer className="bg-gray-800 text-white text-center p-4">
              <p>Application Footer</p>
            </footer>
          </body>
        </html>
      </SessionProvider>
    );
};

