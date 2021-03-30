import * as React from 'react'
import { useState } from 'react'
import { PrimaryText } from '../../components/typography'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { fetchLikes } from '../../api/likes'
import to from 'await-to-js'
import styled from 'styled-components/macro'

const Pre = styled.pre`
  color: #fff;
  overflow: auto;
  line-height: 18px;
  margin-top: 20px;
`

const ButtonWrapper = styled.div`
  margin-top: 30px;
`

export const FetchLikes: React.FC = () => {
  const [response, setResponse] = useState<{}>()
  const [isLoading, setIsLoading] = useState(false)

  const performRequest = async () => {
    setIsLoading(true)

    const [err, response] = await to(fetchLikes())

    if (err) {
      setResponse({ error: err })
    } else {
      setResponse(response!.data)
    }

    setIsLoading(false)
  }

  return (
    <div>
      <div>
        <PrimaryText>
          Fetch all likes made by the user. You will get the IDs of liked <strong>pictures</strong>
        </PrimaryText>
      </div>
      <ButtonWrapper>
        <PrimaryButton size="l" onClick={performRequest} disabled={isLoading}>
          Fetch likes
        </PrimaryButton>
      </ButtonWrapper>

      <div>
        <Pre>{isLoading ? 'Loading ...' : JSON.stringify(response, undefined, 2)}</Pre>
      </div>
    </div>
  )
}
