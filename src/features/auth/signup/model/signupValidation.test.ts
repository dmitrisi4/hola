import { describe, it, expect } from "vitest";

import { getPasswordStrength, signupSchema } from "./signupValidation";

describe("signupSchema", () => {
  const validInput = {
    email: "test@example.com",
    password: "Password1",
    confirmPassword: "Password1",
    acceptTerms: true as const,
  };

  it("passes with valid data", () => {
    const result = signupSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("fails when passwords do not match", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      confirmPassword: "Different1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword?.[0]).toBe(
        "Passwords do not match",
      );
    }
  });

  it("fails when password is too short", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      password: "Short1",
      confirmPassword: "Short1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password?.[0]).toContain("at least 8 characters");
    }
  });

  it("fails when password has no uppercase", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      password: "password1",
      confirmPassword: "password1",
    });
    expect(result.success).toBe(false);
  });

  it("fails when password has no number", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      password: "Password",
      confirmPassword: "Password",
    });
    expect(result.success).toBe(false);
  });

  it("fails when terms not accepted", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.acceptTerms?.[0]).toBeDefined();
    }
  });

  it("fails with invalid email", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      email: "bad-email",
    });
    expect(result.success).toBe(false);
  });
});

describe("getPasswordStrength", () => {
  it("returns weak for short password", () => {
    expect(getPasswordStrength("ab").level).toBe("weak");
  });

  it("returns weak for password with only 2 checks", () => {
    expect(getPasswordStrength("ab12").level).toBe("weak");
  });

  it("returns medium for password with 3-4 checks", () => {
    expect(getPasswordStrength("abcDEF12").level).toBe("medium");
  });

  it("returns strong for password with all 5 checks", () => {
    expect(getPasswordStrength("abcDEF12!").level).toBe("strong");
  });

  it("returns correct checks for a sample password", () => {
    const { checks, score, level } = getPasswordStrength("Abc12345!");
    expect(checks).toEqual({
      length: true,
      upper: true,
      lower: true,
      number: true,
      special: true,
    });
    expect(score).toBe(5);
    expect(level).toBe("strong");
  });
});
