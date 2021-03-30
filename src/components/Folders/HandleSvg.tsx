import * as React from 'react'

interface IProps {
  color: string
}
export const HandleSvg: React.FC<IProps> = ({ color }) => (
  <svg width="135" height="100" viewBox="0 0 135 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 6C0 2.68629 2.68629 0 6 0H66.8761C68.834 0 70.6687 0.955266 71.7915 2.55923L133.391 90.5592C136.175 94.5359 133.33 100 128.476 100H6C2.6863 100 0 97.3137 0 94V6Z"
      fill={color}
    />
  </svg>
)
