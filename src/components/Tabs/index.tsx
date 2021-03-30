import * as React from 'react'
import styled from 'styled-components/macro'

export interface IButtonTab {
  id: string
  label: string
}

export const LinkList = styled.div`
  width: 100%;
  display: flex;
`

interface IButtonTabsProps {
  selectedTab: string
  TabLinkComponent: React.ComponentType<{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    $isActive: boolean
    $highlightColor?: string
  }>
  onChange: (id: string) => void
  tabs: IButtonTab[]
  highlightColor?: string
}

export const ButtonTabs: React.FC<IButtonTabsProps> = React.memo(
  ({ onChange, selectedTab, tabs, TabLinkComponent, highlightColor }) => (
    <LinkList>
      {tabs.map(tab => (
        <TabLinkComponent
          key={tab.id}
          $isActive={tab.id === selectedTab}
          $highlightColor={highlightColor}
          onClick={() => {
            onChange(tab.id)
          }}>
          {tab.label}
        </TabLinkComponent>
      ))}
    </LinkList>
  ),
)

export interface ILinkTab {
  to: string
  matchPath?: string
  highlightColor?: string
  label: string
}
interface ILinkTabsProps {
  TabLinkComponent: React.ComponentType<{ to: string; matchPath?: string; highlightColor?: string }>
  tabs: ILinkTab[]
  highlightColor?: string
}

export const LinkTabs: React.FC<ILinkTabsProps> = React.memo(({ TabLinkComponent, tabs, highlightColor }) => (
  <LinkList>
    {tabs.map(tab => (
      <TabLinkComponent
        key={tab.to}
        to={tab.to}
        highlightColor={tab.highlightColor || highlightColor}
        matchPath={tab.matchPath}>
        {tab.label}
      </TabLinkComponent>
    ))}
  </LinkList>
))
