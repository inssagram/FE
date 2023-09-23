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
                    <SC.ProgressBars>
                        <SC.Bar></SC.Bar>
                    </SC.ProgressBars>
                    <SC.Head>
                        <SC.Profile>
                            <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%'}}
                            />
                            <SC.ID>정호다</SC.ID>
                            <SC.PostedTime>6시간</SC.PostedTime>
                        </SC.Profile>
                        <SC.More>
                            <FontAwesomeIcon icon={faEllipsis} fontSize={'25px'}/>
                        </SC.More>
                    </SC.Head>
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
                        <FontAwesomeIcon icon={faHeart} fontSize={'25px'}/>
                        <FontAwesomeIcon icon={faPaperPlane} fontSize={'25px'}/>
                    </SC.Comment>
                </SC.Article>
            </SC.Container>
        </>
    )
}
