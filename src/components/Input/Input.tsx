import * as React from 'react'
import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { doSomethingImportantWithTheValue } from '../../utils/important'
import { TextButton } from '../Button'
import { ReactComponent as CloseIcon } from '../../assets/cross.svg'

const iconWidth = 22
const Group = styled.div<{ hasIcon: boolean; sizeMultiplier: number }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ hasIcon, sizeMultiplier }) => `15px ${hasIcon ? `${iconWidth * sizeMultiplier}px` : '0'} 0`};
`

const StyledInput = styled.input<{ hasError: boolean; hasIcon: boolean; sizeMultiplier: number }>`
  width: ${({ hasIcon, sizeMultiplier }) =>
    hasIcon ? `calc(100% + ${iconWidth * sizeMultiplier}px)` : '100%'};
  border: 0;
  border-bottom: ${({ theme, hasError }) => `1px solid ${hasError ? theme.colors.red : theme.colors.gray}`};
  outline: 0;
  font-size: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
  color: white;
  padding: ${({ sizeMultiplier }) => `${6 * sizeMultiplier * 2}px 0 6px 0`};
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
    cursor: text;
    top: ${({ sizeMultiplier }) => `${8 + sizeMultiplier * 12}px`};
    left: ${({ hasIcon, sizeMultiplier }) => (hasIcon ? `${iconWidth * sizeMultiplier}px` : '0')};
  }

  &:focus {
    ~ label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      transition: 0.2s;
      font-size: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
      color: ${({ theme }) => theme.colors.white};
      font-weight: 700;
    }

    ~ div {
      border-color: ${({ theme }) => theme.colors.green};
      svg path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }

    font-weight: 700;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.green};
    border-image-slice: 1;
  }
`

const ErrorMessage = styled.span<{ sizeMultiplier: number }>`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 50%;
  right: 0;
  font-size: ${({ sizeMultiplier }) => `${10 * sizeMultiplier}px`};
  line-height: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
`

const HintMessage = styled.span<{ sizeMultiplier: number }>`
  color: ${({ theme }) => theme.colors.greenBlue};
  position: absolute;
  top: 50%;
  right: 0;
  font-size: ${({ sizeMultiplier }) => `${10 * sizeMultiplier}px`};
  line-height: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
`

const IconWrapper = styled.div<{ hasError: boolean; sizeMultiplier: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ sizeMultiplier }) => `${iconWidth * sizeMultiplier}px`};
  border-bottom: ${({ theme, hasError }) => `1px solid ${hasError ? theme.colors.red : theme.colors.gray}`};
  transition: 0.2s;
  svg {
    width: 60%;
    height: 60%;
    margin-bottom: 5px;
    path {
      transition: 0.2s;
      fill: ${({ theme }) => theme.colors.gray};
    }
  }
`

const Label = styled.label<{ sizeMultiplier: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  transition: 0.2s;
  font-size: ${({ sizeMultiplier }) => `${12 * sizeMultiplier}px`};
  color: ${({ theme }) => theme.colors.gray};
`

interface IStylishInputProps {
  errorMessage?: string
  hintMessage?: string
  label: string
  icon?: React.ReactNode
  scaleMultiplier?: number
}

const StylishInput: React.FC<IStylishInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  errorMessage,
  hintMessage,
  label,
  icon,
  scaleMultiplier: scaleMultiplierMaybe,
  ...rest
}) => {
  const hasError = Boolean(errorMessage)
  const hasIcon = Boolean(icon)
  const ref = React.createRef<HTMLInputElement>()
  const focusInput = React.useCallback(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref])

  const multiplier = scaleMultiplierMaybe || 1

  return (
    <Group hasIcon={hasIcon} onClick={focusInput} sizeMultiplier={multiplier}>
      <StyledInput
        type="text"
        placeholder={label}
        hasError={hasError}
        hasIcon={hasIcon}
        sizeMultiplier={multiplier}
        {...rest}
        ref={ref}
      />
      <Label sizeMultiplier={multiplier}>{label}</Label>
      {hasIcon && (
        <IconWrapper hasError={hasError} sizeMultiplier={multiplier}>
          {icon}
        </IconWrapper>
      )}
      {errorMessage && <ErrorMessage sizeMultiplier={multiplier}>{errorMessage}</ErrorMessage>}
      {!errorMessage && hintMessage && <HintMessage sizeMultiplier={multiplier}>{hintMessage}</HintMessage>}
    </Group>
  )
}

interface IProps {
  value: string | number
  label: string
  error?: string
  onChange: (newValue: string | number) => void
  scaleMultiplier?: number
  cheerfulTextMessages?: string[]
  type: 'text' | 'number'
}

const InputContainer = styled.div<{ scaleMultiplier?: number }>`
  display: flex;

  align-items: center;

  > button {
    margin-top: ${({ scaleMultiplier }) => (scaleMultiplier || 1) * 15}px;
    margin-left: 20px;
  }
`

export const CustomInput = ({
  value,
  label,
  error,
  onChange,
  type,
  cheerfulTextMessages,
  ...props
}: IProps) => {
  const message = cheerfulTextMessages
    ? cheerfulTextMessages[Math.min(value.toString().length, cheerfulTextMessages.length - 1)]
    : undefined

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      // if this is a text input, we want to make sure we don't allow user to enter anything but numbers

      if (type === 'number') {
        const result = parseInt(value.replace(/\D/g, ''), 10)
        onChange(isNaN(result) ? 0 : result)
      } else {
        onChange(value)
      }

      doSomethingImportantWithTheValue(value)
    },
    [onChange, type],
  )

  const handleClear = useCallback(() => {
    if (type === 'number') onChange(0)
    else onChange('')
  }, [onChange, type])

  return (
    <InputContainer scaleMultiplier={props.scaleMultiplier}>
      <StylishInput
        label={label}
        value={value}
        hintMessage={message}
        errorMessage={error}
        onChange={handleChange}
        {...props}
      />
      <TextButton icon={<CloseIcon />} type="button" onClick={handleClear} />
    </InputContainer>
  )
}
