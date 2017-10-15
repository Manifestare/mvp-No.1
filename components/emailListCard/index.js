import CSSTag from '@/components/CSSTag'
import style from './style.less'
import Link from 'next/link'

export function EmailListCard(props) {
  return (
    <Link>
      <a href={`/lists/${props.address}/members`} className="card">
        <div className="card-details">
          <p className="card-title">{props.name}</p>
          <p className="card-subscribers">{props.membersCount}</p>
          <p className="card-subscribers-description"># of subscribers</p>
        </div>
      </a>
    </Link>
  )
}

export function EmailListCardList(props) {
  return (
    <div className="card-holder">
      {props.children}
      <CSSTag style={style} />
    </div>
  )
}
