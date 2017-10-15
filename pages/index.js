import { MainLayout } from '@/components/layouts/main'

export default () => (
  <MainLayout
    current="dashboard"
    title="Dashboard"
    description="Welcome to Manifestare"
    paths={[
      { link: '/', name: 'Home' }
    ]}>
  </MainLayout>
)
