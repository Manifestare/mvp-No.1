import CSSTag from '@/components/CSSTag'
import style from './category.less'

export function Category(props) {
  return (
    <div className="category">
      {props.name}({props.count})
      <CSSTag style={style} />
    </div>
  )
}
