import * as React from 'react'
import styled, { css } from 'styled-components/macro'
import { Link as ReachRouterLink, LinkProps } from '@reach/router'

const baseCss = css`
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`

export const H1 = styled.h1`
  ${baseCss};
  font-size: 44px;
  font-weight: bold;
`

export const H1Lite = styled.h1`
  ${baseCss};
  font-size: 44px;
  letter-spacing: -2px;
  opacity: 0.6;
  font-weight: 100;
`

export const H2 = styled.h2`
  ${baseCss};
  font-size: 26px;
`

export const H2Subtitle = styled.small`
  ${baseCss};
  font-size: 14px;
  line-height: 17px;
  opacity: 0.6;
`

const H2SmallPadding = styled(H2)`
  margin-bottom: 4px;
`

export const H2WithSubtitle: React.FC<{ subtitle: React.ReactNode; className?: string }> = ({
  children,
  subtitle,
  className,
}) => (
  <div className={className}>
    <H2SmallPadding>{children}</H2SmallPadding>
    <H2Subtitle>{subtitle}</H2Subtitle>
  </div>
)

export const H3 = styled.h3`
  ${baseCss};
  font-size: 20px;
  line-height: 28px;
`

export const H4 = styled.h4`
  ${baseCss};
  font-size: 18px;
  line-height: 28px;
  margin: 0;
`

const H4SpecialTitle = styled(H4)`
  font-size: 10px;
  font-weight: 200;
  padding-bottom: 0;
`

export const H4WithSpecialTitle: React.FC<{ title: string }> = ({ children, title }) => (
  <div>
    <H4SpecialTitle>{title}</H4SpecialTitle>
    <H4>{children}</H4>
  </div>
)

export const PrimaryText = styled.span`
  ${baseCss};
  font-size: 18px;
  line-height: 28px;
  opacity: 0.8;
`

export const SecondaryText = styled.span`
  ${baseCss};
  font-size: 12px;
  line-height: 16px;
  opacity: 0.8;
`

export const ErrorCode = styled.pre`
  ${baseCss};
  font-size: ${({ theme }) => theme.sizes[3]};
`

export const Link = styled(ReachRouterLink)`
  color: ${({ theme }) => theme.colors.green};
  transition: opacity linear 0.1s;
  font-weight: 600;

  svg {
    margin-right: 6px;
    path {
      fill: ${({ theme }) => theme.colors.green};
    }
  }

  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`

export const LinkWithIcon: React.FC<{ icon: React.ReactNode } & LinkProps<any>> = ({
  children,
  icon,
  ...rest
}) => (
  <Link {...(rest as any)}>
    {icon}
    {children}
  </Link>
)
