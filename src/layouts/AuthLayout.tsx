import React from 'react'

export const AuthLayout = ({ children }: React.PropsWithChildren<{}>) => (
  <div>
    <div className="children">{children}</div>
  </div>
)
export default AuthLayout
