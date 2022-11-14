import styles from './input-field.module.scss';

/* eslint-disable-next-line */
export interface InputFieldProps {}

export function InputField(props: InputFieldProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InputField!</h1>
    </div>
  );
}

export default InputField;
