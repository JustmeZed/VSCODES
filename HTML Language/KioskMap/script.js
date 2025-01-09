document.addEventListener("DOMContentLoaded", () => {
  const tds = document.querySelectorAll("td.col"); // All <td> elements with the 'col' class
  const region = document.querySelectorAll(".region");
  const modal = document.getElementById("modal"); // Modal container
  const modalBody = document.getElementById("modal-body"); // Modal body
  const closeBtn = document.querySelector(".close"); // Close button
  const leftDiv = document.querySelector(".left"); // Left section (menu area)
  const rightDiv = document.querySelector(".right"); // Right section (map area)
  let modalOpenedByTd = false;

  let hoverDisabled = false; // Flag to control hover functionality
  let autoCloseTimeout = null; // Timeout for auto-closing modal

  function showModal(contentId, openedByTd = false) {
    modalOpenedByTd = openedByTd; // Set whether modal was opened by a td
    modal.style.display = "block"; // Show modal
    document.body.style.overflow = "hidden"; // Prevent scrollbars

    // Load content dynamically based on the contentId
    if (!modalBody.innerHTML.trim() || modalBody.dataset.loaded !== contentId) {
      modalBody.innerHTML = ""; // Clear current content
      modalBody.dataset.loaded = contentId; // Mark the loaded content
      fetch(`modals/${contentId}.html`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error loading ${contentId}: ${response.statusText}`
            );
          }
          return response.text();
        })
        .then((html) => {
          modalBody.innerHTML = html; // Insert the content into the modal body
        })
        .catch((error) => console.error("Error loading modal content:", error));
    }

    // Clear any pending auto-close timeout
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = null;
    }
  }

  function hideModal() {
    modal.style.display = "none"; // Hide modal
    document.body.style.overflow = ""; // Restore scrolling
    enableMapInteractions(); // Re-enable interactions with the map
    modalOpenedByTd = false; // Reset the flag
  }

  // Disable hover behavior on the map
  function disableHover() {
    hoverDisabled = true; // Disable hover functionality
  }

  // Enable hover functionality again (e.g., when leaving the modal)
  function enableHover() {
    hoverDisabled = false; // Re-enable hover functionality
  }

  region.forEach((region) => {
    region.addEventListener("mouseover", () => {
      if (!hoverDisabled && !modalOpenedByTd) {
        showModal(region.id); // Pass the region's ID (e.g., "pylon" or "gate")
      }
    });

    region.addEventListener("mouseout", () => {
      if (!hoverDisabled && !modalOpenedByTd) {
        autoCloseTimeout = setTimeout(() => {
          hideModal();
        }, 200);
      }
    });
  });

  // Cancel auto-close if mouse enters the modal
  modal.addEventListener("mouseenter", () => {
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = null;
    }
  });

  // Automatically close the modal if the cursor leaves it
  modal.addEventListener("mouseleave", () => {
    hideModal(); // Close modal when the cursor leaves the modal
  });

  function disableMapInteractions() {
    const rightDiv = document.querySelector(".right"); // Ensure only the right div is affected
    rightDiv.style.cursor = "not-allowed"; // Set cursor to 'not-allowed'
    region.forEach((region) => {
      region.style.pointerEvents = "none"; // Disable pointer events for map regions
      region.style.cursor = "not-allowed";
    });
  }

  function enableMapInteractions() {
    const rightDiv = document.querySelector(".right"); // Restore cursor in the right div
    rightDiv.style.cursor = ""; // Reset cursor to default
    region.forEach((region) => {
      region.style.pointerEvents = ""; // Re-enable pointer events for map regions
      region.style.cursor = "";
    });
  }

  // Add click event listeners for all <td> elements
  tds.forEach((td) => {
    td.addEventListener("click", () => {
      const modalId = td.dataset.modal; // Get the data-modal attribute
      disableMapInteractions(); // Disable interactions with the map
      showModal(modalId, true); // Pass true to indicate modal was opened by td
    });
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener("click", () => {
    hideModal(); // Hide modal
  });
});
