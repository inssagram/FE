import * as SC from "./styled";
import CopyLinkButton from "../../atoms/CopyLinkButton";

interface EllipsisModalProps {
  handleAccountInfoClick: () => void;
  handleEtcClick: () => void;
  post: { id: string };
}

const EllipsisModal: React.FC<EllipsisModalProps> = ({
  handleAccountInfoClick,
  handleEtcClick,
  post,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.CopyLink>
          <CopyLinkButton linkToCopy={`localhost:3000/post/${post.id}`} />
        </SC.CopyLink>
        <SC.AccountInfo onClick={handleAccountInfoClick}>
          이 계정 정보
        </SC.AccountInfo>
        <SC.CloseBtn onClick={handleEtcClick}>취소</SC.CloseBtn>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

export default EllipsisModal;
