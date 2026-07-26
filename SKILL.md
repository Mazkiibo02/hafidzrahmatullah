# SKILL.md — Project Context & Coding Conventions

> This file provides AI assistant (Gemini Flash via Antigravity IDE) with persistent project context,
> tech stack details, and coding conventions. Read this before generating any code.
> Do NOT re-read this file on every prompt — load it once per session.

---

## 1. Project Identity

| Key            | Value                                      |
|----------------|--------------------------------------------|
| Project Type   | Frontend Web Application, Mobile Friendly  |
| Primary Stack  | React + TypeScript + Vite                  |
| Optional Stack | Next.js (for SSR/SSG projects)             |
| Node Version   | >= 20.x (LTS)                              |
| Package Manager| pnpm (preferred) / npm                     |
| Styling        | Tailwind CSS v3 + CSS Modules (as needed)  |
| State          | Zustand / React Context (lightweight first)|
| Data Fetching  | TanStack Query (React Query v5)            |
| Routing        | React Router v6 / Next.js App Router       |
| Linting        | ESLint + Prettier                          |
| Testing        | Vitest + React Testing Library             |

---

## 2. Architecture: Clean Architecture (Frontend Adaptation)

This project follows a **Clean Architecture** pattern adapted for frontend. Respect strict
**dependency direction**: outer layers depend on inner layers, never the reverse.

```
src/
├── core/                  # Domain layer — no framework dependencies
│   ├── entities/          # TypeScript interfaces / types (pure domain models)
│   ├── use-cases/         # Business logic (pure functions or classes)
│   └── ports/             # Interfaces for repositories & services (contracts)
│
├── infrastructure/        # Adapters — implements ports, talks to external world
│   ├── api/               # HTTP clients (axios instances, fetch wrappers)
│   ├── repositories/      # Implements core/ports using real API/storage
│   └── services/          # Third-party service adapters (auth, analytics, etc.)
│
├── application/           # Application layer — orchestrates use cases
│   ├── hooks/             # Custom React hooks (connect UI to use-cases)
│   └── stores/            # Zustand stores or Context providers
│
├── presentation/          # UI layer — React components only
│   ├── pages/             # Route-level components
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Primitive / atomic components (Button, Input, etc.)
│   │   └── modules/       # Feature-specific composite components
│   └── layouts/           # Layout wrappers
│
├── shared/                # Cross-cutting utilities (no business logic)
│   ├── utils/             # Pure helper functions
│   ├── constants/         # App-wide constants & enums
│   ├── types/             # Shared TypeScript types (non-domain)
│   └── lib/               # Third-party lib configurations (queryClient, etc.)
│
└── assets/                # Static assets (images, fonts, icons)
```

### Layer Rules

- `core/` must have **zero imports** from React, axios, or any external library.
- `presentation/` components must **not** call API or repositories directly — use hooks from `application/hooks/`.
- `infrastructure/` implements interfaces from `core/ports/` — never the other way around.
- Shared utilities in `shared/` must be **pure functions** with no side effects.

---

## 3. TypeScript Conventions

```ts
// ALWAYS use explicit return types on functions and hooks
export function useUser(): UseUserReturn { ... }

// Use interfaces for object shapes, type aliases for unions/primitives
interface User {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
}

// Avoid `any` — use `unknown` and narrow types instead
function parseResponse(data: unknown): User {
  if (!isUser(data)) throw new Error('Invalid user shape');
  return data;
}

// Prefer readonly for domain entities
interface Product {
  readonly id: string;
  readonly name: string;
  price: number;
}

// Enums → use const object pattern (tree-shakable)
export const UserRole = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];
```

---

## 4. React Component Conventions

```tsx
// 1. Functional components only — no class components
// 2. One component per file — filename matches component name (PascalCase)
// 3. Props interface defined above the component, named `[ComponentName]Props`
// 4. Export the component as named export (not default, unless it's a page)

interface UserCardProps {
  user: User;
  onSelect: (id: string) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="user-card" onClick={() => onSelect(user.id)}>
      <p>{user.email}</p>
    </div>
  );
}

// 5. Co-locate component-specific hooks inside the same folder if complex:
// components/UserCard/
//   UserCard.tsx
//   useUserCard.ts   ← local hook
//   UserCard.test.tsx
//   index.ts         ← re-export
```

