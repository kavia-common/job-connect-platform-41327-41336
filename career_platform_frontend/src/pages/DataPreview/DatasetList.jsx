import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * DatasetList component
 * Lists datasets and their tables by calling /datasets.
 */
export default function DatasetList({ onSelect }) {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch("/datasets");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDatasets(data);
      } catch (e) {
        setErr("Failed to load datasets.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading datasets…</div>;
  if (err) return <div style={{ color: "#EF4444" }}>{err}</div>;
  if (!datasets.length) return <div>No datasets found. Run ingestion first.</div>;

  return (
    <div>
      <h2>Datasets</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {datasets.map((d) => (
          <li key={d.dataset} style={{ marginBottom: 8 }}>
            <button
              onClick={() => onSelect(d.dataset)}
              style={{
                background: "#2563EB",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {d.dataset}
            </button>
            <span style={{ marginLeft: 8, color: "#555" }}>
              ({d.tables?.length || 0} tables)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
