import * as React from 'react'
import styled from 'styled-components/macro'
import { H2, H2WithSubtitle } from 'src/components/typography'

interface IProps {
  header: React.ReactNode
  subHeader?: React.ReactNode
  extraHeader?: React.ReactNode
  children?: React.ReactNode
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TopLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Content = styled.div`
  margin-left: 50px;
`

const H2WithMargins = styled(H2)`
  margin-bottom: 42px;
`

const H2WithSubtitleWithMargins = styled(H2WithSubtitle)`
  margin-bottom: 28px;
`

const ExtraHeaderWrapper = styled.div``

export const DefaultContent: React.FC<IProps> = ({ header, subHeader, extraHeader, children }) => {
  return (
    <Wrapper>
      <TopLine>
        {subHeader ? (
          <H2WithSubtitleWithMargins subtitle={subHeader}>{header}</H2WithSubtitleWithMargins>
        ) : (
          <H2WithMargins>{header}</H2WithMargins>
        )}
        {extraHeader && <ExtraHeaderWrapper>{extraHeader}</ExtraHeaderWrapper>}
      </TopLine>
      <Content>{children}</Content>
    </Wrapper>
  )
}

interface IOnboardingStepsCounterProps {
  currentStep: React.ReactNode
  totalSteps: React.ReactNode
}

const CurrentStep = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.green};
`

const TotalSteps = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`

const StepsWrapper = styled.div`
  display: flex;
  width: 86px;
  align-items: center;
  justify-content: space-between;
`

const Dash = styled.div`
  width: 16px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const OnboardingStepsCounter: React.FC<IOnboardingStepsCounterProps> = ({
  currentStep,
  totalSteps,
}) => (
  <StepsWrapper>
    <CurrentStep>{currentStep}</CurrentStep>
    <Dash />
    <TotalSteps>{totalSteps}</TotalSteps>
  </StepsWrapper>
)
