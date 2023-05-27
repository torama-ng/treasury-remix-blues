import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import { Fragment, SetStateAction, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface projects {
  name: String;
  id: String;
  team?: String;

}



export default function CommandPalette(props: { projects: projects[], openMe: boolean }) {
  const projects = props.projects;
  const openMe = props.openMe
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filteredProjects = query
    ? projects.filter((project) =>
      project?.name?.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  useEffect(() => {
    if (openMe) setIsOpen(true);
  }, [openMe]);

  useEffect(() => {
    // cmd-k or ctrl-k toggles cmd pallette
    function onKeydown(event: { key: string; metaKey: any; ctrlKey: any; }) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto "
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(project: { id: any; }) => {
              setIsOpen(false);
              navigate(`./${project.id}`);
            }}
            as="div"
            className="relative rounded-xl overflow-y-auto shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 bg-white max-w-xl mx-auto"
          >
            <div className="flex items-center px-4">
              <FaSearch className="h-6 w-6   text-gray-500" />
              <Combobox.Input
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => {
                  setQuery(event.target.value);
                }}
                className="  h-12  border-0 text-gray-800 focus:outline-none  px-2
                    placeholder-gray-400 bg-transparent text-sm w-full "
                placeholder="search..."
              />
            </div>
            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className=" max-h-96 text-sm overflow-y-auto"
              >
                {filteredProjects.map((project, index) => (
                  <Combobox.Option key={index} value={project}>
                    {({ active }) => (
                      <div
                        className={`px-4 py-2 space-x-1 ${active ? "bg-indigo-600" : "bg-white"
                          }`}
                      >
                        <span
                          className={`${active ? "text-white" : "text-gray-900"
                            }  font-medium`}
                        >
                          {" "}
                          {project?.name}{" "}
                        </span>
                        <span
                          className={`${active ? "text-indigo-200" : "text-gray-400"
                            }`}
                        >
                          {" "}
                          {project?.team}{" "}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProjects.length == 0 && (
              <p className="p-4 text-sm text-gray-400">No Results </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
