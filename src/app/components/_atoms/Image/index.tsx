import React from "react";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";

import styles from "./index.module.scss";

export interface ImageProps_ extends ImageProps {
  lazy?: Boolean;
  // src: string;
}

const Image_ = ({
  children,
  lazy = true,
  className = "",
  ...props
}: ImageProps_) => {
  return (
    <Image
      // placeholder={lazy ? 'blur' : 'empty'}
      className={classNames({
        [styles.image]: true,
        [className]: !!className,
      })}
      {...props}
    />
  );
};

export default Image_;
