import styled from "styled-components";
import { keyframes } from "styled-components";
import Image from 'next/image';

export const Container = styled.section`
  width: 100%;
  height: 90vh;
  padding: 44px 0 48px 0;
  background-color: white;
  color: black;
  overflow-y: scroll;
`;

// ----------------------------------------------------------------------------
export const Stories = styled.ul`
  width: 100%;
  height: 10%;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  `;

export const StoryFlex = styled.div`
  display: flex;
`

export const Story = styled.li`
  width: 20%;
  height: 100%;
  display: inline-block;
  padding-left: 20px;
  position: relative;
`;

export const StoryID = styled.span`
  position: absolute;
  left: 28%;
  bottom: 10%;
`;

export const Clockwise = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

export const DonutRotate = keyframes`
  0% { transform: rotate(0) }
  50% { transform: rotate(-140deg) }
  100% { transform: rotate(0) }
`
export const noneAnimation = keyframes`
  0% { transform: rotate(0)}
  100% { transform: rotate(0)}
`

export const ImageICN = styled.div`
  position: absolute;
  opacity: 0.75;
  width: 40px; 
  height: 40px;
  animation: ${Clockwise} 500ms linear infinite;
  top: 10%;
`

export const ImageCUT = styled.div`
  position: relative;
  width: 20px;
  height: 40px;
  overflow: hidden;
`

export const ImageDonut = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid red;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  margin: 0;
  animation: ${DonutRotate} 1000ms cubic-bezier(.4,0,.22,1) infinite;
`

export const ImageTag = styled(Image)`
  border: 2px solid red;
  position: absolute;
  border-radius: 100%;
  top: 10%;
`





// ----------------------------------------------------------------------------

export const Article = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
// ----------------------------------------------------------------------------

export const Head = styled.div`
  width: 100%;
  flex: 0.5;
  padding: 14px 4px 14px 16px;
  display: flex;
`;

export const Profile = styled.div`
  flex: 9;
  display: flex;
  align-items: center;
`;
export const ID = styled.span`
  margin-left: 12px;
`;

export const More = styled.div`
  flex: 1;
  padding: 8px;
`;

// ----------------------------------------------------------------------------

export const Contents = styled.div`
  flex: 7;
  position: relative;
`;

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// ----------------------------------------------------------------------------

export const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
`;

// ----------------------------------------------------------------------------

export const Buttons = styled.div`
  flex: 2;
  display: flex;
`;
export const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50%;
  padding-right: 10px;
`;

export const RightIcon = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

// ----------------------------------------------------------------------------

export const Likes = styled.div`
  flex: 1;
`;

export const Paragraph = styled.div`
  flex: 3;
`;

export const Comment = styled.div`
  flex: 1;
`;

export const AllComment = styled.div`
  flex: 1;
`;
