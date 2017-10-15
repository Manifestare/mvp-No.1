import CSSTag from '@/components/CSSTag'
import style from './search.less'

export function Search(props) {
  const { searchUpdate } = props
  return (
    <div className="search">
      Search
      <CSSTag style={style} />
    </div>
  )
}
