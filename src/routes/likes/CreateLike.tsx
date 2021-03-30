import * as React from 'react'
import { PrimaryText } from '../../components/typography'
import { PrimaryButton } from '../../components/Button'
import { CustomInput } from '../../components/Input/Input'
import { useState } from 'react'
import { createLike } from '../../api/likes'
import to from 'await-to-js'
import styled from 'styled-components/macro'
import { AxiosError } from "axios"

const Pre = styled.pre`
  color: #fff;
  overflow: auto;
  line-height: 18px;
  margin-top: 20px;
`

const ButtonWrapper = styled.div`
  margin-top: 30px;
`

export const CreateLike: React.FC = () => {
  const [pictureId, setPictureId] = useState(1)

  const [response, setResponse] = useState<{}>()
  const [isLoading, setIsLoading] = useState(false)

  const performRequest = async () => {
    setIsLoading(true)

    const [err, response] = await to(createLike(pictureId))

    if (err) {
      setResponse({ error: (err as AxiosError).response })
    } else {
      setResponse(response!.data)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div>
        <PrimaryText>Paste the picture ID in the field below</PrimaryText>
      </div>
      <div>
        <CustomInput
          value={pictureId}
          label=""
          scaleMultiplier={3}
          onChange={value => {
            // @ts-ignore
            setPictureId(value)
          }}
          type="number"
        />
      </div>
      <ButtonWrapper>
        <PrimaryButton size="l" onClick={performRequest} disabled={isLoading}>
          Like the picture!
        </PrimaryButton>
      </ButtonWrapper>

      <div>
        <Pre>{isLoading ? 'Loading ...' : JSON.stringify(response, undefined, 2)}</Pre>
      </div>
    </>
  )
}
