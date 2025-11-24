import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * SheetList component
 * Lists sheets for a dataset with row counts.
 */
export default function SheetList({ dataset, onSelect }) {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`/datasets/${encodeURIComponent(dataset)}/sheets`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSheets(data);
      } catch (e) {
        setErr("Failed to load sheets.");
      } finally {
        setLoading(false);
      }
    }
    if (dataset) load();
  }, [dataset]);

  if (!dataset) return null;
  if (loading) return <div>Loading sheets…</div>;
  if (err) return <div style={{ color: "#EF4444" }}>{err}</div>;
  if (!sheets.length) return <div>No sheets found.</div>;

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Sheets in {dataset}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sheets.map((s) => (
          <li key={s.table} style={{ marginBottom: 6 }}>
            <button
              onClick={() => onSelect(s.sheet)}
              style={{
                background: "#F59E0B",
                color: "black",
                border: "none",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
              }}
              title={s.table}
            >
              {s.sheet}
            </button>
            <span style={{ marginLeft: 8, color: "#555" }}>{s.count} rows</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
