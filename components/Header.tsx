"use client";
import * as Progress from "@radix-ui/react-progress";
import { useFormStore } from "@/store/store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "./ui/Button";

const Header = () => {
  const { formFields, formTitle, setFormTitle, completionPercentage } =
    useFormStore();
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <nav className="h-16 border-b border-slate-300 flex items-center justify-between px-2">
        <input
          type="text"
          placeholder="Untitled form"
          className="text-sm px-5 focus:border-none"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        {/* <span className='text-sm'>{`Completion: ${completionPercentage.toFixed(0)}%`}</span> */}
        <Button disabled={formFields.length === 0}>
          <Link href={"/preview"}>
            <span className="text-sm border border-slate-300 rounded-md px-2 py-1 space-x-4 flex items-center">
              Preview <MdArrowOutward />
            </span>
          </Link>
        </Button>
      </nav>
    );
  }
  if (pathname === "/preview") {
    return (
      <nav className="h-16 border-b border-slate-300 flex items-center justify-between px-2">
        <p className="text-sm px-5 focus:border-none">
          {formTitle === "" ? "Untitled form" : formTitle}
        </p>
      {formFields.length !== 0 &&  <div className="flex flex-col justify-end">
           <span className="text-sm w-full text-end">{`Form completeness: ${completionPercentage.toFixed(
            0
          )}%`}</span> 
           <Progress.Root
            className="bg-slate-300 w-72 rounded-xl h-2 overflow-hidden relative"
            value={completionPercentage}
          >
            <Progress.Indicator
              style={{
                transform: `translateX(-${100 - completionPercentage}%)`,
                backgroundColor: "#00aa45",
                width: "100%",
                height: "100%",
                transition:" transform 660ms cubic-bezier(0.65, 0, 0.35, 1)"
              }}
            />
          </Progress.Root> 
        </div>}
      </nav>
    );
  }
};

export default Header;
