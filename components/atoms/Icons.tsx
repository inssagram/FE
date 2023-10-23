import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Icon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const BackArrow = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <button
        type="button"
        onClick={goBack}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Icon icon={faArrowLeft} />
      </button>
    </>
  );
};

export const BackChevron = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <button
        type="button"
        onClick={goBack}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Icon icon={faChevronLeft} />
      </button>
    </>
  );
};
