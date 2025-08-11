'use client';

import React from 'react';
import NavBar from '../navbar/NavBar';

export default function DashboardShell({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
