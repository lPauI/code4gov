document.addEventListener("DOMContentLoaded", () => {
    // Initialize Feather Icons
    feather.replace()
  
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Feature tabs functionality
    const features = [
      {
        title: "User Management",
        description:
          "Secure registration with ID verification, email confirmation, and role-based access for citizens and administrators.",
        color: "blue",
      },
      {
        title: "Citizen Dashboard",
        description:
          "Participate in community decisions through voting, submit complaints, and earn rewards through surveys.",
        color: "green",
      },
      {
        title: "Public Institution Appointments",
        description:
          "Schedule appointments at public institutions with email/SMS confirmations and QR code verification.",
        color: "purple",
      },
      {
        title: "Document Expiration Alerts",
        description: "Upload your documents and receive timely reminders before they expire via email or SMS.",
        color: "amber",
      },
    ]
  
    // Auto-rotate features every 5 seconds
    let activeFeatureIndex = 0
    let featureInterval = setInterval(() => {
      activeFeatureIndex = (activeFeatureIndex + 1) % features.length
      updateActiveFeature(activeFeatureIndex)
    }, 5000)
  
    // Initialize feature tabs
    const featureTabs = document.querySelectorAll(".feature-tab")
    featureTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const featureIndex = Number.parseInt(this.getAttribute("data-feature"))
        updateActiveFeature(featureIndex)
  
        // Reset the interval when user clicks
        clearInterval(featureInterval)
        activeFeatureIndex = featureIndex
        featureInterval = setInterval(() => {
          activeFeatureIndex = (activeFeatureIndex + 1) % features.length
          updateActiveFeature(activeFeatureIndex)
        }, 5000)
      })
    })
  
    function updateActiveFeature(index) {
      // Update tabs
      featureTabs.forEach((tab) => {
        if (Number.parseInt(tab.getAttribute("data-feature")) === index) {
          tab.classList.add("active")
        } else {
          tab.classList.remove("active")
        }
      })
  
      // Update feature illustration
      const featureIcons = document.querySelectorAll(".feature-icon")
      featureIcons.forEach((icon) => {
        if (Number.parseInt(icon.getAttribute("data-feature")) === index) {
          icon.classList.add("active")
        } else {
          icon.classList.remove("active")
        }
      })
  
      // Update feature icon container color
      const iconContainer = document.getElementById("feature-icon-container")
      iconContainer.setAttribute("data-feature", index)
  
      // Update feature title and description
      document.getElementById("feature-title").textContent = features[index].title
      document.getElementById("feature-description").textContent = features[index].description
    }
  
    // Scroll animations
    const animateElements = document.querySelectorAll(".animate-on-scroll")
  
    function checkScroll() {
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight * 0.8) {
          // Add delay if specified
          const delay = element.getAttribute("data-delay") || 0
          setTimeout(() => {
            element.classList.add("visible")
          }, delay)
        }
      })
    }
  
    // Check elements on initial load
    checkScroll()
  
    // Check elements on scroll
    window.addEventListener("scroll", checkScroll)
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    // Form elements
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
    const loginToggle = document.getElementById("login-toggle")
    const registerToggle = document.getElementById("register-toggle")
    const toggleSlider = document.querySelector(".toggle-slider")
    const formTitle = document.getElementById("form-title")
    const formSubtitle = document.getElementById("form-subtitle")
    const formProgress = document.getElementById("form-progress")
  
    // Input elements
    const cnpInput = document.getElementById("cnp")
    const numeInput = document.getElementById("nume")
    const prenumeInput = document.getElementById("prenume")
    const serieInput = document.getElementById("serie")
    const numarInput = document.getElementById("numar")
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")
    const strengthValue = document.getElementById("strength-value")
    const strengthText = document.getElementById("strength-text")
  
    // Login form inputs
    const loginEmail = document.getElementById("login-email")
    const loginPassword = document.getElementById("login-password")
  
    // OTP elements
    const loginOtpInputs = document.querySelectorAll("#login-otp-inputs .otp-input")
    const registerOtpInputs = document.querySelectorAll("#register-otp-inputs .otp-input")
    const loginSendOtpBtn = document.getElementById("login-send-otp-btn")
    const registerSendOtpBtn = document.getElementById("register-send-otp-btn")
    const loginOtpTimer = document.getElementById("login-otp-timer")
    const registerOtpTimer = document.getElementById("register-otp-timer")
    const loginTimerCount = document.getElementById("login-timer-count")
    const registerTimerCount = document.getElementById("register-timer-count")
  
    // Toggle password buttons
    const togglePasswordBtns = document.querySelectorAll(".toggle-password")
  
    // Submit buttons
    const loginSubmitBtn = document.getElementById("login-submit-btn")
    const registerSubmitBtn = document.getElementById("register-submit-btn")
  
    // Notification elements
    const notification = document.getElementById("notification")
    const notificationIcon = document.getElementById("notification-icon")
    const notificationTitle = document.getElementById("notification-title")
    const notificationText = document.getElementById("notification-text")
    const notificationClose = document.getElementById("notification-close")
  
    // Toggle between login and register forms
    function toggleForms(showLogin) {
      updateProgress(30)
  
      if (showLogin) {
        loginToggle.classList.add("active")
        registerToggle.classList.remove("active")
        toggleSlider.style.transform = "translateX(0)"
  
        // Update title and subtitle with animation
        fadeOutElement(formTitle)
        fadeOutElement(formSubtitle)
  
        setTimeout(() => {
          formTitle.textContent = "Autentificare"
          formSubtitle.textContent = "Introduceți datele de autentificare pentru a continua"
          fadeInElement(formTitle)
          fadeInElement(formSubtitle)
          updateProgress(60)
        }, 300)
  
        // Animate forms
        registerForm.style.transform = "translateX(100%)"
        registerForm.style.opacity = "0"
  
        setTimeout(() => {
          registerForm.classList.remove("active")
          loginForm.classList.add("active")
          loginForm.style.transform = "translateX(0)"
          loginForm.style.opacity = "1"
          updateProgress(100)
  
          // Show welcome notification
          showNotification("Bine ați venit revenit!", "Introduceți datele pentru a vă autentifica.", "info")
  
          // Reset progress after animation
          setTimeout(() => {
            updateProgress(0)
          }, 500)
        }, 400)
      } else {
        loginToggle.classList.remove("active")
        registerToggle.classList.add("active")
        toggleSlider.style.transform = "translateX(calc(100% + 8px))"
  
        // Update title and subtitle with animation
        fadeOutElement(formTitle)
        fadeOutElement(formSubtitle)
  
        setTimeout(() => {
          formTitle.textContent = "Înregistrare"
          formSubtitle.textContent = "Creați un cont nou pentru a accesa serviciile juridice"
          fadeInElement(formTitle)
          fadeInElement(formSubtitle)
          updateProgress(60)
        }, 300)
  
        // Animate forms
        loginForm.style.transform = "translateX(-100%)"
        loginForm.style.opacity = "0"
  
        setTimeout(() => {
          loginForm.classList.remove("active")
          registerForm.classList.add("active")
          registerForm.style.transform = "translateX(0)"
          registerForm.style.opacity = "1"
          updateProgress(100)
  
          // Show register notification
          showNotification("Cont nou", "Completați formularul pentru a crea un cont nou.", "info")
  
          // Reset progress after animation
          setTimeout(() => {
            updateProgress(0)
          }, 500)
        }, 400)
      }
    }
  
    // Fade animations for elements
    function fadeOutElement(element) {
      element.style.opacity = "0"
      element.style.transform = "translateY(-10px)"
    }
  
    function fadeInElement(element) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  
    // Update progress bar
    function updateProgress(value) {
      formProgress.style.width = `${value}%`
    }
  
    // Show notification
    function showNotification(title, message, type = "info") {
      notificationTitle.textContent = title
      notificationText.textContent = message
  
      // Reset classes and add new type
      notification.className = "notification"
      notification.classList.add(type)
  
      // Set correct icon based on type
      let iconSVG = ""
      switch (type) {
        case "success":
          iconSVG =
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>'
          break
        case "error":
          iconSVG =
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
          break
        case "warning":
          iconSVG =
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
          break
        default: // info
          iconSVG =
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
      }
  
      notificationIcon.innerHTML = iconSVG
  
      // Show notification
      notification.classList.add("show")
  
      // Auto hide after 5 seconds
      setTimeout(() => {
        hideNotification()
      }, 5000)
    }
  
    // Hide notification
    function hideNotification() {
      notification.classList.remove("show")
    }
  
    // Toggle password visibility
    function togglePasswordVisibility(button) {
      const inputId = button.getAttribute("data-for")
      const passwordInput = document.getElementById(inputId)
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  
      // Add animation
      passwordInput.style.transition = "all 0.3s ease"
      passwordInput.style.opacity = "0.5"
  
      setTimeout(() => {
        passwordInput.setAttribute("type", type)
        passwordInput.style.opacity = "1"
      }, 150)
  
      // Change the eye icon with animation
      const eyeIcon = button.querySelector("svg")
      eyeIcon.style.transform = "scale(0.8)"
  
      setTimeout(() => {
        if (type === "password") {
          eyeIcon.innerHTML =
            '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>'
        } else {
          eyeIcon.innerHTML =
            '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line>'
        }
        eyeIcon.style.transform = "scale(1)"
      }, 150)
    }
  
    // Password strength meter
    function updatePasswordStrength(password) {
      const strength = calculatePasswordStrength(password)
  
      // Remove all classes
      strengthValue.className = "strength-value"
  
      if (password.length === 0) {
        strengthValue.style.width = "0"
        strengthText.textContent = "Putere parolă"
        strengthText.style.color = "var(--text-light)"
      } else if (strength < 30) {
        strengthValue.classList.add("strength-weak")
        strengthText.textContent = "Slabă"
        strengthText.style.color = "var(--error)"
  
        // Show password tip
        if (password.length < 8) {
          showNotification("Parolă slabă", "Folosiți cel puțin 8 caractere pentru o parolă mai sigură.", "warning")
        }
      } else if (strength < 60) {
        strengthValue.classList.add("strength-medium")
        strengthText.textContent = "Medie"
        strengthText.style.color = "var(--warning)"
      } else if (strength < 80) {
        strengthValue.classList.add("strength-strong")
        strengthText.textContent = "Puternică"
        strengthText.style.color = "var(--primary-light)"
      } else {
        strengthValue.classList.add("strength-very-strong")
        strengthText.textContent = "Foarte puternică"
        strengthText.style.color = "var(--success)"
  
        // Show success notification for strong password
        showNotification("Parolă puternică", "Parola dvs. este foarte sigură!", "success")
      }
    }
  
    // Calculate password strength
    function calculatePasswordStrength(password) {
      let strength = 0
  
      // Length contribution
      if (password.length >= 8) {
        strength += 25
      } else {
        strength += (password.length / 8) * 25
      }
  
      // Complexity contribution
      const patterns = [
        /[a-z]/, // lowercase
        /[A-Z]/, // uppercase
        /[0-9]/, // digits
        /[^a-zA-Z0-9]/, // special characters
      ]
  
      let complexity = 0
      patterns.forEach((pattern) => {
        if (pattern.test(password)) {
          complexity++
        }
      })
  
      strength += (complexity / 4) * 75
  
      return strength
    }
  
    // Validate input fields
    function validateInput(input) {
      if (!input) return false
  
      const inputContainer = input.parentElement
      let isValid = false
      let errorMessage = ""
  
      switch (input.id) {
        case "cnp":
          isValid = /^[1-6]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{6}$/.test(input.value)
          errorMessage = isValid ? "" : "CNP-ul este invalid."
          break
  
        case "nume":
        case "prenume":
          const nameType = input.id === "nume" ? "Numele" : "Prenumele"
          isValid = /^[a-zA-ZăîâșțĂÎÂȘȚ\s-]+$/.test(input.value)
          errorMessage = isValid ? "" : `${nameType} trebuie să conțină doar litere.`
          break
  
        case "serie":
          isValid = /^[A-Z]{2}$/.test(input.value)
          errorMessage = isValid ? "" : "Seria trebuie să conțină exact 2 litere majuscule."
          break
  
        case "numar":
          isValid = /^\d{6}$/.test(input.value)
          errorMessage = isValid ? "" : "Numărul trebuie să conțină exact 6 cifre."
          break
  
        case "password":
          isValid = input.value.length >= 8
          errorMessage = isValid ? "" : "Parola trebuie să aibă cel puțin 8 caractere."
          break
  
        case "confirm-password":
          isValid = input.value === passwordInput.value && input.value.length > 0
          errorMessage = isValid ? "" : "Parolele nu coincid."
          break
  
        case "login-email":
          isValid = input.value.trim() !== ""
          errorMessage = isValid ? "" : "Introduceți email sau CNP."
          break
  
        case "login-password":
          isValid = input.value.trim() !== ""
          errorMessage = isValid ? "" : "Introduceți parola."
          break
      }
  
      // Update UI based on validation
      const errorElement = document.getElementById(`${input.id}-error`)
      if (errorElement) {
        errorElement.textContent = errorMessage
      }
  
      if (input.value.trim() === "") {
        inputContainer.classList.remove("valid", "invalid")
        return false
      } else if (isValid) {
        inputContainer.classList.remove("invalid")
        inputContainer.classList.add("valid")
        // Show success animation
        showSuccessAnimation(input)
        return true
      } else {
        inputContainer.classList.remove("valid")
        inputContainer.classList.add("invalid")
        // Shake animation for invalid input
        inputContainer.style.animation = "shake 0.5s"
        setTimeout(() => {
          inputContainer.style.animation = ""
        }, 500)
        return false
      }
    }
  
    // Show success animation
    function showSuccessAnimation(input) {
      const container = input.parentElement
      const icon = document.createElement("div")
      icon.className = "success-icon"
      icon.innerHTML =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      icon.style.position = "absolute"
      icon.style.right = "40px"
      icon.style.top = "50%"
      icon.style.transform = "translateY(-50%) scale(0)"
      icon.style.transition = "all 0.3s ease"
      icon.style.color = "var(--success)"
  
      // Remove existing success icon if any
      const existingIcon = container.querySelector(".success-icon")
      if (existingIcon) {
        container.removeChild(existingIcon)
      }
  
      container.appendChild(icon)
  
      // Animate the icon
      setTimeout(() => {
        icon.style.transform = "translateY(-50%) scale(1)"
      }, 10)
  
      // Remove the icon after animation
      setTimeout(() => {
        if (container.contains(icon)) {
          icon.style.transform = "translateY(-50%) scale(0)"
          setTimeout(() => {
            if (container.contains(icon)) {
              container.removeChild(icon)
            }
          }, 300)
        }
      }, 2000)
    }
  
    // OTP Input Handling
    function setupOtpInputs(inputs) {
      inputs.forEach((input, index) => {
        // Auto focus next input
        input.addEventListener("input", function () {
          if (this.value.length === 1) {
            this.classList.add("filled")
            if (index < inputs.length - 1) {
              inputs[index + 1].focus()
            }
          } else {
            this.classList.remove("filled")
          }
        })
  
        // Handle backspace
        input.addEventListener("keydown", function (e) {
          if (e.key === "Backspace" && this.value === "" && index > 0) {
            inputs[index - 1].focus()
          }
        })
  
        // Allow only numbers
        input.addEventListener("keypress", (e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault()
          }
        })
  
        // Handle paste
        input.addEventListener("paste", (e) => {
          e.preventDefault()
          const pasteData = e.clipboardData.getData("text").trim()
          if (/^\d+$/.test(pasteData)) {
            const digits = pasteData.split("")
            inputs.forEach((input, i) => {
              if (i < digits.length) {
                input.value = digits[i]
                input.classList.add("filled")
              }
            })
  
            // Focus the next empty input or the last one
            const nextEmptyIndex = Array.from(inputs).findIndex((input) => !input.value)
            if (nextEmptyIndex !== -1 && nextEmptyIndex < inputs.length) {
              inputs[nextEmptyIndex].focus()
            } else {
              inputs[inputs.length - 1].focus()
            }
          }
        })
      })
    }
  
    // Start OTP Timer
    function startOtpTimer(timerElement, countElement) {
      timerElement.style.display = "flex"
  
      let timeLeft = 300 // 5 minutes in seconds
      const timerInterval = setInterval(() => {
        timeLeft--
  
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
  
        countElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  
        if (timeLeft <= 0) {
          clearInterval(timerInterval)
          timerElement.style.display = "none"
          showNotification("Cod expirat", "Codul OTP a expirat. Vă rugăm să solicitați un nou cod.", "warning")
        }
      }, 1000)
  
      return timerInterval
    }
  
    // Send OTP function
    function sendOtp(isLogin) {
      const email = isLogin ? loginEmail.value : "email@example.com" // For register we would use a real email field
  
      if (isLogin && !validateInput(loginEmail)) {
        showNotification("Eroare", "Vă rugăm să introduceți un email valid pentru a primi codul OTP.", "error")
        return
      }
  
      // Show loading state
      const otpButton = isLogin ? loginSendOtpBtn : registerSendOtpBtn
      const originalText = otpButton.innerHTML
      otpButton.innerHTML = '<div class="loader"></div><span>Se trimite...</span>'
      otpButton.disabled = true
  
      // Simulate API call
      setTimeout(() => {
        // Reset button
        otpButton.innerHTML = originalText
        otpButton.disabled = false
  
        // Show success notification
        showNotification(
          "Cod trimis",
          `Un cod OTP a fost trimis la adresa ${email}. Codul este valid pentru 5 minute.`,
          "success",
        )
  
        // Start timer
        const timerElement = isLogin ? loginOtpTimer : registerOtpTimer
        const countElement = isLogin ? loginTimerCount : registerTimerCount
  
        // Clear any existing timer
        if (window.otpTimerInterval) {
          clearInterval(window.otpTimerInterval)
        }
  
        // Start new timer
        window.otpTimerInterval = startOtpTimer(timerElement, countElement)
  
        // Removed auto-fill code
      }, 1500)
    }
  
    // Submit form handler
    function submitForm(form, isLogin) {
      updateProgress(20)
  
      let isValid = true
      let formFields = []
  
      if (isLogin) {
        formFields = [
          { input: loginEmail, name: "email" },
          { input: loginPassword, name: "parola" },
        ]
  
        // Validate OTP
        const otpValue = Array.from(loginOtpInputs)
          .map((input) => input.value)
          .join("")
        if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
          isValid = false
          document.getElementById("login-otp-error").textContent = "Vă rugăm să introduceți codul OTP complet."
          showNotification("Cod OTP invalid", "Vă rugăm să introduceți codul OTP complet de 6 cifre.", "error")
        } else {
          document.getElementById("login-otp-error").textContent = ""
        }
      } else {
        formFields = [
          { input: cnpInput, name: "CNP" },
          { input: numeInput, name: "nume" },
          { input: prenumeInput, name: "prenume" },
          { input: serieInput, name: "serie" },
          { input: numarInput, name: "numar" },
          { input: passwordInput, name: "parola" },
          { input: confirmPasswordInput, name: "confirmare parola" },
        ]
  
        // Validate OTP
        const otpValue = Array.from(registerOtpInputs)
          .map((input) => input.value)
          .join("")
        if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
          isValid = false
          document.getElementById("register-otp-error").textContent = "Vă rugăm să introduceți codul OTP complet."
          showNotification("Cod OTP invalid", "Vă rugăm să introduceți codul OTP complet de 6 cifre.", "error")
        } else {
          document.getElementById("register-otp-error").textContent = ""
        }
  
        // Also validate terms checkbox
        const termsCheckbox = document.getElementById("terms")
        if (!termsCheckbox.checked) {
          isValid = false
          showNotification("Termeni și condiții", "Trebuie să fiți de acord cu termenii și condițiile.", "error")
        }
      }
  
      // Validate all fields
      let completedFields = 0
      const totalFields = formFields.length
  
      formFields.forEach((field, index) => {
        if (validateInput(field.input)) {
          completedFields++
        } else {
          isValid = false
        }
  
        // Update progress based on current field
        updateProgress(20 + ((index + 1) / totalFields) * 40)
      })
  
      if (!isValid) {
        // Show error notification
        showNotification("Eroare de validare", "Vă rugăm să corectați erorile din formular.", "error")
  
        // Reset progress after delay
        setTimeout(() => {
          updateProgress(0)
        }, 1000)
  
        return false
      }
  
      // Update progress
      updateProgress(70)
  
      // Add animation to submit button
      const submitBtn = isLogin ? loginSubmitBtn : registerSubmitBtn
      const originalContent = submitBtn.innerHTML
      submitBtn.innerHTML = '<span>Se procesează...</span><div class="loader"></div>'
  
      // Show processing notification
      const actionName = isLogin ? "Autentificare" : "Înregistrare"
      showNotification("Procesare", `${actionName} în curs...`, "info")
  
      // Simulate form submission delay for demo
      setTimeout(() => {
        // Update progress to 100%
        updateProgress(100)
  
        // Show success screen
        const formElement = isLogin ? loginForm : registerForm
        const formTitle = isLogin ? "Autentificare reușită!" : "Înregistrare reușită!"
        const formMessage = isLogin
          ? "Vă redirecționăm către pagina principală..."
          : "Contul dumneavoastră a fost creat cu succes."
        const buttonText = isLogin ? "Continuă către portal" : "Continuă către autentificare"
        const buttonAction = isLogin ? "redirect" : "login"
  
        formElement.innerHTML = `
                  <div class="success-message">
                      <div class="success-icon">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <path d="m9 11 3 3L22 4"></path>
                          </svg>
                      </div>
                      <h2 class="success-title">${formTitle}</h2>
                      <p class="success-text">${formMessage}</p>
                      <button type="button" class="submit-btn" id="success-action-btn" data-action="${buttonAction}">
                          <span>${buttonText}</span>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                              <polyline points="10 17 15 12 10 7"></polyline>
                              <line x1="15" x2="3" y1="12" y2="12"></line>
                          </svg>
                      </button>
                  </div>
              `
  
        // Show success notification
        showNotification("Succes!", `${actionName} reușită!`, "success")
  
        // Add event listener to the action button
        document.getElementById("success-action-btn").addEventListener("click", function () {
          const action = this.getAttribute("data-action")
          if (action === "login") {
            toggleForms(true)
          } else if (action === "redirect") {
            // In a real application, this would redirect to the dashboard
            showNotification("Redirecționare", "Vă redirecționăm către pagina principală...", "info")
          }
        })
  
        // Reset progress bar after delay
        setTimeout(() => {
          updateProgress(0)
        }, 1000)
      }, 2000)
    }
  
    // Event listeners
    if (loginToggle) {
      loginToggle.addEventListener("click", function () {
        if (!this.classList.contains("active")) {
          toggleForms(true)
        }
      })
    }
  
    if (registerToggle) {
      registerToggle.addEventListener("click", function () {
        if (!this.classList.contains("active")) {
          toggleForms(false)
        }
      })
    }
  
    // Toggle password visibility
    if (togglePasswordBtns) {
      togglePasswordBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          togglePasswordVisibility(this)
        })
      })
    }
  
    // Password strength meter
    if (passwordInput) {
      passwordInput.addEventListener("input", function () {
        updatePasswordStrength(this.value)
      })
    }
  
    // Real-time validation for register form
    const registerInputs = [
      cnpInput,
      numeInput,
      prenumeInput,
      serieInput,
      numarInput,
      passwordInput,
      confirmPasswordInput,
    ]
    registerInputs.forEach((input) => {
      if (input) {
        input.addEventListener("blur", function () {
          validateInput(this)
        })
  
        // Also validate confirm password when password changes
        if (input.id === "password" && confirmPasswordInput) {
          input.addEventListener("input", () => {
            if (confirmPasswordInput.value.length > 0) {
              validateInput(confirmPasswordInput)
            }
          })
        }
      }
    })
  
    // Real-time validation for login form
    const loginInputs = [loginEmail, loginPassword]
    loginInputs.forEach((input) => {
      if (input) {
        input.addEventListener("blur", function () {
          validateInput(this)
        })
      }
    })
  
    // Setup OTP inputs
    if (loginOtpInputs) {
      setupOtpInputs(loginOtpInputs)
    }
  
    if (registerOtpInputs) {
      setupOtpInputs(registerOtpInputs)
    }
  
    // Send OTP buttons
    if (loginSendOtpBtn) {
      loginSendOtpBtn.addEventListener("click", () => {
        sendOtp(true)
      })
    }
  
    if (registerSendOtpBtn) {
      registerSendOtpBtn.addEventListener("click", () => {
        sendOtp(false)
      })
    }
  
    // Form submission
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault()
        submitForm(this, true)
      })
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault()
        submitForm(this, false)
      })
    }
  
    // Close notification
    if (notificationClose) {
      notificationClose.addEventListener("click", hideNotification)
    }
  
    // Add animation effects for all inputs
    const allInputs = document.querySelectorAll(".form-input")
    if (allInputs) {
      allInputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.style.transform = "translateY(-3px)"
          this.parentElement.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)"
        })
  
        input.addEventListener("blur", function () {
          this.parentElement.style.transform = "translateY(0)"
          this.parentElement.style.boxShadow = "none"
        })
      })
    }
  
    // Initialize the notification system
    showNotification("Bine ați venit", "Portal Juridic - Sistemul Integrat pentru Servicii Juridice", "info")
  })
  
  