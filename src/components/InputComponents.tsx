const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
}) => (
  <div className="form-control-input">
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...register(name, validationSchema)}
    />
    {errors && errors[name]?.type === "required" && (
      <span className="error">{errors[name]?.message}</span>
    )}
    {errors && errors[name]?.type === "minLength" && (
      <span className="error">{errors[name]?.message}</span>
    )}
  </div>
);
export default Input;
