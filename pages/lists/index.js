import { Component } from 'react'
import { MainLayout } from '@/components/layouts/main'
import client from '@/services/graphql-client'
import { EmailListCardList, EmailListCard } from '@/components/emailListCard'

export default class Lists extends Component {
  constructor(props) {
      super(props)
      this.state = { data: props.data }
  }
  static async getLists() {
      const data = await client.request(`
      {
          allEmailLists {
            address
            name
            members_count
          }
      }
      `)
      return data.allEmailLists
  }
  static async getInitialProps() {
      const data = await Lists.getLists()
      return { data }
  }
  render() {
    return (
      <MainLayout
        current="lists"
        title="All Lists"
        description="Below are all the lists you have created"
        paths={[
          { link: '/', name: 'Home' },
          { link: '/lists', name: 'Email Lists'}
        ]}>
        <EmailListCardList>
          {this.state.data.map((list, index) => (
            <EmailListCard
              key={index}
              address={list.address}
              name={list.name}
              membersCount={list.members_count} />
          ))}
        </EmailListCardList>
      </MainLayout>
    )
  }
}
