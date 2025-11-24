import React, { useEffect, useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * RowTable component
 * Shows paginated, sortable rows for a dataset/sheet using /datasets/{dataset}/sheets/{sheet}/rows.
 */
export default function RowTable({ dataset, sheet }) {
  const [data, setData] = useState({ rows: [], total: 0, limit: 50, offset: 0 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [orderDir, setOrderDir] = useState("asc");

  const page = useMemo(() => Math.floor((data.offset || 0) / (data.limit || 50)) + 1, [data.offset, data.limit]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil((data.total || 0) / (data.limit || 50))), [data.total, data.limit]);

  async function loadRows(nextOffset = 0) {
    if (!dataset || !sheet) return;
    setLoading(true);
    setErr("");
    try {
      const params = new URLSearchParams();
      params.set("limit", String(data.limit || 50));
      params.set("offset", String(nextOffset));
      if (search) params.set("search", search);
      if (orderBy) params.set("order_by", orderBy);
      params.set("order_dir", orderDir);
      const url = `/datasets/${encodeURIComponent(dataset)}/sheets/${encodeURIComponent(sheet)}/rows?` + params.toString();
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setErr("Failed to load rows.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setData((prev) => ({ ...prev, offset: 0 })); // reset to first page on changes
    loadRows(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, sheet, search, orderBy, orderDir]);

  const columns = useMemo(() => {
    const first = data.rows?.[0];
    return first ? Object.keys(first) : [];
  }, [data.rows]);

  return (
    <div style={{ marginTop: 16 }}>
      <h3>
        Rows: {dataset} / {sheet}
      </h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          placeholder="Search (applies to text columns)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd", minWidth: 240 }}
        />
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd" }}>
          <option value="">Order by…</option>
          {columns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={orderDir} onChange={(e) => setOrderDir(e.target.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd" }}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
        <button onClick={() => loadRows(data.offset || 0)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }}>
          Refresh
        </button>
      </div>

      {loading && <div>Loading rows…</div>}
      {err && <div style={{ color: "#EF4444" }}>{err}</div>}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} style={{ textAlign: "left", padding: 8, background: "#f9fafb", borderBottom: "1px solid #eee" }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows?.map((row, idx) => (
              <tr key={idx}>
                {columns.map((c) => (
                  <td key={c} style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                    {String(row[c] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {!loading && data.rows?.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ padding: 12, color: "#555" }}>
                  No rows.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => loadRows(Math.max(0, (data.offset || 0) - (data.limit || 50)))}
          disabled={(data.offset || 0) === 0}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages} • Total {data.total}
        </span>
        <button
          onClick={() => loadRows((data.offset || 0) + (data.limit || 50))}
          disabled={(data.offset || 0) + (data.limit || 50) >= (data.total || 0)}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
