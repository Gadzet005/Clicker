import { EmailField } from "../common/EmailField";
import { PasswordField } from "../common/PasswordField";

export const Login = () => {
  return (
    <div className="d-flex justify-content-center">
      <form className="w-25">
        <EmailField />
        <PasswordField />
        <button type="submit" class="btn btn-primary">
          Войти
        </button>
      </form>
    </div>
  );
};
