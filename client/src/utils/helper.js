function validateForm(obj) {
  let error = [];
  if (obj.name.trim().length === 0) error.push("Please input a valid name");
  if (!obj.amount.trim().match(/^\d{1,}(\.\d{0,2})?$/))
    error.push("Please enter a valid amount");
  return error.length > 0 ? error : undefined;
}

export default validateForm;
