import styles from "./index.module.scss";
import InputApp from "../InputApp";

export default function OverlayApp() {
  return (
    <dialog className={styles.overlapWrapper}>
      <InputApp />
    </dialog>
  );
}
