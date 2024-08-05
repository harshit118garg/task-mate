import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";

interface DropdownFieldProps {
  children: JSX.Element[];
  label: string;
  name: string;
  value: string;
  onBlur: (event: React.FocusEvent<HTMLSelectElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string | undefined;
}

export default function DropdownField({
  children,
  label,
  name,
  value,
  onBlur,
  handleChange,
  errorMessage = "",
}: DropdownFieldProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOnBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur(event);
  };

  return (
    <>
      <div className={styles.dropdownContainer}>
        <div className={styles.selectWrapper}>
          <select
            className={classNames(styles.selectField, {
              [styles.selectError]: !value && errorMessage.length > 0,
            })}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(event: React.FocusEvent<HTMLSelectElement>) =>
              handleOnBlur(event)
            }
            data-errorfield={errorMessage.length > 0}
          >
            <option value="" disabled hidden></option>
            {children}
          </select>
          <label
            className={classNames(styles.selectLabel, {
              [styles.floatingLabel]: value || isFocused,
            })}
            htmlFor={label}
          >
            {label}
          </label>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </>
  );
}
