import * as React from 'react'
import { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { H3, Link, PrimaryText } from '../../components/typography'
import { fetchRequest, IPictureRequest } from '../../api/requests'

interface IRouteParams {
  id: string
}
export const ShowRequest: React.FC<RouteComponentProps<IRouteParams>> = React.memo(({ id }) => {
  const [request, setRequest] = useState<IPictureRequest | undefined>(undefined)

  useEffect(() => {
    fetchRequest(parseInt(id!, 10)).then(response => {
      setRequest(response.data)
    })
  }, [setRequest, id])

  return (
    <CoreLayout withCategoriesLeftMenu={false}>
      <DefaultContent header="Requests" extraHeader={<Link to="/requests">Back to requests list</Link>}>
        {request ? (
          <div>
            <H3>{request.name}</H3>
            <PrimaryText>
              Amount of pictures requested: {request.amountOfPictures}
              <br />
              Year requested: {request.year}
            </PrimaryText>
          </div>
        ) : (
          <PrimaryText>Loading...</PrimaryText>
        )}
      </DefaultContent>
    </CoreLayout>
  )
})
