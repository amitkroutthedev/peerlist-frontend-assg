"use client";
import { Button } from "@/components/ui/Button";
import { useFormStore } from "@/store/store";
import Swal from "sweetalert2";

function Page() {
  const { formFields,setFormFields,completionPercentage } = useFormStore();

  const handleInputChange = (id: string, value: string) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };
  const handleSubmit = () => {
    let body: { [key: string]: string } = {};
    let hasEmptyField = false; 

    formFields.forEach(element => {
      body[element.title] = element.value; 
      if (element.value.trim() === "") { 
        hasEmptyField = true;
      }
    });

    if (hasEmptyField) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all fields before submitting.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return; // Exit the function early
    }

    Swal.fire({
      title: 'Your Answers',
      html: Object.entries(body).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join('<br/>'),
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };
  
  return (
    <div className="flex-1 p-4">
      {formFields.length === 0 ? (
        <p>No fields added yet.</p>
      ) : (
        formFields.map((field) => (
          <div key={field.id} className="mb-2">
            <div className="relative space-y-4 rounded-lg border p-4 mx-3 my-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="space-y-2">
                    <p
                      className="w-full bg-transparent text font-medium outline-none placeholder:text-muted-foreground
              text-black"
                    >{field.title}</p>
                    {field.helperText!=="" && <p
                      className="w-full bg-transparent text-xs text-muted-foreground outline-none"
                    >{field.helperText}</p>}
                  </div>
                  {/* <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Input Field / Disabled</p>
          </div> */}
                  {field.type === "Short answer" && (
                    <input
                      type="text"
                      placeholder="Short answer"
                      className="w-full border px-2 py-1 rounded-md text-sm"
                      value={field.value}
                      onChange={(e) => handleInputChange(field.id, e.target.value)} 
                    />
                  )}
                  {field.type === "Long answer" && (
                    <textarea
                      placeholder="Long answer"
                      className="w-full border px-2 py-1 rounded-md text-sm"
                      value={field.value}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                   {field.type === "Single select" && (
                    <div className="flex flex-col">
                    {field.options?.map((data, index) => (
                      <label key={index} className="flex items-center space-x-1">
                        <input
                          type="radio" // Changed from checkbox to radio
                          className="mr-2 rounded-full border bg-green-300"
                          value={data}
                          name={field.id} // Ensure all radio buttons belong to the same group
                          onChange={(e) => handleInputChange(field.id, e.target.value)} // Update value on change
                        /> 
                        {data}
                      </label>
                    ))}
                  </div>
                  )}
                  {field.type === "URL" && (
                    <input
                      type="url"
                      placeholder="Enter URL"
                      className="w-full border px-2 py-1 rounded-md text-sm"
                      value={field.value}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "Date" && (
                    <input
                      type="date"
                      className="w-full border px-2 py-1 rounded-md text-sm"
                      value={field.value}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
          {formFields.length !== 0 && <div className="flex justify-end">
              <Button size={"sm"} className="bg-[#00AA45] border border-[#1E874B] text-sm text-slate-100 h-8 rounded-2xl"
              onClick={handleSubmit}>Submit</Button>
            </div>}
    </div>
  );
}

export default Page;
