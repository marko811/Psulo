import * as React from 'react'
import styled from 'styled-components/macro'
import { useCallback, useEffect, useRef } from 'react'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  //2a 26 36
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 5%; /* Location of the box */
`

const ModalContent = styled.div`
  width: 80%;
  height: 90%;
  background-color: rgba(42, 38, 54, 1);
  margin: auto;
  padding: 20px;
`

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
`

interface IProps {
  children: React.ReactNode
  onClose: () => void
}

export const Modal: React.FC<IProps> = React.memo(({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'visible'
    }
  })

  const backdropRef = useRef<HTMLDivElement>(null)

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === backdropRef.current) {
        onClose()
      }
    },
    [onClose, backdropRef.current],
  )

  return (
    <>
      <Backdrop onClick={handleBackdropClick} ref={backdropRef}>
        <ModalContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {children}
        </ModalContent>
      </Backdrop>
    </>
  )
})
