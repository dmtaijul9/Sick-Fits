import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  background-color: red;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  font-size: 4rem;
  transform: skew(-7deg);
  a {
    text-decoration: none;
    color: white;
    padding-left: 0.5rem 1rem;
    text-transform: uppercase;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 5px solid var(--Black, Black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--black, black);
  }
`;

function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </HeaderStyles>
  );
}

export default Header;
