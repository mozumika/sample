import "@testing-library/jest-dom";

import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/lib/msw";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
