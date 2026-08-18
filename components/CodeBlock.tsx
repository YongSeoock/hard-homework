type Props = {
  language: string;
  code: string;
};

export default function CodeBlock({ language, code }: Props) {
  return (
    <div className="code-block">
      <span className="lang-label">{language}</span>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}