import {CSSProperties, FC} from 'react';

import {
  IconNameType,
  FontSizeType,
  IconType
} from './types'

import {iconsDuotone} from "./icons";


type KTIconProps = {
  className?: string
  type?: IconType | undefined
  size?: FontSizeType
  name: IconNameType | string
  style?: CSSProperties
}

const KTIcon: FC<KTIconProps> = (props) => {
  const {
    style,
    className = '',
    type = "duotone",
    name,
    size = "2"
  } = props
  return (
    <i style={{...style}} className={`ki-${type}  ki-${name}${className && ' ' + className} fs-${size}`}>
      {type === 'duotone' &&
        [...Array(iconsDuotone[name.trim()])].map((_e, i) => {
          return (
            <span key={`${type}-${name}-${className}-path-${i + 1}`} className={`path${i + 1}`}></span>
          )
        })}
    </i>
  )
}

export {KTIcon}
