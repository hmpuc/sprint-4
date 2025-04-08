import TextField from "../../../components/TextField";

export interface TextFieldsProps {
  email: string;
  password: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
}
const TextFields: React.FC<TextFieldsProps> = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <TextField
          onChange={(e) => onChangeEmail(e.target.value)}
          value={email}
          type="text"
          label="Email"
          placeholder="Email"
        />
        <TextField
          onChange={(e) => onChangePassword(e.target.value)}
          value={password}
          type="password"
          label="Senha"
          placeholder="Senha"
        />
      </div>
    </>
  );
};

export default TextFields;
