"use client";

import * as React from "react";
import { LuGripVertical } from "react-icons/lu";
import {
  IoCalendarOutline,
  IoChevronDown,
  IoRadioButtonOn,
} from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/store";
import { MdOutlineShortText } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";
import { AiOutlineLink } from "react-icons/ai";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Checkbox,
} from "@headlessui/react";
import { FormField } from "@/interface/interface";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "./ui/Button";
import { CgAdd } from "react-icons/cg";

interface EditableFieldProps {
  className?: string;
  defaultTitle?: string;
  defaultHelpText?: string;
  inputtype: string;
  field: FormField;
  provided?: any;
}

const typeoffieldset = [
  { id: 1, name: "Short answer", icon: <MdOutlineShortText /> },
  { id: 2, name: "Long answer", icon: <CiTextAlignLeft /> },
  { id: 3, name: "Single select", icon: <IoRadioButtonOn /> },
  { id: 4, name: "URL", icon: <AiOutlineLink /> },
  { id: 5, name: "Date", icon: <IoCalendarOutline /> },
];

export function EditableField({
  className,
  field,
  defaultTitle = "",
  defaultHelpText = "",
  inputtype = field?.type || "",
  provided,
}: EditableFieldProps) {
  const { updateField } = useFormStore();
  return (
    <div
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}
      className={cn(
        "relative space-y-4 rounded-lg border p-4 mx-3 my-2",
        className
      )}
      id={field.id}
    >
      <div className="flex flex-col w-full items-start justify-between gap-4">
        <div className="flex-1 flex w-full justify-between space-y-2">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Write a question"
              defaultValue={defaultTitle}
              onChange={(e) => updateField(field.id, { title: e.target.value })}
              className="w-full bg-transparent text font-medium outline-none placeholder:text-muted-foreground
              text-black"
            />
            <input
              type="text"
              placeholder="Write a help text or caption (leave empty if not needed)"
              defaultValue={defaultHelpText}
              onChange={(e) =>
                updateField(field.id, { helperText: e.target.value })
              }
              className="w-full bg-transparent text-xs text-muted-foreground outline-none"
            />
          </div>
          <div className="flex items-center space-x-10">
            <Listbox
              value={inputtype}
              onChange={(value) =>
                updateField(field.id, {
                  type: value,
                  id: `${value}-${Date.now()}`,
                })
              }
            >
              <ListboxButton className={"flex space-x-1 text-slate-500"}>
                {typeoffieldset.find((field) => field.name === inputtype)?.icon}
                <IoChevronDown
                  //className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={cn(
                  "rounded-md w-10 space-y-3 border border-slate-400 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                  "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
              >
                {typeoffieldset.map((data, index) => (
                  <ListboxOption
                    key={index}
                    value={data.name}
                    className={"flex justify-center"}
                  >
                    {data.icon}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
            <button>
              {/* <button {...provided?.draggableProps}> */}
              <LuGripVertical className="h-4 w-4" />
              <span className="sr-only">Reorder handle</span>
            </button>
          </div>
        </div>
        {inputtype === "Short answer" && (
          <input
            type="text"
            placeholder="Short answer"
            className="w-full border px-2 py-1 rounded-md text-sm"
          />
        )}
        {inputtype === "Long answer" && (
          <textarea
            placeholder="Long answer"
            className="w-full border px-2 py-1 rounded-md text-sm"
          />
        )}
        {inputtype === "Single select" && (
          <div className="w-full flex flex-col space-y-1">
            {field.options?.length === 0 && (
              <div className="flex items-center space-x-3">
                <input
                  type="radio" // Changed from checkbox to radio
                  className="mr-2 rounded-full border"
                  disabled
                />
                <input
                  className="w-full border px-2 py-1 rounded-md text-sm"
                  placeholder="Add an option"
                  onChange={(e) => {
                    let newValue = e.target.value;
                    updateField(field.id, { options: [newValue] });
                  }}
                />
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => {
                    let x = field.options || [];
                    const newOptions = [...x, ""];
                    updateField(field.id, { options: newOptions });
                  }}
                >
                  <CgAdd />
                </Button>
              </div>
            )}
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio" // Changed from checkbox to radio
                  className="mr-2 rounded-full border"
                  disabled
                />
                <input
                  className="w-full border px-2 py-1 rounded-md text-sm"
                  value={option}
                  onChange={(e) => {
                    let newValue = e.target.value;
                    let t = field.options || [];
                    updateField(field.id, {
                      options: [
                        ...t.slice(0, index),
                        newValue,
                        ...t.slice(index + 1),
                      ],
                    });
                  }}
                />
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => {
                    let x = field.options || [];
                    const newOptions = [...x, ""];
                    updateField(field.id, { options: newOptions });
                  }}
                >
                  <CgAdd />
                </Button>
              </div>
            ))}
          </div>
        )}
        {inputtype === "URL" && (
          <input
            type="url"
            placeholder="Enter URL"
            className="w-full border px-2 py-1 rounded-md text-sm"
          />
        )}
        {inputtype === "Date" && (
          <input
            type="date"
            className="w-full border px-2 py-1 rounded-md text-sm"
          />
        )}
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
}
