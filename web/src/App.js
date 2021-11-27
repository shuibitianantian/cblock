/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { MainPage } from "./pages/MainPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { IndustryInformation } from "./pages/IndustryInformation/IndustryInformation";

const styles = {
  header: css`
    position: -webkit-sticky;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    margin: 0px;
    font-size: 40px;
    height: 90px;
    color: white;
    font-family: "Audiowide", cursive;
    background-color: #38374f;
    color: #c5a872;
    z-index: 20;
  `,
  navigation: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    font-size: 24px;
    padding-right: 50px;
    color: rgba(255, 255, 255, 0.8);

    .nav {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.8);
    }
    p {
      &:hover {
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  `,
  teamName: css`
    margin-left: 30px;
  `,
  footer: css`
    position: -webkit-sticky;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    margin: 0px;
    font-size: 14px;
    height: 40px;
    color: white;
    font-family: "Audiowide", cursive;
    background-color: #38374f;
    color: #c5a872;
    z-index: 20;
  `,
};
function App() {
  return (
    <BrowserRouter>
      <div css={styles.page}>
        <div css={styles.header}>
          <p css={styles.teamName}>C-Block</p>
          <div css={styles.navigation}>
            <Link to='/' className='nav'>
              <p>Project Description</p>
            </Link>
            <Link to='industry_information' className='nav'>
              <p>Industry Information</p>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/industry_information'
            element={<IndustryInformation />}
          />
        </Routes>
        <div css={styles.footer}>Copyright Reserved by C-Block</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
