import styled from "styled-components";


export const Container = styled.section`
    width: 100%;
    height: 95vh;
    background-color: white;
    color: white;
    overflow-y: scroll;
`

export const Article = styled.article`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`
// ----------------------------------------------------------------------------

export const Contents = styled.div`
    flex: 7;
    `

// ----------------------------------------------------------------------------
export const Details = styled.div`
    flex: 2;
    width: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    color: white;
    bottom: 0;
`

// ----------------------------------------------------------------------------


export const Profile = styled.div`
flex: 9;
display: flex;
padding: 10px;
`
export const ID = styled.span`
    margin-left: 12px;
`
export const Follow = styled.span`
`

// ----------------------------------------------------------------------------
export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    color: white;
    width: 20%;
    bottom: 0;
    right: 0;
    height: 40%;
    justify-content: space-around;
`

export const Paragraph = styled.div`
    flex: 3;
`
