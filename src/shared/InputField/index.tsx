import classNames from "classnames";
import styles from "./index.module.scss";

interface InputFieldProps {
  name: string;
  value: string;
  textarea?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMessage?: string | undefined;
}

export default function InputField({
  name,
  value,
  textarea,
  onChange,
  errorMessage = "",
  onBlur,
}: InputFieldProps) {
  const sharedProps = {
    className: classNames(styles.inputField, {
      [styles.inputFieldTouched]: value.length > 0,
      [styles.inputFieldError]: errorMessage.length > 0,
    }),
    name,
    value,
    "data-errorfield": errorMessage.length > 0,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(event),
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onBlur(event),
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputFieldWrapper}>
        {textarea ? (
          <textarea {...sharedProps} rows={5}></textarea>
        ) : (
          <input {...sharedProps} />
        )}
        <label className={styles.inputLabel} htmlFor={name}>
          {name}
        </label>
      </div>
      {errorMessage.length > 0 && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
