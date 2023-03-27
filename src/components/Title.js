import React, { useState } from "react";

export const Title = ({ data, updateData }) => {
  const [localInput, setLocalInput] = useState(
    JSON.parse(JSON.stringify(data || ""))
  );
  return (
    <>
      <div>Please input word puzzle</div>
      {true && (
        <>
          <textarea
            rows={10}
            cols={20}
            value={localInput}
            onChange={(d) => {
              setLocalInput(d.target.value);
            }}
          />
        </>
      )}
      <button onClick={() => updateData(localInput.toUpperCase())}>
        update
      </button>
    </>
  );
};
