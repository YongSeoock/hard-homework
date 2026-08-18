import type { Visual } from "@/lib/topics/types";

export default function VisualBlock({ visuals }: { visuals: Visual[] }) {
  return (
    <div className="visuals">
      {visuals.map((v, i) => (
        <div className="visual" key={i}>
          <h3 className="visual-title">{v.title}</h3>
          {v.kind === "compare" ? (
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-empty"></th>
                    <th>{v.leftHeader}</th>
                    <th>{v.rightHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {v.rows.map((r, j) => (
                    <tr key={j}>
                      <th className="compare-label">{r.label}</th>
                      <td>{r.left}</td>
                      <td>{r.right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ol className="visual-steps">
              {v.steps.map((s, j) => (
                <li key={j} className="visual-step">
                  <span className="step-num">{j + 1}</span>
                  <div className="step-content">
                    <strong>{s.title}</strong>
                    <span>{s.description}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
}