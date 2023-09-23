import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SC from './styled'
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";



export default function reels(){
    return (
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
                <SC.Details>
                    <SC.Profile style={{width: '100%', height: '100%', position: 'relative'}}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            style={{ borderRadius: '100%'}}
                            width={40}
                            height={40}
                            objectFit='contain'
                        />
                        <SC.ID>정호다 |</SC.ID><SC.Follow>팔로우</SC.Follow>
                    </SC.Profile>
                        <SC.Paragraph>아빠한테 하루종일 홍박사를 아냐고 물었더니.. #홍박사 #노이로제
                        … 더 보기</SC.Paragraph>
                </SC.Details>
                <SC.Buttons>
                    <FontAwesomeIcon icon={faHeart} fontSize={'25px'} />
                    <span>1.5만개</span>
                    <FontAwesomeIcon icon={faComment} fontSize={'25px'} />
                    <span>1.2천개</span>
                    <FontAwesomeIcon icon={faPaperPlane} fontSize={'25px'} />
                    <FontAwesomeIcon icon={faEllipsis} />
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                        alt="개"
                        style={{ borderRadius: '100%'}}
                        width={40}
                        height={40}
                    />
                </SC.Buttons>
            </SC.Article>
        </SC.Container>
    )
}