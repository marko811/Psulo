import * as React from 'react'
import { useCallback, useContext } from 'react'
import { PictureModalContext } from '../components/PictureModalContext/context'
import { Modal } from '../components/Modal'
import { ASSETS_ENDPOINT } from '../api/config'
import styled from 'styled-components/macro'
import { H3, PrimaryText } from 'src/components/typography'

const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
`

const Column = styled.div`
  height: 100%;
`
const Image = styled.img`
  //width: 100%;
  height: 100%;
`
export const PicturePreviewModal: React.FC = React.memo(() => {
  const { openedPicture, openPicture } = useContext(PictureModalContext)

  const handleClose = useCallback(() => {
    openPicture(undefined)
  }, [openedPicture])

  if (!openedPicture) return null

  return (
    <Modal onClose={handleClose}>
      <Content>
        <Column>
          <Image src={ASSETS_ENDPOINT + openedPicture.urls.regular} />
        </Column>
        <Column>
          <H3>Picture info</H3>
          <hr />
          <p>
            <PrimaryText>ID: #{openedPicture.id}</PrimaryText>
          </p>
          <p>
            <PrimaryText>
              Dimensions: {openedPicture.width}px&times;{openedPicture.height}px
            </PrimaryText>
          </p>
          <p>
            <PrimaryText>Name: {openedPicture.name}</PrimaryText>
          </p>
        </Column>
      </Content>
    </Modal>
  )
})
