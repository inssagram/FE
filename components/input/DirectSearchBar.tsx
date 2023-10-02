import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.span``;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 4px 12px 4px 20px;
  font-size: 16px;
  color: #222;
  background-color: #fff;
`;

const SearchArea = styled.div`
  height: 100%;
`;

const DirectSearchBar = () => {
  return (
    <>
      <SearchBarContainer>
        <Title>받는 사람:</Title>
        <Input type="text" placeholder="검색..." />
        <SearchArea></SearchArea>
      </SearchBarContainer>
    </>
  );
};

export default DirectSearchBar;
