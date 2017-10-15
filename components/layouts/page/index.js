import React from 'react'
import CSSTag from '@/components/CSSTag'
import style from './style.less'

export function BreadcrumbsArea (props) {
  return (
    <div className="breadcrumbs-area">
      {props.children}
    </div>
  )
}
export function TitleArea (props) {
  return (
    <div className="title-area">
      {props.children}
    </div>
  )
}

export function NavButtonArea(props) {
  return (
    <div className="nav-button-area">
      {props.children}
    </div>
  )
}

export function ContentArea (props) {
  return (
    <div className="content-area">
      {props.children}
    </div>
  )
}

export function PageLayout(props) {
  const children = React.Children.toArray(props.children)
  const breadcrumbs = children.find(child => child.type.toString() === BreadcrumbsArea.toString())
  const title = children.find(child => child.type.toString() === TitleArea.toString())
  const content = children.find(child => child.type.toString() === ContentArea.toString())
  return (
    <div className="page-layout">
      {breadcrumbs}
      {title}
      {content}
      <CSSTag style={style} />
    </div>
  )
}
