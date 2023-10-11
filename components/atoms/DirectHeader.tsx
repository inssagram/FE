import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { BackArrow } from "@/components/atoms/Icons";

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

const Account = styled.div``;

const NewDM = styled.div``;

const DirectHeader: React.FC = () => {
  return (
    <>
      <Header>
        <BackArrow />
        <Account>februaar</Account>
        <NewDM>
          <Link href="/direct/new">
            <FontAwesomeIcon icon={faPenToSquare} fontSize={24} />
          </Link>
        </NewDM>
      </Header>
    </>
  );
};

export default DirectHeader;
