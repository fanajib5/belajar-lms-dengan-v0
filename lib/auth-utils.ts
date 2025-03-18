export function validatePassword(password: string): { valid: boolean; message: string } {
  // Minimum 8 characters
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password harus minimal 8 karakter",
    }
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password harus mengandung minimal 1 huruf besar",
    }
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password harus mengandung minimal 1 huruf kecil",
    }
  }

  // Check for number
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password harus mengandung minimal 1 angka",
    }
  }

  // Check for special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return {
      valid: false,
      message: "Password harus mengandung minimal 1 karakter khusus",
    }
  }

  return {
    valid: true,
    message: "Password valid",
  }
}

