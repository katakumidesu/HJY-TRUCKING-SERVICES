        function updateDate() {
            const now = new Date();
            const options = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('en-PH', options);
            const dateElement = document.querySelector('.date-picker span');
            if (dateElement) {
                dateElement.textContent = dateString;
            }
        }
        
        updateDate();
        setInterval(updateDate, 60000);

        function showAllDeliveries() {
            document.getElementById('recentDeliveries').style.display = 'none';
            document.getElementById('systemLogs').style.display = 'none';
            document.getElementById('adminAccounts').style.display = 'none';
            document.getElementById('allDeliveries').style.display = 'block';
        }

        function showRecentDeliveries() {
            document.getElementById('allDeliveries').style.display = 'none';
            document.getElementById('recentDeliveries').style.display = 'block';
            document.getElementById('systemLogs').style.display = 'block';
            document.getElementById('adminAccounts').style.display = 'block';
        }

        function showAllSystemLogs() {
            document.getElementById('recentDeliveries').style.display = 'none';
            document.getElementById('systemLogs').style.display = 'none';
            document.getElementById('adminAccounts').style.display = 'none';
            document.getElementById('allSystemLogs').style.display = 'block';
        }

        function showRecentSystemLogs() {
            document.getElementById('allSystemLogs').style.display = 'none';
            document.getElementById('recentDeliveries').style.display = 'block';
            document.getElementById('systemLogs').style.display = 'block';
            document.getElementById('adminAccounts').style.display = 'block';
        }


        // Delivery Expand/Collapse Functions
        let currentOpenDelivery = null;

        function toggleDeliveryDetails(deliveryId) {
            const detailsRow = document.getElementById('details-' + deliveryId);
            const button = document.querySelector(`tr[onclick="toggleDeliveryDetails('${deliveryId}')"] .btn-expand`);

            // If clicking the same row, toggle it off
            if (currentOpenDelivery === deliveryId) {
                detailsRow.style.display = 'none';
                if (button) button.textContent = 'Expand';
                currentOpenDelivery = null;
            } else {
                // Hide any currently open delivery
                if (currentOpenDelivery) {
                    document.getElementById('details-' + currentOpenDelivery).style.display = 'none';
                    const prevButton = document.querySelector(`tr[onclick="toggleDeliveryDetails('${currentOpenDelivery}')"] .btn-expand`);
                    if (prevButton) prevButton.textContent = 'Expand';
                }
                // Show the clicked delivery
                detailsRow.style.display = 'table-row';
                if (button) button.textContent = 'Collapse';
                currentOpenDelivery = deliveryId;
            }
        }

        // Admin Account Functions
        let currentOpenProfile = null;

        function showAdminProfile(adminId) {
            const profileRow = document.getElementById('profile-' + adminId);
            const arrow = document.getElementById('arrow-' + adminId);

            // If clicking the same row, toggle it off
            if (currentOpenProfile === adminId) {
                profileRow.style.display = 'none';
                if (arrow) arrow.classList.remove('arrow-up');
                currentOpenProfile = null;
            } else {
                // Hide any currently open profile and reset its arrow
                if (currentOpenProfile) {
                    document.getElementById('profile-' + currentOpenProfile).style.display = 'none';
                    const prevArrow = document.getElementById('arrow-' + currentOpenProfile);
                    if (prevArrow) prevArrow.classList.remove('arrow-up');
                }
                // pag i click ang table data mo rotate siya
                profileRow.style.display = 'table-row';
                if (arrow) arrow.classList.add('arrow-up');
                currentOpenProfile = adminId;
            }
        }
        // Edit Admin Modal Functions
        function openEditModal(adminId) {
            document.getElementById('editAdminModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeEditModal() {
            document.getElementById('editAdminModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Toggle password visibility
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        }

        // Toggle password fields visibility based on checkbox
        document.addEventListener('DOMContentLoaded', function() {
            const changePasswordCheck = document.getElementById('changePasswordCheck');
            const passwordFields = document.querySelector('.password-fields');
            
            if (changePasswordCheck) {
                changePasswordCheck.addEventListener('change', function() {
                    if (this.checked) {
                        passwordFields.classList.add('show');
                    } else {
                        passwordFields.classList.remove('show');
                    }
                });
            }
        });

        // Save changes function
        function saveAdminChanges() {
            alert('Admin information saved successfully!');
            closeEditModal();
        }

        // Add New Admin Modal Functions
        function openAddAdminModal() {
            document.getElementById('addAdminModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeAddAdminModal() {
            document.getElementById('addAdminModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            // Clear form fields
            document.getElementById('addAdminForm').reset();
        }

        function saveNewAdmin() {
            const firstName = document.getElementById('addFirstName').value;
            const lastName = document.getElementById('addLastName').value;
            const email = document.getElementById('addEmail').value;
            const username = document.getElementById('addUsername').value;
            const phone = document.getElementById('addPhone').value;
            const newPassword = document.getElementById('addNewPassword').value;
            const confirmPassword = document.getElementById('addConfirmPassword').value;

            // Basic validation
            if (!firstName || !lastName || !email || !username || !phone || !newPassword || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            alert('New admin added successfully!');
            closeAddAdminModal();
        }

        // Update click outside handler to handle both modals
        window.onclick = function(event) {
            const editModal = document.getElementById('editAdminModal');
            const addModal = document.getElementById('addAdminModal');
            if (event.target === editModal) {
                closeEditModal();
            }
            if (event.target === addModal) {
                closeAddAdminModal();
            }
        }