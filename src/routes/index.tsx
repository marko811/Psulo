import { Router } from '@reach/router'
import * as React from 'react'
import { Category } from './category'
import { Trending } from './trending'
import { Likes } from './likes'
import { Requests } from './requests'
import { NewRequest } from './requests/newRequest'
import { ShowRequest } from './requests/showRequest'

export const Routes: React.FC = React.memo(() => {
  return (
    <Router>
      <Trending path="/" />
      <Category path="category/:categoryId" />
      <Likes path="/likes" />
      <Requests path="/requests" />
      <NewRequest path="/requests/new" />
      <ShowRequest path="/requests/:id" />
    </Router>
  )
})