---

## 5. Custom Hook Conventions

```ts
// Hooks live in application/hooks/
// Always return a typed object, never a bare array (except tuple hooks like useState)
// Prefix: use[Domain][Action] — e.g., useAuthLogin, useProductList

export function useProductList(): UseProductListReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productRepository.getAll,
  });

  return { products: data ?? [], isLoading, error };
}

interface UseProductListReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}
```

---

## 6. API & Repository Pattern

```ts
// core/ports/IProductRepository.ts — interface (port)
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(payload: CreateProductPayload): Promise<Product>;
}

// infrastructure/repositories/ProductRepository.ts — implementation (adapter)
export class ProductRepository implements IProductRepository {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getAll(): Promise<Product[]> {
    const { data } = await this.httpClient.get<Product[]>('/products');
    return data;
  }
}

// Instantiate once in shared/lib/container.ts and inject via hook or context
```

---

## 7. File & Folder Naming Rules

| Artifact          | Convention           | Example                      |
|-------------------|----------------------|------------------------------|
| Component file    | PascalCase           | `UserCard.tsx`               |
| Hook file         | camelCase            | `useAuthLogin.ts`            |
| Utility file      | camelCase            | `formatCurrency.ts`          |
| Type/Interface    | PascalCase           | `User.ts`, `IUserRepo.ts`    |
| Constant file     | camelCase or UPPER   | `apiEndpoints.ts`            |
| Test file         | Same name + `.test`  | `UserCard.test.tsx`          |
| CSS Module        | PascalCase + module  | `UserCard.module.css`        |
| Page component    | PascalCase           | `DashboardPage.tsx`          |

---

## 8. Code Quality Rules

- **No magic numbers** — extract to named constants in `shared/constants/`.
- **No inline styles** — use Tailwind classes or CSS Modules.
- **No console.log in production code** — use a logger utility.
- **Error boundaries** — wrap route-level components.
- **Loading & error states** are mandatory for every async operation.
- **Comments** — write comments in **English**, only for non-obvious logic.
- **Dead code** — remove immediately; do not comment out.
- **Barrel exports** — use `index.ts` per folder for clean imports.

```ts
// Bad
import { UserCard } from '../../presentation/components/modules/UserCard/UserCard';

// Good (via index.ts barrel)
import { UserCard } from '@/presentation/components/modules/UserCard';
```

---

## 9. Path Aliases (vite.config.ts / tsconfig.json)

```ts
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "@infra/*": ["./src/infrastructure/*"],
      "@app/*": ["./src/application/*"],
      "@ui/*": ["./src/presentation/*"],
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

Always use path aliases. Relative imports beyond one level (`../../`) are not allowed.

---

## 10. Git Commit Convention (Conventional Commits)

```
feat(auth): add JWT refresh token logic
fix(ui): resolve button alignment on mobile
refactor(product): extract useProductList hook
chore(deps): upgrade TanStack Query to v5
test(user): add unit test for useAuthLogin
```

Format: `type(scope): short description`
Types: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `style`, `perf`

---

## 11. What NOT to Generate

- No `any` types — ever.
- No class components.
- No direct API calls inside `.tsx` files — must go through hooks.
- No business logic inside components.
- No default exports except for page-level components and `next.config.ts`.
- No relative imports deeper than one level.
- No unused imports or variables.

---

## 12. Token-Saving Instructions for AI

- When I ask for a **new component**, generate only the component file + its props interface.
- When I ask for a **new feature**, ask me which layer to start from before generating.
- When I ask for a **refactor**, show only the changed sections with `// ... rest unchanged` markers.
- Do not regenerate files that are already established unless I explicitly ask.
- Do not add placeholder comments like `// TODO: implement` unless I ask for a scaffold.
- Keep responses **concise** — code first, explanation below only if needed.
