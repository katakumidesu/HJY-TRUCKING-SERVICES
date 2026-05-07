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

        // Deactivate Admin Modal Functions
        let currentDeactivateAdminId = null;
        let currentDeactivateAdminRow = null;
        let toastTimeout = null;

        function openDeactivateModal(adminId, adminName) {
            currentDeactivateAdminId = adminId;
            document.getElementById('deactivateAdminName').textContent = adminName;
            document.getElementById('deactivateModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeDeactivateModal() {
            document.getElementById('deactivateModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            currentDeactivateAdminId = null;
        }

        function confirmDeactivate() {
            if (currentDeactivateAdminId) {
                // Find and hide the admin row
                const adminRow = document.querySelector(`tr[onclick="showAdminProfile('${currentDeactivateAdminId}')"]`);
                const profileRow = document.getElementById('profile-' + currentDeactivateAdminId);
                
                if (adminRow) {
                    currentDeactivateAdminRow = adminRow;
                    adminRow.style.display = 'none';
                    if (profileRow) {
                        profileRow.style.display = 'none';
                    }
                }
                
                closeDeactivateModal();
                
                showToast();
            }
        }

        function showToast() {
            const toast = document.getElementById('toastNotification');
            toast.classList.add('show');
            
            // Auto hide after 5 seconds
            toastTimeout = setTimeout(() => {
                hideToast();
            }, 5000);
        }

        function hideToast() {
            const toast = document.getElementById('toastNotification');
            toast.classList.remove('show');
            if (toastTimeout) {
                clearTimeout(toastTimeout);
                toastTimeout = null;
            }
        }

        function undoDeactivate() {
            if (currentDeactivateAdminRow) {
                currentDeactivateAdminRow.style.display = '';
                currentDeactivateAdminRow = null;
            }
            hideToast();
        }

        // Update click outside handler to handle all modals
        window.onclick = function(event) {
            const editModal = document.getElementById('editAdminModal');
            const addModal = document.getElementById('addAdminModal');
            const deactivateModal = document.getElementById('deactivateModal');
            const restoreModal = document.getElementById('restoreModal');
            if (event.target === editModal) {
                closeEditModal();
            }
            if (event.target === addModal) {
                closeAddAdminModal();
            }
            if (event.target === deactivateModal) {
                closeDeactivateModal();
            }
            if (event.target === restoreModal) {
                closeRestoreModal();
            }
        }

        // Deactivated Accounts Management
        let deactivatedAdmins = [];
        let currentRestoreAdminId = null;
        let currentRestoreAdminData = null;

        function showDeactivatedAccounts() {
            document.getElementById('recentDeliveries').style.display = 'none';
            document.getElementById('systemLogs').style.display = 'none';
            document.getElementById('adminAccounts').style.display = 'none';
            document.getElementById('deactivatedAccounts').style.display = 'block';
            renderDeactivatedAccounts();
        }

        function showAdminAccounts() {
            document.getElementById('deactivatedAccounts').style.display = 'none';
            document.getElementById('recentDeliveries').style.display = 'block';
            document.getElementById('systemLogs').style.display = 'block';
            document.getElementById('adminAccounts').style.display = 'block';
        }

        let currentOpenDeactivatedProfile = null;

        function renderDeactivatedAccounts() {
            const tbody = document.getElementById('deactivatedAccountsBody');
            tbody.innerHTML = '';

            if (deactivatedAdmins.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #666;">No deactivated accounts found.</td></tr>';
                return;
            }

            deactivatedAdmins.forEach(admin => {
                // Main row with caret arrow
                const row = document.createElement('tr');
                row.className = 'admin-row';
                row.setAttribute('onclick', `showDeactivatedAdminProfile('${admin.id}')`);
                row.innerHTML = `
                    <td><img src="images/caret-arrow-down.png" id="deactivated-arrow-${admin.id}" class="caret-arrow"> ${admin.id}</td>
                    <td>${admin.name}</td>
                    <td>${admin.email}</td>
                    <td><span class="status-badge inactive"><i class="fas fa-circle"></i> Inactive</span></td>
                    <td class="action-cell">
                        <button class="btn-restore" onclick="event.stopPropagation(); openRestoreModal('${admin.id}', '${admin.name}')"><i class="fas fa-undo"></i> Restore</button>
                    </td>
                `;
                tbody.appendChild(row);

                // Profile row (hidden by default)
                const profileRow = document.createElement('tr');
                profileRow.className = 'admin-profile-row';
                profileRow.id = `deactivated-profile-${admin.id}`;
                profileRow.style.display = 'none';
                profileRow.innerHTML = `
                    <td colspan="5">
                        <div class="admin-profile-panel">
                            <div class="profile-header">
                                <h4><i class="fas fa-user-cog"></i> Admin Profile:</h4>
                            </div>
                            <div class="profile-content">
                                <div class="profile-picss">
                                    <img src="${admin.profilePic || 'images/markgrayson.png'}" alt="${admin.name}">
                                </div>
                                <div class="profile-details">
                                    <div class="profile-item">
                                        <i class="fas fa-user"></i>
                                        <span class="label">Full Name:</span>
                                        <span class="value">${admin.name}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-envelope"></i>
                                        <span class="label">Email Address:</span>
                                        <span class="value">${admin.email}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-phone"></i>
                                        <span class="label">Phone Number:</span>
                                        <span class="value">${admin.phone || 'N/A'}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-id-card"></i>
                                        <span class="label">Username:</span>
                                        <span class="value">${admin.username || 'N/A'}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-calendar"></i>
                                        <span class="label">Date Created:</span>
                                        <span class="value">${admin.dateCreated || 'N/A'}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-clock"></i>
                                        <span class="label">Last Login:</span>
                                        <span class="value">${admin.lastLogin || 'N/A'}</span>
                                    </div>
                                    <div class="profile-item">
                                        <i class="fas fa-ban"></i>
                                        <span class="label">Deactivated Date:</span>
                                        <span class="value">${admin.deactivatedDate || new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                `;
                tbody.appendChild(profileRow);
            });
        }

        function showDeactivatedAdminProfile(adminId) {
            const profileRow = document.getElementById('deactivated-profile-' + adminId);
            const arrow = document.getElementById('deactivated-arrow-' + adminId);

            if (currentOpenDeactivatedProfile === adminId) {
                profileRow.style.display = 'none';
                if (arrow) arrow.classList.remove('arrow-up');
                currentOpenDeactivatedProfile = null;
            } else {
                if (currentOpenDeactivatedProfile) {
                    document.getElementById('deactivated-profile-' + currentOpenDeactivatedProfile).style.display = 'none';
                    const prevArrow = document.getElementById('deactivated-arrow-' + currentOpenDeactivatedProfile);
                    if (prevArrow) prevArrow.classList.remove('arrow-up');
                }
                profileRow.style.display = 'table-row';
                if (arrow) arrow.classList.add('arrow-up');
                currentOpenDeactivatedProfile = adminId;
            }
        }

        function openRestoreModal(adminId, adminName) {
            currentRestoreAdminId = adminId;
            const admin = deactivatedAdmins.find(a => a.id === adminId);
            if (admin) {
                currentRestoreAdminData = admin;
            }
            document.getElementById('restoreAdminName').textContent = adminName;
            document.getElementById('restoreModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeRestoreModal() {
            document.getElementById('restoreModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            currentRestoreAdminId = null;
            currentRestoreAdminData = null;
        }

        function confirmRestore() {
            if (currentRestoreAdminId && currentRestoreAdminData) {
                // Remove from deactivated list
                deactivatedAdmins = deactivatedAdmins.filter(a => a.id !== currentRestoreAdminId);

                // Show the admin row back in the active table
                const adminRow = document.querySelector(`tr[onclick="showAdminProfile('${currentRestoreAdminId}')"]`);
                if (adminRow) {
                    adminRow.style.display = '';
                }

                // Update the total admins count
                updateAdminCount();

                // Re-render the deactivated accounts table
                renderDeactivatedAccounts();

                // Close the modal
                closeRestoreModal();

                // Show success toast
                showRestoreToast();
            }
        }

        function showRestoreToast() {
            const toast = document.getElementById('toastNotification');
            const toastMessage = toast.querySelector('.toast-message');
            const undoButton = toast.querySelector('.btn-undo');

            // Temporarily change toast content for restore
            const originalMessage = toastMessage.innerHTML;
            const originalUndo = undoButton.onclick;

            toastMessage.innerHTML = '<i class="fas fa-check-circle"></i> Admin Restored Successfully';
            undoButton.style.display = 'none';

            toast.classList.add('show');

            // Auto hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                // Restore original content after toast hides
                setTimeout(() => {
                    toastMessage.innerHTML = originalMessage;
                    undoButton.style.display = '';
                    undoButton.onclick = originalUndo;
                }, 300);
            }, 3000);
        }

        function updateAdminCount() {
            const activeCount = document.querySelectorAll('.admin-row:not([style*="display: none"])').length;
            const deactivatedCount = deactivatedAdmins.length;
            const totalCard = document.querySelector('.card-blue-light .card-number');
            const totalSubtitle = document.querySelector('.card-blue-light .card-subtitle');

            if (totalCard) {
                totalCard.textContent = activeCount;
            }
            if (totalSubtitle) {
                totalSubtitle.textContent = `${activeCount} Active - ${deactivatedCount} deactivated`;
            }
        }

        function changeDeactivatedPage(direction) {
            const pageElement = document.getElementById('deactivatedPageNum');
            const currentPage = parseInt(pageElement.textContent);
            const newPage = Math.max(1, currentPage + direction);
            pageElement.textContent = newPage;
        }

        // Override the confirmDeactivate function to save admin data
        const originalConfirmDeactivate = confirmDeactivate;
        confirmDeactivate = function() {
            if (currentDeactivateAdminId) {
                // Get admin data before hiding
                const adminRow = document.querySelector(`tr[onclick="showAdminProfile('${currentDeactivateAdminId}')"]`);
                const profileRow = document.getElementById('profile-' + currentDeactivateAdminId);

                if (adminRow) {
                    const cells = adminRow.querySelectorAll('td');
                    const profilePic = profileRow ? profileRow.querySelector('.profile-picss img') : null;
                    const profileDetails = profileRow ? profileRow.querySelectorAll('.profile-item .value') : [];

                    const adminData = {
                        id: currentDeactivateAdminId,
                        name: cells[1] ? cells[1].textContent : '',
                        email: cells[2] ? cells[2].textContent : '',
                        profilePic: profilePic ? profilePic.src : 'images/markgrayson.png',
                        phone: profileDetails[2] ? profileDetails[2].textContent : 'N/A',
                        username: profileDetails[3] ? profileDetails[3].textContent : 'N/A',
                        dateCreated: profileDetails[4] ? profileDetails[4].textContent : 'N/A',
                        lastLogin: profileDetails[5] ? profileDetails[5].textContent : 'N/A',
                        deactivatedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    };

                    // Add to deactivated list
                    deactivatedAdmins.push(adminData);

                    // Update counts
                    updateAdminCount();
                }

                // Hide the admin row and profile
                if (adminRow) {
                    adminRow.style.display = 'none';
                }
                if (profileRow) {
                    profileRow.style.display = 'none';
                }

                // Reset current open profile if it was this one
                if (currentOpenProfile === currentDeactivateAdminId) {
                    currentOpenProfile = null;
                }

                // Close the modal
                closeDeactivateModal();

                // Show toast notification
                showToast();
            }
        };