// hook that will help and manage the form fields data
import { useState } from "react";

type ValidationRule<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

export function useFormData<T>(initialValues: T, validationRules?: ValidationRule<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(validationRules) as Array<keyof T>).forEach(key => {
      const rule = validationRules[key];
      if (rule) {
        const error = rule(formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return { formData, errors, handleChange, validate, reset };
}