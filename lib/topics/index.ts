import { python } from "./python";
import { nextjs } from "./nextjs";
import { postgresql } from "./postgresql";
import { docker } from "./docker";
import { llmIntegration } from "./llm-integration";
import { promptEngineering } from "./prompt-engineering";
import { llmTools } from "./llm-tools";
import { functionCalling } from "./function-calling";
import { javaSpring } from "./java-spring";
import { react } from "./react";
import type { Topic } from "./types";

export const topics: Topic[] = [
  python,
  nextjs,
  postgresql,
  docker,
  llmIntegration,
  promptEngineering,
  llmTools,
  functionCalling,
  javaSpring,
  react,
].sort((a, b) => a.order - b.order);

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}