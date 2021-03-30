import * as React from 'react'
import styled from 'styled-components/macro'
import { TextButton } from 'src/components/Button'

export const SectionTabButton = styled(TextButton)<{ $isActive: boolean; $highlightColor?: string }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 17px;
  margin: 0 60px;
  padding: 18px 0;
  white-space: nowrap;
  border-bottom: ${({ theme, $isActive, $highlightColor }) =>
    $isActive ? `3px solid ${$highlightColor || theme.colors.green}` : '3px solid transparent'};
  transition: border-bottom-color 0.1s ease-out;
  &:focus {
    outline: 0;
    color: ${({ theme, $highlightColor }) => $highlightColor || theme.colors.green};
  }
`
