import * as SC from '@/components/styled/signup_details'
import React, {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import { BackButton } from '../../../components/backbutton';

const Details: React.FC = () => {
    const router = useRouter()
    const [nicknameSet, setNicknameSet] = useState(false)
    const [passwordSet, setPasswordSet] = useState(false)

    const [nickname, setNickname] = useState('')
    const [nicknameProcessState, setNicknameProcessState] = useState('')
    const [wrongWayNickname, setWrongWayNickname] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordProcessState, setPasswordProcessState] = useState('')
    const [wrongWayPassword, setWrongWayPassword] = useState(false)
    
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordCheckProcessState, setPasswordCheckProcessState] = useState('')
    const [wrongWayPasswordCheck, setWrongWayPasswordCheck] = useState(false)
    const inputNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
    }

    const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const inputPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value)
    }

    const nicknameHandler = () => {
        const nicknamePattern = /^[A-Za-z0-9._]*$/
        if(nickname.length === 0){
            setNicknameProcessState('닉네임을 작성해주세요')
            setWrongWayNickname(true)
            setNicknameSet(false)
            return
        }else if(nickname.length > 15 || nickname.length < 2){
            setNicknameProcessState('닉네임은 최소 2글자 최대 15글자 이하로 작성할 수 있습니다.')
            setWrongWayNickname(true)
            setNicknameSet(false)
            return
        }else if(!nicknamePattern.test(nickname)){
            setNicknameProcessState('닉네임은 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.')
            setWrongWayNickname(true)
            setNicknameSet(false)
            return
        }else{
            axios.get('http://localhost:5000/nickname')
            .then((response) => {
                const data = response.data
                const filtered = data.filter((v: any) => v.nickname === nickname)
                if(filtered.length === 0){
                    setNicknameProcessState('')
                    setWrongWayNickname(false)
                    setNicknameSet(true)
                }else{
                    setNicknameProcessState('중복된 계정이 있습니다.')
                    setWrongWayNickname(true)
                    setNicknameSet(false)
                    return
                }
            })
        }
    }

    const passwordHandler = () => {
        const passwordPattern =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/
        if(password.length === 0){
            setPasswordProcessState('비밀번호를 입력해주세요')
            setWrongWayPassword(true)
            setPasswordSet(false)
            return
        }else if(password.length < 10){
            setPasswordProcessState('비밀번호는 10자 이상이어야 합니다.')
            setWrongWayPassword(true)
            setPasswordSet(false)
            return
        }else if(!passwordPattern.test(password)){
            setPasswordProcessState('비밀번호는 영문 대소문자 숫자 특수문자가 포함되어야 합니다.')
            setWrongWayPassword(true)
            setPasswordSet(false)
            return
        }else{
            setPasswordProcessState('')
            setWrongWayPassword(false)
        }
    }

    const passwordCheckHandler = () => {
        if(password !== passwordCheck){
            setPasswordCheckProcessState('설정한 비밀번호와 일치하지 않습니다')
            setWrongWayPasswordCheck(true)
            setPasswordSet(false)
        }else{
            setPasswordCheckProcessState('')
            setWrongWayPasswordCheck(false)
            setPasswordSet(true)
        }
    }

    const setHandler = () => {
        if(passwordSet && nicknameSet){
            alert('아이디와 비밀번호가 설정 되었습니다')
            router.push('/signup/job')
        }else{
            alert('계정 정보가 잘못입력 되었습니다')
        }
    }

    return(
        <>
        <SC.Header>
            <BackButton></BackButton>
            <span>등록</span>
            <span></span>
        </SC.Header>
        <SC.Container>
            <SC.Contents>
                <SC.Title>추가정보 입력</SC.Title>
                <SC.Descriptions>
                    친구들이 회원님을 찾을 수 있도록 개인정보를 추가해주세요
                </SC.Descriptions>
                <SC.InputBox>
                    <SC.Input
                        type="string" placeholder='사용할 닉네임을 입력하세요'
                        onChange={inputNicknameHandler} value={nickname}
                        onBlur={nicknameHandler} style={{borderColor: wrongWayNickname ? 'red' : 'transparent'}}>
                    </SC.Input>
                    <SC.Input
                        type="password" placeholder='비밀번호를 입력하세요'
                        onChange={inputPasswordHandler} value={password}
                        onBlur={passwordHandler} style={{borderColor: wrongWayPassword ? 'red' : 'transparent' , fontFamily:'Aria'}}>
                    </SC.Input>
                    <SC.Input 
                        type="password" placeholder='비밀번호를 재확인 해주세요'
                        onChange={inputPasswordCheckHandler} value={passwordCheck}
                        onBlur={passwordCheckHandler} style={{borderColor: wrongWayPasswordCheck ? 'red' : 'transparent', fontFamily:'Aria'}}
                        >

                    </SC.Input>
                </SC.InputBox>
                <SC.ProcessState>
                    {nicknameProcessState}
                    <br></br>
                    {passwordProcessState}
                    <br></br>
                    {passwordCheckProcessState}
                </SC.ProcessState>
                <SC.SubmitButton onClick={setHandler}>다음</SC.SubmitButton>
            </SC.Contents>
        </SC.Container>
        </>
    )
}

export default Details