export const TextField = ({ name = "text", label = "Текст" }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="name"
        name={name}
        className="form-control"
        placeholder="example"
        id={name}
      />
    </div>
  );
};
