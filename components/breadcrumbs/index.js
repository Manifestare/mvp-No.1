import CSSTag from '@/components/CSSTag'
import style from './style.less'
import Link from 'next/link'


export function BreadcrumbsItem (props) {
  const { name, link } = props
  return (
    <li>{link ? <Link href={link}>{name}</Link> : name}</li>
  )
}

export function Breadcrumbs(props) {
  return (
    <div className="breadcrumb">
        <ul>
          {props.children}
        </ul>
        <CSSTag style={style} />
    </div>
  )
}
