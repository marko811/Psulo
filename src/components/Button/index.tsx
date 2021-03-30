import * as React from 'react'
import styled, { StyledComponent } from 'styled-components/macro'
import { space, SpaceProps } from 'styled-system'

type IFontSize = 'l' | 'm' | 's'

export interface IButtonStyleProps {
  size?: IFontSize
}

export const BaseButton = styled.button<IButtonStyleProps & SpaceProps>`
  ${space};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  padding: ${({ size }) => {
    if (size === 'l') {
      return '12px 40px'
    }
    if (size === 's') {
      return '5px 10px'
    }

    return '9px 20px'
  }};

  font-size: ${({ size, theme }) => {
    if (size === 's') {
      return `${theme.fontSizes[0]}px`
    }
    return `${theme.fontSizes[1]}px`
  }};

  &:disabled {
    opacity: 0.4;
    cursor: auto;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  transition: opacity linear 0.1s;

  svg {
    margin: 0 6px;
    vertical-align: baseline;
  }
`

// ${focusMixin(themeColors.green)};
const PrimaryButtonStyled = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  svg path {
    fill: ${({ theme }) => theme.colors.white};
  }
`

// ${focusMixin(themeColors.green)};
const SecondaryButtonStyled = styled(BaseButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.green};
  border: ${({ theme }) => `1.5px solid ${theme.colors.green}`} svg path {
    fill: ${({ theme }) => theme.colors.green};
  }
`

// ${focusMixin(themeColors.red)};
const DangerButtonStyled = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  svg path {
    fill: ${({ theme }) => theme.colors.white};
  }
`

// ${focusMixin(themeColors.red)};
const DangerSecondaryStyled = styled(BaseButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.red};
  svg path {
    fill: ${({ theme }) => theme.colors.red};
  }
  border: 1.5px solid ${({ theme }) => theme.colors.red};
`

const TextButtonStyled = styled(BaseButton)`
  border-radius: 0;
  background-color: transparent;
  padding: 0;
  color: ${({ theme }) => theme.colors.green};
  font-weight: 600;

  svg {
    path {
      fill: ${({ theme }) => theme.colors.green};
    }
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`

interface IProps extends IButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  children?: React.ReactNode
}

interface IFactoryConfig {
  iconPlacement: 'l' | 'r'
  Component: StyledComponent<'button', any, IButtonStyleProps>
}

const buttonWithIconFactory = ({
  iconPlacement,
  Component,
}: IFactoryConfig): React.FC<IProps & SpaceProps> => ({ icon, children, ...rest }) => (
  <Component {...rest}>
    {iconPlacement === 'l' && icon}
    {children}
    {iconPlacement === 'r' && icon}
  </Component>
)

export const PrimaryButton = buttonWithIconFactory({ Component: PrimaryButtonStyled, iconPlacement: 'l' })
export const SecondaryButton = buttonWithIconFactory({ Component: SecondaryButtonStyled, iconPlacement: 'l' })
export const DangerPrimaryButton = buttonWithIconFactory({
  Component: DangerButtonStyled,
  iconPlacement: 'r',
})

export const DangerSecondaryButton = buttonWithIconFactory({
  Component: DangerSecondaryStyled,
  iconPlacement: 'r',
})

export const TextButton = buttonWithIconFactory({
  Component: TextButtonStyled,
  iconPlacement: 'l',
})
