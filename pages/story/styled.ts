import styled from "styled-components";


export const Container = styled.section`
    width: 100%;
    height: 100vh;
    background-color: white;
    color: white;
    position: relative;
    transform-style: preserve-3d;
`


export const Article = styled.article`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    &.cube1{
        transform: rotateY(0deg) translateZ(calc(100vw / 2));
    }
    &.cube2{
        transform: rotateY(90deg) translateZ(calc(100vw / 2));
    }
    &.cube3{
        transform: rotateY(180deg) translateZ(calc(100vw / 2));
    }
    &.cube4{
        transform: rotateY(270deg) translateZ(calc(100vw / 2));
    }
`
// ----------------------------------------------------------------------------
export const ProgressBars = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    background-color: transparent;
    z-index: 1;
    justify-content: center;
    align-items: center;
`

export const Bar = styled.div`
    width: 95%;
    height: 20%;
    background-color: white;
    border-radius: 10px;
`

// ----------------------------------------------------------------------------

export const Head = styled.div`
    width: 100%;
    flex: 0.5;
    padding: 14px 4px 14px 16px;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    `

export const Profile = styled.div`
    flex: 9;
    display: flex;
    align-items: center;
`
export const ID = styled.span`
    margin-left: 12px;
`

export const PostedTime = styled.span`
    color: gray;
    margin-left: 12px;
`


export const More = styled.div`
    flex: 1;
    padding: 8px;
`


// ----------------------------------------------------------------------------

export const Contents = styled.div`
    width: 100%;
    height: 100%;
    `


// ----------------------------------------------------------------------------
export const Comment = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
`

export const TextArea = styled.input`
    color: white;
    border-radius: 50px;
    width: 70%;
    border: 2px white solid;
    height: 100%;
    background-color: transparent;
    ::placeholder {
    color: deepPink;
  }
  padding-left: 15px;
`