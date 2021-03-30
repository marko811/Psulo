import * as React from 'react'
import styled from 'styled-components/macro'
import { darken } from 'polished'
import { HandleSvg } from './HandleSvg'

interface IProps {
  color: string
  gradientIntensity?: number
  children: React.ReactNode
  onClick?: () => void
}

const FolderWrapper = styled.div`
  display: flex;
  position: relative;
  padding-top: 10px;
  height: 100%;
`

const FolderContent = styled.div<{ color: string; gradientIntensity: number }>`
  position: relative;
  z-index: 2;
  min-width: 140px;
  min-height: 120px;
  background: ${({ color }) => color};
  background: ${({ color, gradientIntensity }) =>
    `linear-gradient(90deg, ${color} 0%, ${color} 35%, ${darken(gradientIntensity, color)} 100%)`};
  padding: 30px 20px 20px 20px;
  border-radius: 10px;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: ${({ color, gradientIntensity }) =>
      `linear-gradient(90deg, ${color} 0%, ${color} 35%, ${darken(gradientIntensity / 2, color)} 100%)`};
    transition: opacity 0.1s ease-out;
    z-index: 2;
    opacity: 0;
  }

  &:hover:after {
    opacity: 1;
  }

  > div {
    position: relative;
    z-index: 3;
    height: 100%;
  }
`

const HandleSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

export const Folder: React.FC<IProps> = ({ children, color, gradientIntensity, onClick }) => (
  <FolderWrapper onClick={onClick}>
    <FolderContent color={color} gradientIntensity={gradientIntensity ?? 0.1}>
      {/* Div required for the gradient animation */}
      <div>{children}</div>
    </FolderContent>
    <HandleSvgWrapper>
      <HandleSvg color={color} />
    </HandleSvgWrapper>
  </FolderWrapper>
)
