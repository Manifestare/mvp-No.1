import CSSTag from '@/components/CSSTag'
import style from './listItem.less'

export function EmailListItem(props) {
  return (
    <div className="email-list-item">
      <div className="from">{props.from}</div>
      <div className="subject">{props.subject}</div>
      <div className="content">{props.content}</div>
      <CSSTag style={style}/>
    </div>
  )
}
