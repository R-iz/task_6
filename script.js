/**
 * Enhanced Contact Form Validator Class
 * Handles form validation, user feedback, and submission with phone validation
 */
class ContactFormValidator {
  constructor() {
    // DOM elements
    this.form = document.getElementById("contactForm")
    this.nameInput = document.getElementById("name")
    this.emailInput = document.getElementById("email")
    this.phoneInput = document.getElementById("phone")
    this.messageInput = document.getElementById("message")
    this.submitBtn = document.getElementById("submitBtn")
    this.successMessage = document.getElementById("successMessage")
    this.charCount = document.getElementById("charCount")

    // Validation patterns
    this.emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    this.nameRegex = /^[a-zA-Z\s'-]{2,50}$/
    this.phoneRegex = /^[+]?[1-9][\d\s\-$$$$]{8,18}$/

    // Configuration
    this.config = {
      minNameLength: 2,
      maxNameLength: 50,
      minMessageLength: 10,
      maxMessageLength: 500,
      maxEmailLength: 254,
    }

    this.init()
  }

  /**
   * Initialize event listeners and setup
   */
  init() {
    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))

    // Real-time validation on blur
    this.nameInput.addEventListener("blur", () => this.validateName())
    this.emailInput.addEventListener("blur", () => this.validateEmail())
    this.phoneInput.addEventListener("blur", () => this.validatePhone())
    this.messageInput.addEventListener("blur", () => this.validateMessage())

    // Character counter for message
    this.messageInput.addEventListener("input", () => this.updateCharCount())

    // Clear errors on input
    this.nameInput.addEventListener("input", () => this.clearError("name"))
    this.emailInput.addEventListener("input", () => this.clearError("email"))
    this.phoneInput.addEventListener("input", () => this.clearError("phone"))
    this.messageInput.addEventListener("input", () => this.clearError("message"))

    // Phone number formatting
    this.phoneInput.addEventListener("input", (e) => this.formatPhoneNumber(e))

