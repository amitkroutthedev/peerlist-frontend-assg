# Peerlist Frontend Developer Assignment

Task: Create a Next.js app for a form builder. 

**Solution**

1. Implemented the UI to start with an empty form creation step, where users can select input types and add questions.
2. The form have 5 question types - Short Ans, Long Ans,Single Select, URL and Date
3. The form is saved not saved, display a preview of the created form can be viewed in `/preview` route
4. Allowing the user to fill out the form and show form completeness (percentage of fields filled).
5. Displaying a success message upon form submission of all the values in the form.
6. The app is pixel-perfect and mobile-responsive.


**Not Included**

1. No API is implemented to store the FormData.
2. Submitted forms not shown in a table.
3. No storage is maintained in local/session storage and in application
4. Some Icons are not same as shown in Figma
## Major Packages

- TailwindCSS,@headlessui/react,class-variance-authority,clsx,tailwind-merge - _For styling purpose_
- Zustand - _For store mangement across pages and components_
- Sweetalert2 - _For showing message to the user after submitting the form_
- @hello-pangea/dnd - _For Dragging Input Fields_
