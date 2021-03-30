import { IPicture } from "../../api/pictures"

export interface IModalContext {
  openedPicture: IPicture | undefined
  openPicture: (picture: IPicture | undefined) => void
}
