import classNames from "classnames";
import styles from "./index.module.scss";

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  disabled: boolean;
  fullHeight: boolean;
}

export default function Button({
  children,
  disabled,
  fullHeight,
}: ButtonProps) {
  return (
    <div
      className={classNames(styles.buttonWrapper, {
        [styles.fullHeight]: fullHeight,
      })}
    >
      <button type="submit" disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
