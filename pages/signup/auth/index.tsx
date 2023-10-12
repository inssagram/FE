import * as SC from '@/components/styled/signup_auth'
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import { BackArrow } from '@/components/atoms/Icons';



const Auth: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [authNumber, setAuthNumber] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/email')
        .then((response) => {
            const data = response.data
            const selectedEmail = data[data.length - 1].email
            setEmail(selectedEmail)
        }).catch((error) =>
            console.log(error)
        )
    })

    const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAuthNumber(e.target.value)
    }

    const submitHandler = () => {
        if(authNumber === ''){
            alert('인증번호를 입력해주세요')
        }else{
            axios.get('http://localhost:5000/auth')
            .then((response) => {
                const data = response.data[0].number
                console.log(data)
                if(authNumber === data){
                    alert('인증되었습니다.')
                    router.push('/signup/details')
                }else{
                    alert('인증번호가 맞지 않습니다.')
                }
            })
        }
    }


    return(
        <>
        <SC.Header>
            <BackArrow></BackArrow>
            <span>등록</span>
            <span></span>
        </SC.Header>
        <SC.Container>
            <SC.Contents>
                <SC.Title>인증코드 입력</SC.Title>
                <SC.Descriptions>
                    {email} 주소로 전송된 인증 코드를 입력하세요. 
                    <span style={{color: 'blue'}}>코드 재전송</span>
                </SC.Descriptions>
                <SC.AuthInput 
                type="number" placeholder='인증번호를 입력하세요'
                onChange={inputHandler}
                value={authNumber}
                ></SC.AuthInput>
                    <SC.SubmitButton onClick={submitHandler}>다음</SC.SubmitButton>
            </SC.Contents>
        </SC.Container>
        </>
    )
}
 
export default Auth