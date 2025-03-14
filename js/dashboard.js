document.addEventListener("DOMContentLoaded", () => {
    // Initialize Feather Icons
    feather.replace()
  
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Sidebar toggle
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const sidebar = document.getElementById("sidebar")
  
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle")
  
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  
    // User dropdown
    const userDropdownToggle = document.querySelector(".user-dropdown-toggle")
    const dropdownMenu = document.querySelector(".dropdown-menu")
  
    userDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdownMenu.classList.toggle("show")
    })
  
    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show")
      }
    })
  
    // Navigation
    const navLinks = document.querySelectorAll(".sidebar-nav a")
    const sections = {
      "#dashboard": document.getElementById("dashboard-section"),
      // Add other sections as they are implemented
    }
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
  
        // If the section exists, show it and hide others
        if (sections[targetId]) {
          e.preventDefault()
  
          // Update active nav link
          navLinks.forEach((navLink) => {
            navLink.parentElement.classList.remove("active")
          })
          this.parentElement.classList.add("active")
  
          // On mobile, close the sidebar after navigation
          if (window.innerWidth < 992) {
            sidebar.classList.remove("show")
          }
        }
      })
    })
  
    // Responsive behavior
    function handleResize() {
      if (window.innerWidth < 992) {
        sidebar.classList.remove("collapsed")
        sidebar.classList.remove("show")
      }
    }
  
    window.addEventListener("resize", handleResize)
  
    // Initialize alert actions
    const alertActions = document.querySelectorAll(".alert-action")
  
    alertActions.forEach((button) => {
      button.addEventListener("click", function () {
        const alert = this.closest(".alert")
        alert.style.opacity = "0"
        setTimeout(() => {
          alert.style.display = "none"
        }, 300)
      })
    })
  
    // Initialize appointment actions
    const appointmentEditButtons = document.querySelectorAll(".appointment-actions .btn-outline-primary")
    const appointmentDeleteButtons = document.querySelectorAll(".appointment-actions .btn-outline-danger")
  
    appointmentEditButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const appointmentItem = this.closest(".appointment-item")
        const appointmentTitle = appointmentItem.querySelector("h4").textContent
        alert(`Editare programare: ${appointmentTitle}`)
      })
    })
  
    appointmentDeleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const appointmentItem = this.closest(".appointment-item")
        const appointmentTitle = appointmentItem.querySelector("h4").textContent
  
        if (confirm(`Ești sigur că vrei să anulezi programarea la ${appointmentTitle}?`)) {
          appointmentItem.style.opacity = "0"
          setTimeout(() => {
            appointmentItem.style.display = "none"
          }, 300)
        }
      })
    })
  
    // Initialize document download buttons
    const documentDownloadButtons = document.querySelectorAll(".document-actions .btn-icon")
  
    documentDownloadButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const documentItem = this.closest(".document-item")
        const documentTitle = documentItem.querySelector("h4").textContent
        alert(`Descărcare document: ${documentTitle}`)
      })
    })
  
    // Initialize vote and survey buttons
    const actionButtons = document.querySelectorAll(".vote-item .btn, .survey-item .btn")
  
    actionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const item = this.closest(".vote-item, .survey-item")
        const itemTitle = item.querySelector("h4").textContent
        alert(`Acțiune pentru: ${itemTitle}`)
      })
    })
  })
  
  // Declare feather variable to avoid undefined error
  const feather = require("feather-icons")
  
  