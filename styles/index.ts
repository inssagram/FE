import styled from "styled-components";

export const StyledHeader = styled.div`
  .headerTop {
    width: 412px;
    height: 44px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
    position: fixed;
    background-color: #ffffff;
    color: #222222;
    z-index: 10;
  }
  .iconPannels {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.5rem;
  }
`;

export const StyledBody = styled.div`
  .body {
    width: 412px;
    height: 925px;
    background-color: whitesmoke;
    padding-top: 44px;
  }
`;

export const StyledFooter = styled.div`
  .footerBottom {
    width: 412px;
    height: 48px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0 16px;
  }
  .iconPannels {
    display: flex;
    align-items: center;
    gap: 3.5rem;
    font-size: 1.5rem;
  }
`;
