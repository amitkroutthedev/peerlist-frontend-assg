"use client";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AiOutlineLink } from "react-icons/ai";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoAdd, IoCalendarOutline, IoRadioButtonOn } from "react-icons/io5";
import { MdOutlineShortText } from "react-icons/md";
import { EditableField } from "./EditableField";
import { useFormStore } from "@/store/store";
import { FormField } from "@/interface/interface";

function AddForm() {
  //const [formFields, setFormFields] = useState<string[]>([]);
  const { formFields, setFormFields } = useFormStore();

  const typeoffieldset = [
    { id: 1, name: "Short answer", icon: <MdOutlineShortText /> },
    { id: 2, name: "Long answer", icon: <CiTextAlignLeft /> },
    { id: 3, name: "Single select", icon: <IoRadioButtonOn /> },
    { id: 4, name: "URL", icon: <AiOutlineLink /> },
    { id: 5, name: "Date", icon: <IoCalendarOutline /> },
  ];

  const addField = (type: string) => {
    const newField:FormField = {
      id: `${type}-${Date.now()}`,
      type,
      value: "",
      title: "",
      helperText: "",
    };
    if (type === "Single select") {
      newField.options = []; 
    }
    setFormFields([...formFields, newField]);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder items
    const newItems = Array.from(formFields);
    const [reorderedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, reorderedItem);

    setFormFields(newItems);
  };
  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-7.55rem)]">
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {formFields.length !== 0 &&
                  formFields.map((data, index) => (
                    <Draggable
                      key={data.id}
                      draggableId={data.id}
                      index={index}
                    >
                      {(provided) => (
                        <EditableField
                          key={index}
                          field={data}
                          inputtype={data.type}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Menu>
          <MenuButton className="flex items-center space-x-4 border border-slate-300 px-2 py-1 rounded-2xl">
            <IoAdd /> Add Question
          </MenuButton>
          <MenuItems
            anchor="bottom"
            // className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white"
            className="border w-56 origin-top-right rounded-xl bg-white/5 p-1 text-sm/6"
          >
            <MenuItem disabled>
              <span className="text-sm px-3 py-1">ITEM TYPES</span>
            </MenuItem>
            {typeoffieldset.map((data) => {
              return (
                <MenuItem key={data.id}>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:border"
                    onClick={() => addField(data.name)}
                  >
                    {data.icon} {data.name}
                  </button>
                </MenuItem>
              );
            })}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

/*function DraggableField({ id, inputtype }: { id: string, inputtype: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <EditableField inputtype={inputtype} />
    </div>
  );
}*/

export default AddForm;
