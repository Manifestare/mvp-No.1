import CSSTag from '@/components/CSSTag'
import style from './style.less'
import Sidebar from '@/components/sidebar'
import { PageLayout, ContentArea, NavButtonArea, TitleArea, BreadcrumbsArea } from '@/components/layouts/page'
import { Breadcrumbs, BreadcrumbsItem } from '@/components/breadcrumbs'
import { HeaderTitle } from '@/components/headerTitle'
import { Header } from '@/components/head'
import Head from 'next/head'

export function MainLayout(props) {
  const { paths, title, description } = props
  const breadcrumbs = paths && paths.map((path, i) => (<BreadcrumbsItem key={i} link={path.link} name={path.name} />))
  return (
    <div className="main-layout">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="header-area">
        <Header />
      </div>
      <div className="sidebar-area">
        <Sidebar current={props.current} />
      </div>
      <div className="content-area">
          <PageLayout>
            {breadcrumbs && <BreadcrumbsArea>
              <Breadcrumbs>
                {breadcrumbs}
              </Breadcrumbs>
            </BreadcrumbsArea> }
            {(title || description) && <TitleArea>
              <HeaderTitle title={title} description={description} />
            </TitleArea> }
            <ContentArea>
              {props.children}
            </ContentArea>
          </PageLayout>
      </div>
      <CSSTag style={style} />
    </div>
  )
}
