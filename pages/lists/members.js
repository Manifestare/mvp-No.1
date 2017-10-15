import { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
import client from '@/services/graphql-client'
import CSSTag from '@/components/CSSTag'
import style from '@/css/page.less'
import { MainLayout } from '@/components/layouts/main'

export default class EmailLists extends Component {
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
              created_at
              members_count
            }
        }
        `)
        return data.allEmailLists
    }
    static async getInitialProps() {
        const data = await EmailLists.getLists()
        return { data }
    }
    static convertDate(date) {
      if(!date) return null
      const d = new Date(date)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
    }
    render() {
      return (
        <MainLayout
          current="lists"
          title="Members"
          description="Welcome to Manifestare"
          paths={[
            { link: '/', name:'Home' },
            { link: '/lists', name:'Email Lists' },
            { name: 'Members'}
          ]}>
          <div className="page-data">
              <table className="list-table">
                <thead>
                  <tr>
                      <th></th>
                      <th>Email</th>
                      <th>name</th>
                      <th>Date Created</th>
                      <th>Member Count</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((list, i) => (
                    <tr key={i}>
                        <td><input type="checkbox" name="vehicle" value="Bike" /></td>
                        <td>{list.address}</td>
                        <td>{list.name}</td>
                        <td>{EmailLists.convertDate(list.created_at)}</td>
                        <td>{list.members_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          <CSSTag style={style} />
        </MainLayout>
      )
    }
}
