import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background: #fff !important;
        padding: 100px;
        z-index: 10000;
    }
`;

const App: React.FC = () => {
  return (
    <GlobalStyle>
      <h1>sksksk</h1>
    </GlobalStyle>
  );
};

export default App;
