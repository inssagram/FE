import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SC from '../styles/story' 
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { faBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";



export default function story(){
    return (
        <SC.Container>
            <SC.Article>
                <SC.Contents>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                        alt="개"
                        style={{width: '100%', height: '100%'}}
                        />
                </SC.Contents>
                <SC.Details>
                <SC.Profile>
                        <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                        alt="개"
                        style={{borderRadius: '100%',height:'20px',width:'20px'}}
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
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                    alt="개"
                    style={{borderRadius: '100%',height:'20px',width:'20px'}}
                    />
                </SC.Buttons>
            </SC.Article>
        </SC.Container>
    )
}
