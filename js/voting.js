document.addEventListener("DOMContentLoaded", () => {
    // Initialize Feather Icons
    feather.replace();

    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach((button) => {
            button.addEventListener("click", function () {
                // Remove active class from all buttons and contents
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                tabContents.forEach((content) => content.classList.remove("active"));

                // Add active class to clicked button
                this.classList.add("active");

                // Show corresponding content
                const tabId = this.getAttribute("data-tab");
                if (tabId) {
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.add("active");
                    } else {
                        console.error(`Tab content with id "${tabId}" not found!`);
                    }
                } else {
                    console.error("No data-tab attribute found on the button!");
                }
            });
        });
    }

    // Modal functionality
    const modal = document.getElementById("voting-modal");
    const closeModal = document.getElementById("close-modal");
    const voteButtons = document.querySelectorAll(".vote-btn");

    if (modal && closeModal && voteButtons.length > 0) {
        // Open modal when vote button is clicked
        voteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const voteId = this.getAttribute("data-vote-id");
                openVoteForm(voteId);
                modal.classList.add("show");
                document.body.style.overflow = "hidden"; // Prevent scrolling
            });
        });

        // Close modal
        closeModal.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.style.overflow = "";
        });

        // Close modal when clicking outside
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    }

    // Function to open specific vote form
    function openVoteForm(voteId) {
        if (!voteId) return;

        // Hide all forms
        document.querySelectorAll(".vote-form").forEach((form) => {
            form.style.display = "none";
        });

        // Show success message
        document.getElementById("vote-success").style.display = "none";

        // Show selected form
        const selectedForm = document.getElementById(`vote-form-${voteId}`);
        if (selectedForm) {
            selectedForm.style.display = "block";

            // Update modal title based on vote
            const voteTitle = document
                .querySelector(`[data-vote-id="${voteId}"]`)
                .closest(".vote-card")
                .querySelector("h3").textContent;
            document.getElementById("modal-title").textContent = `Votează: ${voteTitle}`;
        } else {
            console.error(`Vote form with id "vote-form-${voteId}" not found!`);
        }
    }

    // Handle vote form submissions
    const voteForms = document.querySelectorAll(".vote-form");

    if (voteForms.length > 0) {
        voteForms.forEach((form) => {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                // Show success message
                document.getElementById("vote-form-container").style.display = "none";
                document.getElementById("vote-success").style.display = "block";

                // Update points based on vote
                const formId = this.id;
                let points = 15; // Default

                if (formId === "vote-form-2") {
                    points = 20;
                }

                document.getElementById("points-earned").textContent = points;

                // Reset form
                this.reset();
            });
        });
    }

    // Handle cancel buttons
    const cancelButtons = document.querySelectorAll('[id^="cancel-vote"]');

    if (cancelButtons.length > 0) {
        cancelButtons.forEach((button) => {
            button.addEventListener("click", () => {
                modal.classList.remove("show");
                document.body.style.overflow = "";
            });
        });
    }

    // Handle close success button
    const closeSuccessButton = document.getElementById("close-success");

    if (closeSuccessButton) {
        closeSuccessButton.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.style.overflow = "";

            // Reset view for next time
            setTimeout(() => {
                document.getElementById("vote-form-container").style.display = "block";
                document.getElementById("vote-success").style.display = "none";
            }, 300);
        });
    }

    // Handle checkbox selection limit for budget voting
    const budgetCheckboxes = document.querySelectorAll('input[name="budget-option"]');
    const selectedCountElement = document.getElementById("selected-count");
    const maxSelections = 3;

    if (budgetCheckboxes.length > 0 && selectedCountElement) {
        budgetCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                const checkedBoxes = document.querySelectorAll('input[name="budget-option"]:checked');

                // Update counter
                selectedCountElement.textContent = checkedBoxes.length;

                // Disable unchecked checkboxes if max reached
                if (checkedBoxes.length >= maxSelections) {
                    budgetCheckboxes.forEach((box) => {
                        if (!box.checked) {
                            box.disabled = true;
                            box.parentElement.classList.add("disabled");
                        }
                    });
                } else {
                    // Enable all checkboxes
                    budgetCheckboxes.forEach((box) => {
                        box.disabled = false;
                        box.parentElement.classList.remove("disabled");
                    });
                }
            });
        });
    }
});