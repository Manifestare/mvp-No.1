import { Component } from 'react'
import { MainLayout } from '@/components/layouts/main'
import { EmailList, EmailListItem, Search, Category } from '@/components/email'

// should probably create a container with some of this logic
// the idea is that the email interface can be used for different sections of the app.
// pages would have the routing information, then pass that down to the container which would
// use the route data, filter data, sorting data etc to make search queries to the backend.

// This is to prevent us rewriting the same logic for all of the similar views.

export default class Inbox extends Component {
  static getInitialProps() {
    /*
      In the package.json file I had to add this line to make this only run on the server side:
      "browser": {
        "casual": false
      },
      This tells webpack not to ship the casual package to the client side.
      This is required because casual uses the node fs package when generating the fake data.
      This code should be moved to the backend in the future. If we want to generate send fake data,
      the front end should make normal calls and the backend should send the real/fake data in the format
      required based on the build environment and config options.
    */
    const casual = require('casual')

    casual.seed(123);

    function newEl(em) {
      return {
        name: casual.title,
        emails: new Array(em).fill(1).map(e => ({
          from: casual.email,
          subject: casual.sentence,
          content: casual.text
        }))
      }
    }

    return { data: { emailLists: new Array(2).fill(1).map(e => newEl(casual.integer(3, 20))) } }
  }
  render() {
    // Theseare being assembled here so that the layout components don't need to worry about passing data
    // through parent components with callbacks. Instead, pages and containers can just do that directly with
    // components they need.
    const filters = [<Search />]

    // email aggregate data should be given through a search query in the future. Then when getting the actual
    // data, it should be paginated and cached locally. I can't specify rules for caching on the server side right now.

    // This will grab all email lsits and give them to the email list component as categories
    const categories = this.props.data.emailLists.map(el => <Category name={el.name} count={el.emails.length} />)
    // This will add the "All" category. It will add up all of the emails from each category.
    categories.unshift(<Category name="All" count={this.props.data.emailLists.reduce((last, cur) => last + cur.emails.length, 0)} />)

    // at this point there should be a query the database based on the filters and categories to find the emails
    // right now this will just combine all results into a list of emails
    const emails = this.props.data.emailLists.reduce((last, cur) => last.concat(cur.emails), [])
    .map(e => (<EmailListItem from={e.from} subject={e.subject} content={e.content} />))
    return (
      <MainLayout>
        <EmailList
          filters={filters}
          categories={categories}
          emails={emails} />
      </MainLayout>
    )
  }
}
