import React from "react";
import Link from "next/link";
import Nav from "./Nav";
import styled from "styled-components";

const Logo = styled.h1`
  background-color: red;
  font-size: 4rem;
  margin-left: 2rem;
  transform: skew(-7deg);
  position: relative;
  z-index: 2;

  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;
const HeaderStyle = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

function Header() {
  return (
    <HeaderStyle>
      <div className="bar">
        <Logo>
          <Link href={"/"}>Sick fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </HeaderStyle>
  );
}

export default Header;
