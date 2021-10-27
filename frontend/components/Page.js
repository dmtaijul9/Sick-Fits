import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import GlobalStyle from './styles/GlobalStyles';

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

function Page({ children }) {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};

export default Page;
