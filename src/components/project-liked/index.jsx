import {
  Space,
  Badge,
  Button
} from 'antd'
import {
  LikeTwoTone,
  DislikeTwoTone
} from '@ant-design/icons'
const Likes = ({likedCount, dislikedCount, likedButton, dislikedButton}) => {
  return (
    <Space>
      <Badge 
        size="small" 
        count={likedCount} 
        color="#f5222d" 
        offset={[-10, 3]} 
      >
        <Button 
          type='link'
          icon={<LikeTwoTone twoToneColor='#f5222d'/>}
          onClick={likedButton}
        />
      </Badge>
      <Badge 
        size="small" 
        count={dislikedCount} 
        color="#1678ff" 
        offset={[-10, 3]} 
      >
        <Button 
          type='link'
          icon={<DislikeTwoTone twoToneColor='#1678ff'/>}
          onClick={dislikedButton}
        />
      </Badge>
    </Space>
  )
}
export default Likes