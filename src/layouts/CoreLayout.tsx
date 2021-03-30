import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Logo } from 'src/assets/logo.svg'
import { ILinkTab, LinkTabs } from 'src/components/Tabs'
import { TopMenuNavigationLink } from 'src/components/Tabs/TopNavigation'
import { ITopLevelMenuItem, LeftMenu } from 'src/components/Menu/LeftMenu'
import { Link } from 'src/components/typography'
import { DataContext } from '../components/DataContext/context'
import { PicturePreviewModal } from './PicturePreviewModal'
import _ from 'lodash'

const leftPanelWidthPx = 265

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.darkTwo};
`

const TopLineContainer = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
`

const LogoWrapper = styled.div`
  width: ${leftPanelWidthPx}px;
  margin: 27px 40px;
`

const TopMenuWrapper = styled.div`
  align-self: flex-end;
`

const ProfileWrapper = styled.div`
  // auto moves it to the right-hand side
  margin: 4px 80px 0 auto;
  align-self: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  min-height: calc(100vh - 86px);
`

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 10px 10px 0 0;
  padding: 40px 50px;
  width: 100%;
  margin-right: 30px;
`

const LeftMenuWrapper = styled.div`
  margin-top: 30px;
`

interface IProps {
  withCategoriesLeftMenu: boolean
}

export const CoreLayout: React.FC<IProps> = ({ children, withCategoriesLeftMenu }) => {
  const { categories } = useContext(DataContext)

  const [withSubCategories, withoutSubCategories] = categories
    ? _.partition(categories, category => category.categoryGroupName)
    : [undefined, undefined]

  const grouped = withSubCategories && _.groupBy(withSubCategories, category => category.categoryGroupName)

  const topMenuItems: ILinkTab[] = [{ to: '/', label: 'Trending photos', highlightColor: '#99367d' }]

  const firstCategory = categories?.[0]
  const bigCategory = categories?.find(c => !c.categoryGroupName)
  const anyCategory = bigCategory || firstCategory
  if (anyCategory) {
    topMenuItems.push({
      to: `/category/${anyCategory.id}`,
      label: 'By category',
      matchPath: `/category/:categoryId`,
    })
  }

  topMenuItems.push(
    { to: '/requests', label: 'Requests', highlightColor: '#4845D8' },
    { to: '/likes', label: 'Likes API Tester', highlightColor: '#fff' },
  )

  const topLevelMenuItems: ITopLevelMenuItem[] | undefined = grouped &&
    withoutSubCategories && [
      ...withoutSubCategories.map(
        (category): ITopLevelMenuItem => ({
          label: _.capitalize(category.name),
          id: category.id.toString(),
          to: `/category/${category.id}`,
          subItems: [],
        }),
      ),
      ...Object.keys(grouped).map(categoryGroupName => {
        const subCategories = grouped[categoryGroupName]
        return {
          label: _.capitalize(categoryGroupName),
          id: categoryGroupName,
          subItems: subCategories.map(subCategory => ({
            label: _.capitalize(subCategory.name),
            hint: subCategory.picturesCount.toString(),
            to: `/category/${subCategory.id}`,
          })),
        }
      }),
    ]
  return (
    <>
      <Container>
        <TopLineContainer>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <TopMenuWrapper>
            <LinkTabs TabLinkComponent={TopMenuNavigationLink} tabs={topMenuItems} />
          </TopMenuWrapper>
          <ProfileWrapper>
            <Link to="#">Test user</Link>
          </ProfileWrapper>
        </TopLineContainer>
        <MainWrapper>
          {withCategoriesLeftMenu && (
            <LeftMenuWrapper>
              <LeftMenu items={topLevelMenuItems || []} />
            </LeftMenuWrapper>
          )}
          <Content>{children}</Content>
        </MainWrapper>
      </Container>
      <PicturePreviewModal />
    </>
  )
}
