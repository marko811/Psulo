import * as React from 'react'
import { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { CoreLayout } from '../../layouts/CoreLayout'
import { DefaultContent } from '../../layouts/DefaultContent'
import { Folder } from '../../components/Folders/Folder'
import styled from 'styled-components/macro'
import { H2, PrimaryText } from '../../components/typography'
import { CreateLike } from './CreateLike'
import { FetchLikes } from './FetchLikes'
import { DeleteLike } from './DeleteLike'
import { fetchPictures } from '../../api/pictures'

const Content = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 200px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`

export const Likes: React.FC<RouteComponentProps> = React.memo(() => {
  const color1 = '#608f78'
  const color2 = '#4845D8'
  const color3 = '#9b4753'

  const [samplePictureIds, setSamplePictureIds] = useState<number[]>([])

  useEffect(() => {
    fetchPictures(undefined, 1).then(result => {
      setSamplePictureIds(result.data.pictures.map(x => x.id))
    })
  }, [setSamplePictureIds])

  return (
    <CoreLayout withCategoriesLeftMenu={true}>
      <DefaultContent
        header={`Likes API tester`}
        subHeader="So you can play with API without leaving the browser.">
        <PrimaryText>
          We recommend you to get familiar with how likes API work. Turns out, the backend is not very stable,
          so make sure you handle error responses correctly.
          {samplePictureIds.length > 0 ? (
            <>
              <br />
              Here are some sample picture IDs from the Trending page for your convenience:{' '}
              {samplePictureIds.join(', ')}
            </>
          ) : null}
        </PrimaryText>
        <Container>
          <Folder color={color1}>
            <Content>
              <H2>Create a like</H2>
              <CreateLike />
            </Content>
          </Folder>
          <Folder color={color2}>
            <Content>
              <H2>Fetch likes</H2>
              <FetchLikes />
            </Content>
          </Folder>
          <Folder color={color3}>
            <Content>
              <H2>Delete a like</H2>
              <DeleteLike />
            </Content>
          </Folder>
        </Container>
      </DefaultContent>
    </CoreLayout>
  )
})
