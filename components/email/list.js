import CSSTag from '@/components/CSSTag'
import style from './list.less'
import { EmailListItem } from './listItem'

export function EmailList(props) {
  const { filters, categories, emails } = props
  const filterItems = filters.map(item => (<div className="filter">{item}</div>))
  const emailItems = emails.map(item => (<div className="email">{item}</div>))
  const categoryItems = categories.map(item => (<div className="category">{item}</div>))
  // const { searchUpdate, filterUpdate, categoriesUpdate } = props
  // const { filterOptions } = props
  // const search = filterOptions.search && (<Search update={searchUpdate} />)
  // const filter = filterOptions.filter && (<Filter update={filterUpdate} />)
  // const categories =
  //   filterOptions.categories &&
  //   filterOptions.categories.length > 0 &&
  //   filterOptions.categories.map(cat => (<div className="category">{cat}</div>))
  return (
    <div className="email-list">
      <div className="categories">{categoryItems}</div>
      <div className="filters">{filterItems}</div>
      <div className="email-items">{emailItems}</div>
      <CSSTag style={style} />
    </div>
  )
}
