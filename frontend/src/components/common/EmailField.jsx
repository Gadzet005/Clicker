export const EmailField = ({
  name = "email",
  label = "Email",
  required = true,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="email"
        name={name}
        autoComplete="email"
        className="form-control"
        id={name}
        placeholder="example@email.com"
        required={required}
      />
    </div>
  );
};
