---
title: Enforce Strict Types and Avoid Any
impact: HIGH
impactDescription: Prevents runtime type errors and secures context objects
tags: typescript, typing, any
---

## Enforce Strict Types and Avoid Any

**Impact: HIGH (Prevents runtime type errors and secures context objects)**

Never use `any` types, especially in Core decorators, Guards, Interceptors, or when typing the Express `Request` object. Using `any` bypasses TypeScript's compiler, introducing severe technical debt and masking potential runtime crashes. Instead, use explicit interface extensions, mapped types, or `unknown` when the shape is truly dynamic.

**Incorrect (Using any for request objects and variables):**

```typescript
// Bypassing type safety with 'any'
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // 1. Using 'any' for the request object
    const request = context.switchToHttp().getRequest<any>();
    
    // 2. Accessing properties blindly
    const userRole = request.user?.roleName;
    return requiredRoles.includes(userRole);
  }
}

// Unsafe decorator definition
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // implicitly any
    const user = request.user;
    return data ? user?.[data] : user; // Unsafe returns and access
  },
);
```

**Correct (Using explicit typings and unknown):**

```typescript
// Explicit typing for the Request object
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Define the expected shape of the request
    const request = context.switchToHttp().getRequest<{ user?: { roleName?: string } }>();
    
    const userRole = request.user?.roleName;
    if (!userRole) return false;
    
    return requiredRoles.includes(userRole);
  }
}

// Strictly typed decorator
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Use Record<string, unknown> instead of any for dynamic objects
    const request = ctx.switchToHttp().getRequest<{ user?: Record<string, unknown> }>();
    const user = request.user;
    return data && user ? user[data] : user;
  },
);
```

Reference: [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any)