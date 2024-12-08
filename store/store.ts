import { FormField, FormState } from '@/interface/interface';
import { create } from 'zustand';

export const useFormStore = create<FormState>((set) => ({
  formFields: [],
  formTitle: "", // Initialize formTitle
  setFormFields: (fields) => set((state) => ({
    formFields: fields,
    completionPercentage: calculateCompletionPercentage(fields),
  })),
  setFormTitle: (title) => set(() => ({ formTitle: title })), 
  updateField: (id, updates) => set((state) => {
    const updatedFields = state.formFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    );
    return {
      formFields: updatedFields,
      completionPercentage: calculateCompletionPercentage(updatedFields),
    };
  }),
  completionPercentage: 0,
}));

function calculateCompletionPercentage(fields: FormField[]): number {
  const filledFields = fields.filter(field => field.value.trim() !== '').length;
  return (filledFields / fields.length) * 100;
}