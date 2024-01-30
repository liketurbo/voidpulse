import React from "react";
import Downshift from "downshift";
import { useProjectContext } from "../../../providers/ProjectProvider";
import { trpc } from "../utils/trpc";
import { Input } from "../ui/Input";

interface MetricSelectorProps {
  eventName: string;
  onEventNameChange: (eventName: string) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({
  eventName,
  onEventNameChange,
}) => {
  const p = useProjectContext();
  const { data } = trpc.getEventNames.useQuery(
    { projectId: p.id },
    { enabled: !!p.id }
  );
  console.log(data);

  return (
    <div>
      <Downshift
        onChange={(selection) =>
          alert(
            selection ? `You selected ${selection.value}` : "Selection Cleared"
          )
        }
        itemToString={(item) => (item ? item.value : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div>
            {/* <label {...getLabelProps()}>Enter a fruit</label> */}
            <div
              style={{ display: "inline-block" }}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <Input {...getInputProps()} />
            </div>
            <ul {...getMenuProps()}>
              {isOpen
                ? data?.names
                    .filter((item) => !inputValue || item.includes(inputValue))
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {item}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};