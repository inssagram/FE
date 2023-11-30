import Image from "next/image";
import styled from "styled-components";

interface SharedPostProps {
  image: string;
  memberNicknameInShareObject: string | null;
  shareObjectImage: string;
  shareObjectContents: string;
}

const SharedPost: React.FC<SharedPostProps> = ({
  image,
  memberNicknameInShareObject,
  shareObjectImage,
  shareObjectContents,
}) => {
  return (
    <PostContainer>
      <PostAccountArea>
        <Profile>
          <Image
            src={image ? image : "/images/noProfile.jpg"}
            alt="게시글 공유"
            width={32}
            height={32}
          />
        </Profile>
        <Id>{memberNicknameInShareObject}</Id>
      </PostAccountArea>
      <PostImageArea>
        <Image
          src={shareObjectImage ? shareObjectImage : "/images/noImage.svg"}
          alt="게시글 공유"
          width={269}
          height={269}
        />
      </PostImageArea>
      <PostContentsArea>{shareObjectContents}</PostContentsArea>
    </PostContainer>
  );
};

export default SharedPost;

const PostContainer = styled.div`
  width: 269px;
  min-height: 368px;
  margin-bottom: 20px;
`;

const PostAccountArea = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  background-color: #efefef;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-items: center;
  flex-direction: row;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  margin-left: 12px;
`;

const Id = styled.span`
  padding-left: 12px;
`;

const PostImageArea = styled.div`
  width: 269px;
  height: 269px;
`;

const PostContentsArea = styled.div`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  overflow: hidden;
  padding: 12px;
  background-color: #efefef;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: 13px;
`;
