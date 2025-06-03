# 📞 Modern Contact Form with Validation

A beautiful, responsive contact form with comprehensive client-side validation built with HTML, CSS, and JavaScript. Features a modern split-screen design with real-time validation, phone number formatting, and accessibility support.

## ✨ Features

### 🎨 **Modern Design**
- **Split-screen layout** with contact information and form sections
- **Gradient backgrounds** with glassmorphism effects
- **Responsive design** that works on all devices
- **Smooth animations** and hover effects
- **Icon-enhanced inputs** with Font Awesome integration

### 🔒 **Comprehensive Validation**
- **Real-time validation** with visual feedback
- **Name validation** (letters, spaces, hyphens, apostrophes only)
- **Email validation** using RFC-compliant regex
- **Phone number validation** with auto-formatting
- **Message validation** with character counting
- **Edge case handling** for all input scenarios

### ♿ **Accessibility Features**
- **Semantic HTML** structure
- **ARIA labels** and proper form associations
- **Keyboard navigation** support
- **Focus indicators** for all interactive elements
- **Screen reader** compatible
- **High contrast mode** support

### 📱 **Responsive Design**
- **Mobile-first** approach
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interface elements
- **Optimized typography** for readability

## 🚀 Quick Start

### Prerequisites
- A modern web browser
- Basic understanding of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contact-form-validation.git
   cd contact-form-validation
   ```

2. **Open the form**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **For development server (optional)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
contact-form-validation/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript validation and functionality
├── README.md           # Project documentation
└── assets/             # Images and other assets (if any)
```

## 🛠️ Usage

### Basic Implementation

The contact form is ready to use out of the box. Simply include the three main files:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Form HTML -->
    <script src="script.js"></script>
</body>
</html>
```

### Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| **Name** | Text | 2-50 characters, letters/spaces/hyphens/apostrophes only | ✅ |
| **Email** | Email | RFC-compliant email format | ✅ |
| **Phone** | Tel | 10-15 digits, auto-formatted as (XXX) XXX-XXXX | ✅ |
| **Message** | Textarea | 10-500 characters with live counter | ✅ |

### Validation Rules

#### Name Validation
- Minimum 2 characters
- Maximum 50 characters
- Only letters, spaces, hyphens, and apostrophes
- Cannot be empty

#### Email Validation
- RFC-compliant email format
- Maximum 254 characters
- Cannot be empty

#### Phone Validation
- Minimum 10 digits
- Maximum 15 digits
- Auto-formats as (XXX) XXX-XXXX
- Cannot start with 0
- Accepts various input formats

#### Message Validation
- Minimum 10 characters
- Maximum 500 characters
- Real-time character counter
- Cannot be empty

## 🎯 Customization

### Styling

Modify `styles.css` to customize the appearance:

```css
/* Change primary colors */
:root {
  --primary-color: #4ecdc4;
  --secondary-color: #44a08d;
  --accent-color: #667eea;
}

/* Customize form container */
.form-container {
  max-width: 600px; /* Adjust form width */
  padding: 50px;    /* Adjust padding */
}
```

### Validation Rules

Modify `script.js` to adjust validation rules:

```javascript
// Update configuration
this.config = {
  minNameLength: 3,     // Minimum name length
  maxNameLength: 100,   // Maximum name length
  minMessageLength: 20, // Minimum message length
  maxMessageLength: 1000, // Maximum message length
  maxEmailLength: 300,  // Maximum email length
}
```

### Form Submission

Replace the simulation with real form submission:

```javascript
async submitForm() {
  const formData = {
    name: this.nameInput.value.trim(),
    email: this.emailInput.value.trim(),
    phone: this.phoneInput.value.trim(),
    message: this.messageInput.value.trim(),
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      this.showSuccess()
    } else {
      throw new Error('Submission failed')
    }
  } catch (error) {
    this.showSubmissionError()
  }
}
```

## 🧪 Testing

### Manual Testing

1. **Empty Form Submission**
   - Submit form without filling any fields
   - Should show validation errors for all required fields

2. **Invalid Data Testing**
   - Enter invalid email formats
   - Enter names with numbers or special characters
   - Enter phone numbers with letters
   - Enter messages shorter than 10 characters

3. **Valid Data Testing**
   - Fill all fields with valid data
   - Should show success message and reset form

### Automated Testing

Use the built-in test utilities:

```javascript
// Open browser console and run:
FormTestUtils.testEdgeCases()

// Fill form with test data:
FormTestUtils.fillForm({
  name: "John Doe",
  email: "john@example.com",
  phone: "(555) 123-4567",
  message: "This is a test message."
})
```

### Edge Cases Covered

- Empty inputs
- Invalid email formats
- Phone numbers with various formats
- Names with international characters
- Messages at character limits
- Special characters in inputs
- Copy-paste scenarios
- Browser autofill compatibility

