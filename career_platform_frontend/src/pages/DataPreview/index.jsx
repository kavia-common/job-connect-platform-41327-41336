import React, { useState } from "react";
import DatasetList from "./DatasetList";
import SheetList from "./SheetList";
import RowTable from "./RowTable";

/**
 * PUBLIC_INTERFACE
 * DataPreview page
 * Allows browsing datasets, sheets, and rows.
 */
export default function DataPreviewPage() {
  const [dataset, setDataset] = useState("");
  const [sheet, setSheet] = useState("");

  return (
    <div style={{ padding: 16 }}>
      <h1>Data Preview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <DatasetList
            onSelect={(ds) => {
              setDataset(ds);
              setSheet("");
            }}
          />
          <SheetList dataset={dataset} onSelect={(sh) => setSheet(sh)} />
        </div>
        <div>{dataset && sheet ? <RowTable dataset={dataset} sheet={sheet} /> : <div>Select a dataset and sheet.</div>}</div>
      </div>
    </div>
  );
}
