import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 0 16px;
`;
const BackIcon = styled.div`
  padding-right: 12px;
`;
const Account = styled.div``;
const NewDM = styled.div``;

const DirectHeader: React.FC = () => {
  return (
    <>
      <Header>
        <BackIcon>
          <FontAwesomeIcon icon={faArrowLeft} fontSize={24} />
        </BackIcon>
        <Account>februaar</Account>
        <NewDM>
          <FontAwesomeIcon icon={faPenToSquare} fontSize={24} />
        </NewDM>
      </Header>
    </>
  );
};

export default DirectHeader;
