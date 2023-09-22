import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    height: 90vh;
    padding: 44px 0 48px 0;
    background-color: white;
    color: black;
`

export const Article = styled.article`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
// ----------------------------------------------------------------------------

export const Head = styled.div`
    width: 100%;
    flex: 0.5;
    padding: 14px 4px 14px 16px;
    display: flex;
    `

export const Profile = styled.div`
    flex: 9;
    display: flex;
    align-items: center;
`
export const ID = styled.span`
    margin-left: 12px;
`


export const More = styled.div`
    flex: 1;
    padding: 8px;
`

// ----------------------------------------------------------------------------

export const Contents = styled.div`
    flex: 7;
    position: relative;
`

export const ImageContent = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

// ----------------------------------------------------------------------------

export const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 2;
`

// ----------------------------------------------------------------------------

export const Buttons = styled.div`
    flex: 2;
    display: flex;
    `
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
`

export const Paragraph = styled.div`
    flex: 3;
`

export const Comment = styled.div`
    flex: 1;
`

export const AllComment =styled.div`
    flex: 1;
`
