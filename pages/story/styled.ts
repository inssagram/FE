import styled from "styled-components";


export const Container = styled.section`
    width: 100%;
    height: 100vh;
    background-color: white;
    color: white;
    position: relative;
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
    width: 100%;
    height: 100%;
    `


// ----------------------------------------------------------------------------
export const Comment = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`

export const TextArea = styled.input`
    border-radius: 50px;
    width: 80%;
    border: 2px white solid;
    height: 40px;
    background-color: transparent;
    ::placeholder { 
    color: white;
  }

`