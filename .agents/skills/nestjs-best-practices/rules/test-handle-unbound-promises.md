---
title: Handle Floating Promises and Unbound Methods in Tests
impact: MEDIUM-HIGH
impactDescription: Prevents false positive test passes and flaky test suites
tags: testing, jest, promises, unbound-method
---

## Handle Floating Promises and Unbound Methods in Tests

**Impact: MEDIUM-HIGH (Prevents false positive test passes and flaky test suites)**

In Jest test suites (`*.spec.ts`), avoid floating promises (async function calls without `await`) as they can cause tests to pass incorrectly or leak into other tests. Additionally, when using `expect(mockMethod).toHaveBeenCalled()`, strict ESLint rules (`@typescript-eslint/unbound-method`) will flag this because the method is detached from its class context. Handle this gracefully either by using `jest.mocked()` or selectively disabling the rule for the test file.

**Incorrect (Floating promises and unbound methods causing lint errors):**

```typescript
describe('BaseRepository', () => {
  it('should find user', async () => {
    // 1. Floating promise - missing await! 
    // If this throws, the test might still pass
    repository.find({ where: { name: 'test' } });
    
    // 2. Unbound method error from strict ESLint
    // "A method that is not declared with `this: void` may cause unintentional scoping..."
    expect(Repository.prototype.find).toHaveBeenCalled();
  });
});
```

**Correct (Awaited promises and mocked wrappers):**

```typescript
// Option 1: Disable the unbound-method rule for the spec file (common in Jest)
/* eslint-disable @typescript-eslint/unbound-method */

describe('BaseRepository', () => {
  it('should find user', async () => {
    // 1. Always await async operations
    await repository.find({ where: { name: 'test' } });
    
    // 2. Safe to use without wrapper due to eslint-disable at file level
    expect(Repository.prototype.find).toHaveBeenCalled();
  });
});

// Option 2: Use jest.mocked() to bypass the unbound method check
describe('UsersService', () => {
  it('should save user', async () => {
    // Always await
    await service.create({ name: 'test' });
    
    // Wrap with jest.mocked() to satisfy TypeScript and ESLint
    expect(jest.mocked(userRepository.save)).toHaveBeenCalled();
  });
});
```

Reference: [TypeScript ESLint - unbound-method](https://typescript-eslint.io/rules/unbound-method/)