"use client";

import { useState } from "react";

const PYODIDE_VERSION = "v0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<any> | null = null;

function loadPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const script = document.createElement("script");
      script.src = `${PYODIDE_BASE}pyodide.js`;
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Pyodide 로드 실패 (네트워크 확인 필요)"));
        document.head.appendChild(script);
      });
      return (window as any).loadPyodide({ indexURL: PYODIDE_BASE });
    })();
  }
  return pyodidePromise;
}

export default function PythonRunner({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const [value, setValue] = useState(code);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");

  async function run() {
    try {
      setError("");
      setOutput("");
      setStatus("loading");
      const pyodide = await loadPyodide();
      setStatus("running");
      pyodide.setStdout({
        batched: (text: string) => setOutput((o) => o + text + "\n"),
      });
      pyodide.setStderr({
        batched: (text: string) => setOutput((o) => o + text + "\n"),
      });
      const result = await pyodide.runPythonAsync(value);
      if (result !== undefined && result !== null) {
        setOutput((o) => o + String(result) + "\n");
      }
      setStatus("idle");
    } catch (e: any) {
      setError(String(e?.message ?? e));
      setStatus("idle");
    }
  }

  return (
    <div className="py-runner">
      <div className="py-runner-head">
        <span className="py-runner-title">Python 실행 · {title}</span>
        <button
          className="py-runner-btn"
          onClick={run}
          disabled={status !== "idle"}
        >
          {status === "idle" && "▶ 실행"}
          {status === "loading" && "Pyodide 로딩 중..."}
          {status === "running" && "실행 중..."}
        </button>
      </div>
      <textarea
        className="py-runner-editor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
      />
      {error && <pre className="py-runner-error">{error}</pre>}
      {output && <pre className="py-runner-output">{output}</pre>}
      {status === "idle" && !output && !error && (
        <p className="py-runner-hint">
          ▶ 실행 버튼을 누르면 코드가 브라우저에서 실제로 실행됩니다 (최초 1회 Pyodide
          다운로드 약 10MB 포함).
        </p>
      )}
    </div>
  );
}