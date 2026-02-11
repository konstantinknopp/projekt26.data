/**
 * models/index.js — Zentrale Exports aller Model-Repositories
 *
 * Jedes Model hat zwei Implementierungen (db + api).
 * Die aktive wird über VITE_USE_API gesteuert.
 *
 * Usage in Stores:
 *   import { task, project, invoice } from "../models";
 *   const items = await task.getAll();
 */

import { taskDb } from "./task.db";
import { taskApi } from "./task.api";
import { projectDb } from "./project.db";
import { projectApi } from "./project.api";
import { invoiceDb } from "./invoice.db";
import { invoiceApi } from "./invoice.api";

const useApi = import.meta.env.VITE_USE_API === "true";

export const task = useApi ? taskApi : taskDb;
export const project = useApi ? projectApi : projectDb;
export const invoice = useApi ? invoiceApi : invoiceDb;
