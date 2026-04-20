import React from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Fixed sidebar */}
      <div className="md:w-64 hidden md:block fixed h-full z-30">
        <SideNav />
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout
