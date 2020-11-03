import React from "react";
import { createGlobalStyle } from "styled-components";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <React.Fragment>
    <GlobalStyle />
      <main>
        <Header />
        {children}
      </main>
    </React.Fragment>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
