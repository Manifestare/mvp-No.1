import style from './style.less'
import CSSTag from '@/components/CSSTag'

export function Header() {
  return (
    <header>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="items">
          <div className="item">Profile</div>
          <div className="item">Support</div>
          <div className="item">Dashboard</div>
        </div>
      </div>
      <CSSTag style={style} />
    </header>
  )
}
