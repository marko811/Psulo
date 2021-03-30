import styled from 'styled-components/macro'
import { Link as ReachRouterLink, Match } from '@reach/router'
import * as React from 'react'

interface IProps {
  to: string
  matchPath?: string
  highlightColor?: string
}

const TopMenuNavigationLinkStyled = styled(ReachRouterLink)<{ $isActive: boolean; $highlightColor?: string }>`
  &:hover {
    text-decoration: none;
    opacity: 1;
  }

  &:focus {
    outline: 0;
    color: ${({ theme, $highlightColor }) => $highlightColor || theme.colors.green};
  }

  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 17px;
  margin: 0 50px 0 50px;
  padding: 29px 0;
  white-space: nowrap;
  border-bottom: ${({ theme, $isActive, $highlightColor }) =>
    $isActive ? `3px solid ${$highlightColor || theme.colors.green}` : '3px solid transparent'};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.8')};
  transition: all 0.1s ease-out;
`

export const TopMenuNavigationLink: React.FC<IProps> = ({ to, matchPath, children, highlightColor }) => (
  <Match path={matchPath || to}>
    {({ match }) => (
      <TopMenuNavigationLinkStyled $isActive={Boolean(match)} $highlightColor={highlightColor} to={to}>
        {children}
      </TopMenuNavigationLinkStyled>
    )}
  </Match>
)