    // Initialize character count
    this.updateCharCount()
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  handleSubmit(e) {
    e.preventDefault()

    // Hide previous success message
    this.successMessage.classList.remove("show")

    // Validate all fields
    const isNameValid = this.validateName()
    const isEmailValid = this.validateEmail()
    const isPhoneValid = this.validatePhone()
    const isMessageValid = this.validateMessage()

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      this.submitForm()
    } else {
      this.focusFirstError()
    }
  }

  /**
   * Validate name field
   * @returns {boolean} - Validation result
   */
  validateName() {
    const name = this.nameInput.value.trim()
    const nameGroup = this.nameInput.closest(".form-group")
    const errorElement = document.getElementById("nameError")

    if (!name) {
      this.showError(nameGroup, errorElement, "Name is required.")
      return false
    } else if (name.length < this.config.minNameLength) {
      this.showError(nameGroup, errorElement, `Name must be at least ${this.config.minNameLength} characters long.`)
      return false
    } else if (name.length > this.config.maxNameLength) {
      this.showError(nameGroup, errorElement, `Name must be less than ${this.config.maxNameLength} characters.`)
      return false
    } else if (!this.nameRegex.test(name)) {
      this.showError(nameGroup, errorElement, "Name can only contain letters, spaces, hyphens, and apostrophes.")
      return false
    } else {
      this.showSuccess(nameGroup, errorElement)
      return true
    }
  }

  /**
   * Validate email field
   * @returns {boolean} - Validation result
   */
  validateEmail() {
    const email = this.emailInput.value.trim()
    const emailGroup = this.emailInput.closest(".form-group")
    const errorElement = document.getElementById("emailError")

    if (!email) {
      this.showError(emailGroup, errorElement, "Email is required.")
      return false
    } else if (!this.emailRegex.test(email)) {
      this.showError(emailGroup, errorElement, "Please enter a valid email address.")
      return false
    } else if (email.length > this.config.maxEmailLength) {
      this.showError(emailGroup, errorElement, "Email address is too long.")
      return false
    } else {
      this.showSuccess(emailGroup, errorElement)
      return true
    }
  }

  /**
   * Validate phone field
   * @returns {boolean} - Validation result
   */
  validatePhone() {
    const phone = this.phoneInput.value.trim()
    const phoneGroup = this.phoneInput.closest(".form-group")
    const errorElement = document.getElementById("phoneError")

    if (!phone) {
      this.showError(phoneGroup, errorElement, "Phone number is required.")
      return false
    }

    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "")

    if (digitsOnly.length < 10) {
      this.showError(phoneGroup, errorElement, "Phone number must be at least 10 digits.")
      return false
    } else if (digitsOnly.length > 15) {
      this.showError(phoneGroup, errorElement, "Phone number is too long.")
      return false
    } else if (!/^[1-9]/.test(digitsOnly)) {
      this.showError(phoneGroup, errorElement, "Phone number cannot start with 0.")
      return false
    } else {
      this.showSuccess(phoneGroup, errorElement)
      return true
    }
  }

  /**
   * Validate message field
   * @returns {boolean} - Validation result
   */
  validateMessage() {
    const message = this.messageInput.value.trim()
    const messageGroup = this.messageInput.closest(".form-group")
    const errorElement = document.getElementById("messageError")

    if (!message) {
      this.showError(messageGroup, errorElement, "Message is required.")
      return false
    } else if (message.length < this.config.minMessageLength) {
      this.showError(
        messageGroup,
        errorElement,
        `Message must be at least ${this.config.minMessageLength} characters long.`,
      )
      return false
    } else if (message.length > this.config.maxMessageLength) {
      this.showError(
        messageGroup,
        errorElement,
        `Message must be less than ${this.config.maxMessageLength} characters.`,
      )
      return false
    } else {
      this.showSuccess(messageGroup, errorElement)
      return true
    }
  }

  /**
   * Format phone number as user types
   * @param {Event} e - Input event
   */
  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, "")
    let formattedValue = ""

    // Limit to 10 digits for US format
    if (value.length > 10) {
      value = value.slice(0, 10)
    }

    if (value.length > 0) {
      if (value.length <= 3) {
        formattedValue = `(${value}`
      } else if (value.length <= 6) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`
      } else {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
      }
    }

    e.target.value = formattedValue
  }

  /**
   * Show error state for a field
   * @param {HTMLElement} group - Form group element
   * @param {HTMLElement} errorElement - Error message element
   * @param {string} message - Error message
   */
  showError(group, errorElement, message) {
    group.classList.remove("success")
    group.classList.add("error")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  /**
   * Show success state for a field
   * @param {HTMLElement} group - Form group element
   * @param {HTMLElement} errorElement - Error message element
   */
  showSuccess(group, errorElement) {
    group.classList.remove("error")
    group.classList.add("success")
    errorElement.classList.remove("show")
  }

  /**
   * Clear error state for a field
   * @param {string} fieldName - Name of the field
   */
  clearError(fieldName) {
    const input = document.getElementById(fieldName)
    const group = input.closest(".form-group")
    const errorElement = document.getElementById(fieldName + "Error")

    group.classList.remove("error", "success")
    errorElement.classList.remove("show")
  }

  /**
   * Update character count for message field
   */
  updateCharCount() {
    const currentLength = this.messageInput.value.length
    const maxLength = this.config.maxMessageLength
    this.charCount.textContent = `${currentLength}/${maxLength} characters`

    // Remove all classes first
    this.charCount.classList.remove("warning", "error")

    if (currentLength > maxLength * 0.9) {
      this.charCount.classList.add("warning")
    }

    if (currentLength > maxLength) {
      this.charCount.classList.add("error")
    }
  }

  /**
   * Focus the first field with an error
   */
  focusFirstError() {
    const firstError = this.form.querySelector(".form-group.error input, .form-group.error textarea")
    if (firstError) {
      firstError.focus()
    }
  }

  /**
   * Submit the form (simulate API call)
   */
  async submitForm() {
    // Show loading state
    this.submitBtn.disabled = true
    this.submitBtn.innerHTML = '<span class="loading"></span>Sending...'

    try {
      // Simulate API call delay
      await this.simulateApiCall()

      // Show success message
      this.successMessage.classList.add("show")

      // Reset form
      this.resetForm()

      // Scroll to success message
      this.successMessage.scrollIntoView({ behavior: "smooth" })

      // Log form data (for testing purposes)
      this.logFormData()
    } catch (error) {
      console.error("Form submission error:", error)
      this.showSubmissionError()
    } finally {
      // Reset button state
      this.resetSubmitButton()
    }
  }

  /**
   * Simulate API call with Promise
   * @returns {Promise} - Simulated API response
   */
  simulateApiCall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for testing
        const success = Math.random() > 0.1 // 90% success rate
        if (success) {
          resolve({ status: "success", message: "Form submitted successfully" })
        } else {
          reject(new Error("Network error"))
        }
      }, 2000)
    })
  }

  /**
   * Reset form to initial state
   */
  resetForm() {
    this.form.reset()
    this.updateCharCount()

    // Clear all validation states
    const formGroups = this.form.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      group.classList.remove("error", "success")
    })

    // Hide all error messages
    const errorMessages = this.form.querySelectorAll(".error-message")
    errorMessages.forEach((error) => {
      error.classList.remove("show")
    })
  }

  /**
   * Reset submit button to initial state
   */
  resetSubmitButton() {
    this.submitBtn.disabled = false
    this.submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>'
  }

  /**
   * Show submission error
   */
  showSubmissionError() {
    alert("There was an error sending your message. Please try again.")
  }

  /**
   * Log form data for testing purposes
   */
  logFormData() {
    const formData = {
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim(),
      message: this.messageInput.value.trim(),
      timestamp: new Date().toISOString(),
    }

    console.log("Form submitted with data:", formData)
  }
}

/**
 * Utility functions for testing edge cases
 */
const FormTestUtils = {
  /**
   * Test various edge cases
   */
  testEdgeCases() {
    console.log("Testing edge cases...")

    const testCases = [
      {
        name: "",
        email: "",
        phone: "",
        message: "",
        expected: "All fields required",
      },
      {
        name: "A",
        email: "invalid-email",
        phone: "123",
        message: "Short",
        expected: "Multiple validation errors",
      },
      {
        name: "John123",
        email: "test@",
        phone: "invalid-phone",
        message: "Valid message here",
        expected: "Name, email, and phone errors",
      },
      {
        name: "John O'Connor-Smith",
        email: "john.doe+test@example.co.uk",
        phone: "(555) 123-4567",
        message: "This is a valid message for testing purposes with proper length.",
        expected: "Valid submission",
      },
      {
        name: "José María",
        email: "jose@domain.com",
        phone: "(123) 456-7890",
        message: "Testing international characters in names and standard phone format.",
        expected: "Should handle standard US phone format",
      },
    ]

    testCases.forEach((testCase, index) => {
      console.log(`Test Case ${index + 1}:`, testCase)
    })
  },

  /**
   * Fill form with test data
   * @param {Object} data - Test data object
   */
  fillForm(data) {
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const phoneInput = document.getElementById("phone")
    const messageInput = document.getElementById("message")

    if (nameInput) nameInput.value = data.name || ""
    if (emailInput) emailInput.value = data.email || ""
    if (phoneInput) phoneInput.value = data.phone || ""
    if (messageInput) messageInput.value = data.message || ""
  },
}

/**
 * Initialize the form validator when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize form validator
  const formValidator = new ContactFormValidator()

  // Make test utils available globally for debugging
  window.FormTestUtils = FormTestUtils

  // Log initialization
  console.log("Enhanced contact form validator initialized")
  console.log("Use FormTestUtils.testEdgeCases() to run tests")
})

/**
 * Handle page visibility changes to reset form state if needed
 */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Reset any loading states when page becomes visible again
    const submitBtn = document.getElementById("submitBtn")
    if (submitBtn && submitBtn.disabled) {
      submitBtn.disabled = false
      submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>'
    }
  }
})
