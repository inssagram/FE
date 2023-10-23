import Image from "next/image";
import * as SC from "./styled";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

interface AccountInfoModalProps {
  handleInfoClose: () => void;
  post: { profileUrl: string; name: string };
}

const AccountInfoModal: React.FC<AccountInfoModalProps> = ({
  handleInfoClose,
  post,
}) => {
  return (
    <SC.ModalBackdrop>
      <SC.ModalContent>
        <SC.ModalTitle>이 계정 정보</SC.ModalTitle>
        <SC.InfoContent>
          <SC.AccountArea>
            <SC.Profile>
              <Image
                src={post.profileUrl}
                alt="프로필"
                width={78}
                height={78}
                style={{ borderRadius: "100%" }}
              />
            </SC.Profile>
            <SC.Id>{post.name}</SC.Id>
          </SC.AccountArea>
          <SC.InfoArea>
            <SC.Detail>
              <SC.Icon icon={faCalendarDays} fontSize={24} />
              <SC.Infos>
                <SC.SubTitle>가입한 날짜</SC.SubTitle>
                <SC.SubContent>2023년 10월</SC.SubContent>
              </SC.Infos>
            </SC.Detail>
            <SC.Detail>
              <SC.Icon icon={faLocationDot} fontSize={24} />
              <SC.Infos>
                <SC.SubTitle>계정 기본 위치</SC.SubTitle>
                <SC.SubContent>대한민국</SC.SubContent>
              </SC.Infos>
            </SC.Detail>
          </SC.InfoArea>
        </SC.InfoContent>
        <SC.CloseBtn onClick={handleInfoClose}>닫기</SC.CloseBtn>
      </SC.ModalContent>
    </SC.ModalBackdrop>
  );
};

export default AccountInfoModal;
