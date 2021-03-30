import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { Link, PrimaryText } from '../../components/typography'
import { useEffect, useState } from 'react'
import { fetchAllRequests, IPictureRequest } from '../../api/requests'

export const Requests: React.FC<RouteComponentProps> = React.memo(() => {
  const [requests, setRequests] = useState<IPictureRequest[] | undefined>(undefined)

  useEffect(() => {
    fetchAllRequests().then(response => {
      setRequests(response.data.requests)
    })
  }, [setRequests])

  return (
    <CoreLayout withCategoriesLeftMenu={false}>
      <DefaultContent header="My requests" extraHeader={<Link to="/requests/new">New picture request</Link>}>
        <PrimaryText>These are your pictures requests</PrimaryText>

        <hr />

        {requests ? (
          <div>
            {requests.length === 0 && (
              <PrimaryText>
                No requests yet. <Link to="/requests/new">Create first!</Link>
              </PrimaryText>
            )}
            <ul>
              {requests.map(request => (
                <li key={request.id}>
                  <Link to={`/requests/${request.id}`}>
                    <PrimaryText>{request.name}</PrimaryText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <PrimaryText>Loading...</PrimaryText>
        )}
      </DefaultContent>
    </CoreLayout>
  )
})
