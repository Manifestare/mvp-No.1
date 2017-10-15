import CSSTag from '@/components/CSSTag'
import style from './style.less'

export function HeaderTitle(props) {
  return (
    <div className="page-title">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <CSSTag style={style} />
    </div>
  )
}
