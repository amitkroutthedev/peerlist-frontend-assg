export interface FormField {
    id: string;
    type: string;
    value: string;
    title: string;
    helperText: string;
    options?:string[];
  }
  
export interface FormState {
    formFields: FormField[];
    formTitle: string; // Add formTitle to the state
    setFormFields: (fields: FormField[]) => void;
    setFormTitle: (title: string) => void; // Add setter for formTitle
    updateField: (id: string, updates: Partial<FormField>) => void;
    completionPercentage: number;
  }