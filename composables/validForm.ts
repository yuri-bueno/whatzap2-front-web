import { ValidationError, type ObjectSchema } from "yup";

const validForm = async (
  schema: ObjectSchema<any>,
  form: object,
  errors: Record<string, string>
): Promise<boolean> => {
  clear(errors);

  try {
    await schema.validate(form, { abortEarly: false });

    return true;
  } catch (error) {
    if (error instanceof ValidationError) {
      error.inner.forEach((errorf) => {
        const path = errorf.path as string;
        errors[path] = errorf.message;
      });
    }
    return false;
  }
};

export { validForm };
