import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SC from './styled'
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Footer from '@/components/Footer'

export default function reels(){
    return (
        <>
            <SC.Container>
                <SC.Article>
                    <SC.Contents style={{position: 'relative'}}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            layout="fill"
                            objectFit="cover" // 이미지를 꽉 채우도록 설정
                        />
                    </SC.Contents>
                    <SC.Comment>
                        <SC.TextArea placeholder='메시지를 입력하세요'></SC.TextArea>
                    </SC.Comment>
                </SC.Article>
            </SC.Container>
        </>
    )
}
