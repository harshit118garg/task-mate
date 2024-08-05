import styles from "./index.module.scss";

interface DropdownOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export default function DropdownOption({
  label,
  value,
  disabled = false,
}: DropdownOptionProps) {
  return (
    <option disabled={disabled} className={styles.dropdownOption} value={value}>
      {label}
    </option>
  );
}
