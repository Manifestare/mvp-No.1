import CSSTag from '@/components/CSSTag'
import style from './style.less'

function current(item, current) {
  return item === current ? "current" : ""
}

function SidebarItem(props) {
  const { nref, src, href, name } = props
  return (
    <a className={`item ${current(nref, props.current)}`} href={href}>
      <div className="image"><img src={src}  /></div>
      <span>{name}</span>
    </a>
  )
}

export default (props) => {
  return (
    <div className="sidebar">
      <SidebarItem nref="dashboard" name="Dashboard" src="/static/img/dashboard_icon.png" href="/" />
      <SidebarItem nref="inbox" name="Inbox" src="/static/img/inbox_icon.png" href="/inbox" />
      <SidebarItem nref="sent" name="Sent" src="/static/img/sent_icon.png" href="#" />
      <SidebarItem nref="drafts" name="Drafts" src="/static/img/drafts_icon.png" href="#" />
      <SidebarItem nref="compose" name="Compose Email" src="/static/img/compose_icon.png" href="#" />
      <hr/>
      <SidebarItem nref="lists" name="Lists" src="/static/img/lists_icon.png" href="/lists" />
      <SidebarItem nref="autoresponse" name="Autoresponder" src="/static/img/autoresponse_icon.png" href="#" />
      <SidebarItem nref="subscribers" name="Subscribers" src="/static/img/subscribers_icon.png" href="#" />
      <CSSTag style={style} />
    </div>
  )
}
