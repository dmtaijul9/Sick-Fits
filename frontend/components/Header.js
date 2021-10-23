import React from 'react';
import Link from 'next/link';
import Nav from './Nav';

function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
        <Nav />
      </div>
    </header>
  );
}

export default Header;