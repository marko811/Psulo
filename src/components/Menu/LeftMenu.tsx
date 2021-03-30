import * as React from 'react'
import styled from 'styled-components/macro'
import { Link, Match } from '@reach/router'
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg'
import { ReactComponent as MinusIcon } from 'src/assets/minus.svg'

interface ISubItem {
  label: string
  hint?: string
  to: string
}

interface ITopMenuItemLink {
  id: string
  label: string
  to: string
}

interface ITopMenuItemGroup {
  id: string
  label: string
  subItems: ISubItem[]
}

export type ITopLevelMenuItem = ITopMenuItemLink | ITopMenuItemGroup

const isTopMenuItemLink = (item: ITopLevelMenuItem): item is ITopMenuItemLink =>
  Boolean((item as ITopMenuItemLink).to)

interface IProps {
  items: ITopLevelMenuItem[]
  initiallyExpanded?: string[]
}

interface ITopLevelItemProps {
  children: React.ReactNode
  isInitiallyExpanded: boolean
  item: ITopLevelMenuItem
}

const TopLevelWrapper = styled.div`
  width: 245px;
`

const subItemHeight = 48
const topItemHeight = 48
const TopLevelTrigger = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  height: ${topItemHeight}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  cursor: pointer;
`

const TopLevelLinkStyled = styled(Link)<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.dark : 'transparent')};
  transition: background-color 0.1s ease-out;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  height: ${topItemHeight}px;
  padding-left: 52px;
  &:hover {
    text-decoration: none;
  }
`

const SubLevelHint = styled.span`
  font-size: 12px;
  opacity: 0.4;
  text-align: right;
`

const IconWrapper = styled.div`
  margin: 0 20px;

  svg {
    vertical-align: middle;
    path {
      fill: ${({ theme }) => theme.colors.washedPurple};
    }
  }
`

const SubItemLinkStyled = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.dark : 'transparent')};
  transition: background-color 0.1s ease-out;
  height: ${subItemHeight}px;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
  &:hover {
    text-decoration: none;
    > span {
      opacity: 0.8;
    }
  }

  > span {
    opacity: 0.4;
    &:first-child {
      margin-left: 62px;
    }
    &:last-child {
      margin-right: 40px;
    }
  }
`

const SubItemLink: React.FC<{ to: string }> = props => (
  <Match path={props.to}>{({ match }) => <SubItemLinkStyled $isActive={Boolean(match)} {...props} />}</Match>
)

const SubItemLinksWrapper = styled.div<{ isExpanded: boolean; itemsCount: number }>`
  height: ${({ isExpanded, itemsCount }) => (isExpanded ? `${itemsCount * subItemHeight}px` : '0')};
  transition: height 0.25s ease-out;
  overflow: hidden;
`

const TopLevelLink: React.FC<{ to: string }> = ({ to, children }) => (
  <Match path={to}>
    {({ match }) => (
      <TopLevelLinkStyled $isActive={Boolean(match)} to={to}>
        {children}
      </TopLevelLinkStyled>
    )}
  </Match>
)

const TopLevelItem: React.FC<ITopLevelItemProps> = ({ children, item, isInitiallyExpanded }) => {
  const [isExpanded, setIsExpanded] = React.useState(isInitiallyExpanded)
  const toggle = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded, setIsExpanded])

  return (
    <TopLevelWrapper>
      {isTopMenuItemLink(item) ? (
        <TopLevelLink to={item.to}>{children}</TopLevelLink>
      ) : (
        <TopLevelTrigger onClick={toggle}>
          {<IconWrapper>{isExpanded ? <MinusIcon /> : <PlusIcon />}</IconWrapper>}
          {children}
        </TopLevelTrigger>
      )}
      {!isTopMenuItemLink(item) && (
        <SubItemLinksWrapper isExpanded={isExpanded} itemsCount={item.subItems.length}>
          {item.subItems.map((subItem, i) => (
            <SubItemLink to={subItem.to} key={`${subItem.to}-${i}`}>
              <span>{subItem.label}</span>
              {subItem.hint && <SubLevelHint>{subItem.hint}</SubLevelHint>}
            </SubItemLink>
          ))}
        </SubItemLinksWrapper>
      )}
    </TopLevelWrapper>
  )
}

export const LeftMenu: React.FC<IProps> = ({ items, initiallyExpanded }) => (
  <>
    {items.map((item, i) => (
      <TopLevelItem
        key={`${item.id}-${i}`}
        item={item}
        isInitiallyExpanded={Boolean(initiallyExpanded?.includes(item.id))}>
        {item.label}
      </TopLevelItem>
    ))}
  </>
)
