        // Sidebar Toggle Functionality
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebarIcon = document.getElementById('sidebar-icon');
        const mainContent = document.getElementById('main-content');

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // Change icon based on sidebar state
            if (sidebar.classList.contains('collapsed')) {
                sidebarIcon.classList.remove('fa-bars');
                sidebarIcon.classList.add('fa-chevron-right');
            } else {
                sidebarIcon.classList.remove('fa-chevron-right');
                sidebarIcon.classList.add('fa-bars');
            }
        });

        // Responsive behavior for mobile
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
                sidebarToggle.classList.add('collapsed');
                mainContent.classList.add('expanded');
                sidebarIcon.classList.remove('fa-bars');
                sidebarIcon.classList.add('fa-chevron-right');
            } else {
                sidebar.classList.remove('collapsed');
                sidebarToggle.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                sidebarIcon.classList.remove('fa-chevron-right');
                sidebarIcon.classList.add('fa-bars');
            }
        }

        // Check on load
        checkScreenSize();
        
        // Check on resize
        window.addEventListener('resize', checkScreenSize);

        // Notification Dropdown
        const notificationToggle = document.getElementById('notification-toggle');
        const notificationDropdown = document.getElementById('notification-dropdown');

        notificationToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            
            // Hide user dropdown if open
            userDropdown.classList.remove('show');
        });
        
        // User Dropdown
        const userMenuToggle = document.getElementById('user-menu-toggle');
        const userDropdown = document.getElementById('user-dropdown');
        
        userMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
            
            // Hide notification dropdown if open
            notificationDropdown.classList.remove('show');
        });

        document.addEventListener('click', (e) => {
            if (!notificationToggle.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
            
            if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });

        // Animated Counter
        function animateCounter(elementId, targetValue, duration = 2000) {
            const element = document.getElementById(elementId);
            const startValue = 0;
            const increment = targetValue / (duration / 16);
            let currentValue = startValue;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    clearInterval(timer);
                    currentValue = targetValue;
                }
                element.textContent = Math.floor(currentValue).toLocaleString();
            }, 16);
        }

        // Initialize counters with animation
        setTimeout(() => {
            animateCounter('total-applications', 12845);
            animateCounter('processed-documents', 9382);
            animateCounter('active-users', 5721);
            animateCounter('pending-approvals', 1284);
        }, 500);

        // Application Statistics Grid
        function createAppStatsGrid(period) {
            const container = document.getElementById('app-stats-grid');
            container.innerHTML = '';
            
            let stats = [];
            
            switch(period) {
                case 'day':
                    stats = [
                        { title: 'New Applications', icon: 'fa-file-alt', value: 245, trend: 'up', percentage: 12 },
                        { title: 'Processed', icon: 'fa-check-circle', value: 189, trend: 'up', percentage: 8 },
                        { title: 'Pending Review', icon: 'fa-clock', value: 56, trend: 'down', percentage: 3 },
                        { title: 'Rejected', icon: 'fa-times-circle', value: 12, trend: 'neutral', percentage: 0 },
                        { title: 'Processing Time', icon: 'fa-stopwatch', value: '42 min', trend: 'down', percentage: 15 },
                        { title: 'Satisfaction', icon: 'fa-smile', value: '94%', trend: 'up', percentage: 2 }
                    ];
                    break;
                case 'week':
                    stats = [
                        { title: 'New Applications', icon: 'fa-file-alt', value: 1245, trend: 'up', percentage: 8 },
                        { title: 'Processed', icon: 'fa-check-circle', value: 1056, trend: 'up', percentage: 12 },
                        { title: 'Pending Review', icon: 'fa-clock', value: 189, trend: 'down', percentage: 5 },
                        { title: 'Rejected', icon: 'fa-times-circle', value: 78, trend: 'up', percentage: 3 },
                        { title: 'Processing Time', icon: 'fa-stopwatch', value: '38 min', trend: 'down', percentage: 10 },
                        { title: 'Satisfaction', icon: 'fa-smile', value: '92%', trend: 'up', percentage: 1 }
                    ];
                    break;
                case 'month':
                    stats = [
                        { title: 'New Applications', icon: 'fa-file-alt', value: 5280, trend: 'up', percentage: 15 },
                        { title: 'Processed', icon: 'fa-check-circle', value: 4850, trend: 'up', percentage: 18 },
                        { title: 'Pending Review', icon: 'fa-clock', value: 430, trend: 'down', percentage: 8 },
                        { title: 'Rejected', icon: 'fa-times-circle', value: 320, trend: 'neutral', percentage: 0 },
                        { title: 'Processing Time', icon: 'fa-stopwatch', value: '45 min', trend: 'down', percentage: 12 },
                        { title: 'Satisfaction', icon: 'fa-smile', value: '91%', trend: 'up', percentage: 3 }
                    ];
                    break;
                case 'year':
                    stats = [
                        { title: 'New Applications', icon: 'fa-file-alt', value: 58420, trend: 'up', percentage: 22 },
                        { title: 'Processed', icon: 'fa-check-circle', value: 54280, trend: 'up', percentage: 25 },
                        { title: 'Pending Review', icon: 'fa-clock', value: 4140, trend: 'down', percentage: 15 },
                        { title: 'Rejected', icon: 'fa-times-circle', value: 3650, trend: 'down', percentage: 5 },
                        { title: 'Processing Time', icon: 'fa-stopwatch', value: '40 min', trend: 'down', percentage: 18 },
                        { title: 'Satisfaction', icon: 'fa-smile', value: '93%', trend: 'up', percentage: 4 }
                    ];
                    break;
            }
            
            stats.forEach(stat => {
                const statCard = document.createElement('div');
                statCard.className = 'app-stat-card';
                
                const statTitle = document.createElement('div');
                statTitle.className = 'app-stat-title';
                statTitle.innerHTML = `<i class="fas ${stat.icon}"></i> ${stat.title}`;
                
                const statValue = document.createElement('div');
                statValue.className = 'app-stat-value';
                statValue.textContent = stat.value.toLocaleString();
                
                const statTrend = document.createElement('div');
                statTrend.className = `app-stat-trend ${stat.trend}`;
                
                let trendIcon, trendText;
                if (stat.trend === 'up') {
                    trendIcon = '<i class="fas fa-arrow-up"></i>';
                    trendText = `${stat.percentage}% increase`;
                } else if (stat.trend === 'down') {
                    trendIcon = '<i class="fas fa-arrow-down"></i>';
                    trendText = `${stat.percentage}% decrease`;
                } else {
                    trendIcon = '<i class="fas fa-minus"></i>';
                    trendText = 'No change';
                }
                
                statTrend.innerHTML = `${trendIcon} ${trendText}`;
                
                statCard.appendChild(statTitle);
                statCard.appendChild(statValue);
                statCard.appendChild(statTrend);
                
                container.appendChild(statCard);
            });
        }

        // Service Distribution - Donut Chart
        function createDonutChart() {
            const canvas = document.getElementById('donut-chart');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            canvas.width = 200;
            canvas.height = 200;
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const outerRadius = Math.min(centerX, centerY) - 5;
            const innerRadius = outerRadius * 0.6;
            
            const services = [
                { name: 'ID Services', percentage: 30, color: '#1e40af' },
                { name: 'Vehicle Registration', percentage: 25, color: '#3b82f6' },
                { name: 'Property Records', percentage: 15, color: '#60a5fa' },
                { name: 'Education', percentage: 10, color: '#93c5fd' },
                { name: 'Healthcare', percentage: 12, color: '#bfdbfe' },
                { name: 'Other', percentage: 8, color: '#dbeafe' }
            ];
            
            let startAngle = -0.5 * Math.PI;
            
            services.forEach(service => {
                const sliceAngle = (service.percentage / 100) * 2 * Math.PI;
                const endAngle = startAngle + sliceAngle;
                
                // Draw slice
                ctx.beginPath();
                ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
                ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
                ctx.closePath();
                ctx.fillStyle = service.color;
                ctx.fill();
                
                startAngle = endAngle;
            });
            
            // Create legend
            const legendContainer = document.getElementById('service-legend');
            legendContainer.innerHTML = '';
            
            services.forEach(service => {
                const legendItem = document.createElement('div');
                legendItem.className = 'service-legend-item';
                
                const legendColor = document.createElement('div');
                legendColor.className = 'service-legend-color';
                legendColor.style.backgroundColor = service.color;
                
                const legendInfo = document.createElement('div');
                legendInfo.className = 'service-legend-info';
                
                const legendName = document.createElement('div');
                legendName.className = 'service-legend-name';
                legendName.textContent = service.name;
                
                const legendValue = document.createElement('div');
                legendValue.className = 'service-legend-value';
                legendValue.textContent = `${service.percentage}%`;
                
                legendInfo.appendChild(legendName);
                legendInfo.appendChild(legendValue);
                
                legendItem.appendChild(legendColor);
                legendItem.appendChild(legendInfo);
                
                legendContainer.appendChild(legendItem);
            });
        }

        // Task Management
        function createTaskList(containerId, tasks) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                
                const taskCheckbox = document.createElement('div');
                taskCheckbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
                if (task.completed) {
                    taskCheckbox.innerHTML = '<i class="fas fa-check"></i>';
                }
                
                const taskContent = document.createElement('div');
                taskContent.className = 'task-content';
                
                const taskTitle = document.createElement('div');
                taskTitle.className = `task-title ${task.completed ? 'completed' : ''}`;
                taskTitle.textContent = task.title;
                
                const taskMeta = document.createElement('div');
                taskMeta.className = 'task-meta';
                
                const taskPriority = document.createElement('span');
                taskPriority.className = `task-priority ${task.priority}`;
                taskPriority.textContent = task.priority;
                
                const taskDueDate = document.createElement('span');
                taskDueDate.textContent = `Due: ${task.dueDate}`;
                
                taskMeta.appendChild(taskPriority);
                taskMeta.appendChild(taskDueDate);
                
                taskContent.appendChild(taskTitle);
                taskContent.appendChild(taskMeta);
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                const editAction = document.createElement('div');
                editAction.className = 'task-action tooltip';
                editAction.innerHTML = '<i class="fas fa-edit"></i>';
                
                const editTooltip = document.createElement('span');
                editTooltip.className = 'tooltip-text';
                editTooltip.textContent = 'Edit Task';
                
                editAction.appendChild(editTooltip);
                
                const deleteAction = document.createElement('div');
                deleteAction.className = 'task-action tooltip';
                deleteAction.innerHTML = '<i class="fas fa-trash"></i>';
                
                const deleteTooltip = document.createElement('span');
                deleteTooltip.className = 'tooltip-text';
                deleteTooltip.textContent = 'Delete Task';
                
                deleteAction.appendChild(deleteTooltip);
                
                taskActions.appendChild(editAction);
                taskActions.appendChild(deleteAction);
                
                taskItem.appendChild(taskCheckbox);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(taskActions);
                
                container.appendChild(taskItem);
                
                // Toggle task completion
                taskCheckbox.addEventListener('click', () => {
                    taskCheckbox.classList.toggle('checked');
                    taskTitle.classList.toggle('completed');
                    
                    if (taskCheckbox.classList.contains('checked')) {
                        taskCheckbox.innerHTML = '<i class="fas fa-check"></i>';
                    } else {
                        taskCheckbox.innerHTML = '';
                    }
                });
                
                // Delete task
                deleteAction.addEventListener('click', () => {
                    taskItem.style.opacity = '0';
                    setTimeout(() => {
                        container.removeChild(taskItem);
                    }, 300);
                });
            });
        }

        // Chart Period Buttons
        const chartActions = document.querySelectorAll('.widget-action[data-period]');
        chartActions.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                chartActions.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update app stats grid based on period
                const period = button.getAttribute('data-period');
                createAppStatsGrid(period);
            });
        });

        // Initialize data visualizations
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Application Stats Grid
            createAppStatsGrid('week');
            
            // Initialize Donut Chart
            createDonutChart();
            
            // Initialize Task List
            const tasks = [
                { 
                    title: 'Review pending applications', 
                    completed: false, 
                    priority: 'high', 
                    dueDate: 'Today' 
                },
                { 
                    title: 'Update system documentation', 
                    completed: true, 
                    priority: 'medium', 
                    dueDate: 'Yesterday' 
                },
                { 
                    title: 'Prepare monthly report', 
                    completed: false, 
                    priority: 'high', 
                    dueDate: 'Tomorrow' 
                },
                { 
                    title: 'Schedule team meeting', 
                    completed: false, 
                    priority: 'medium', 
                    dueDate: 'Mar 20' 
                },
                { 
                    title: 'Review security protocols', 
                    completed: false, 
                    priority: 'low', 
                    dueDate: 'Mar 25' 
                }
            ];
            createTaskList('task-list', tasks);
            
            // Make sure charts are responsive
            window.addEventListener('resize', function() {
                createDonutChart();
            });
        });

        // Add Task Button
        document.getElementById('add-task-btn').addEventListener('click', () => {
            const taskTitle = prompt('Enter task title:');
            if (taskTitle) {
                const taskList = document.getElementById('task-list');
                const newTask = {
                    title: taskTitle,
                    completed: false,
                    priority: 'medium',
                    dueDate: 'Today'
                };
                
                // Create a single task item
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                
                const taskCheckbox = document.createElement('div');
                taskCheckbox.className = 'task-checkbox';
                
                const taskContent = document.createElement('div');
                taskContent.className = 'task-content';
                
                const taskTitleEl = document.createElement('div');
                taskTitleEl.className = 'task-title';
                taskTitleEl.textContent = newTask.title;
                
                const taskMeta = document.createElement('div');
                taskMeta.className = 'task-meta';
                
                const taskPriority = document.createElement('span');
                taskPriority.className = `task-priority ${newTask.priority}`;
                taskPriority.textContent = newTask.priority;
                
                const taskDueDate = document.createElement('span');
                taskDueDate.textContent = `Due: ${newTask.dueDate}`;
                
                taskMeta.appendChild(taskPriority);
                taskMeta.appendChild(taskDueDate);
                
                taskContent.appendChild(taskTitleEl);
                taskContent.appendChild(taskMeta);
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                const editAction = document.createElement('div');
                editAction.className = 'task-action tooltip';
                editAction.innerHTML = '<i class="fas fa-edit"></i>';
                
                const editTooltip = document.createElement('span');
                editTooltip.className = 'tooltip-text';
                editTooltip.textContent = 'Edit Task';
                
                editAction.appendChild(editTooltip);
                
                const deleteAction = document.createElement('div');
                deleteAction.className = 'task-action tooltip';
                deleteAction.innerHTML = '<i class="fas fa-trash"></i>';
                
                const deleteTooltip = document.createElement('span');
                deleteTooltip.className = 'tooltip-text';
                deleteTooltip.textContent = 'Delete Task';
                
                deleteAction.appendChild(deleteTooltip);
                
                taskActions.appendChild(editAction);
                taskActions.appendChild(deleteAction);
                
                taskItem.appendChild(taskCheckbox);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(taskActions);
                
                taskList.insertBefore(taskItem, taskList.firstChild);
                
                // Add animation
                taskItem.style.opacity = '0';
                taskItem.style.transform = 'translateY(-10px)';
                taskItem.style.transition = 'opacity 0.3s, transform 0.3s';
                
                setTimeout(() => {
                    taskItem.style.opacity = '1';
                    taskItem.style.transform = 'translateY(0)';
                }, 10);
                
                // Toggle task completion
                taskCheckbox.addEventListener('click', () => {
                    taskCheckbox.classList.toggle('checked');
                    taskTitleEl.classList.toggle('completed');
                    
                    if (taskCheckbox.classList.contains('checked')) {
                        taskCheckbox.innerHTML = '<i class="fas fa-check"></i>';
                    } else {
                        taskCheckbox.innerHTML = '';
                    }
                });
                
                // Delete task
                deleteAction.addEventListener('click', () => {
                    taskItem.style.opacity = '0';
                    taskItem.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        taskList.removeChild(taskItem);
                    }, 300);
                });
            }
        });

        // Make table rows clickable
        const tableRows = document.querySelectorAll('.activity-table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('click', () => {
                // You would typically navigate to a detail page or show a modal
                alert('Viewing details for this activity');
            });
            row.style.cursor = 'pointer';
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                alert(`Searching for: ${this.value}`);
                this.value = '';
            }
        });

        // Make nav items clickable
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // You would typically navigate to a new page here
                const itemName = this.querySelector('span').textContent;
                alert(`Navigating to ${itemName}`);
            });
        });

        // Hide loading bar after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading-bar').style.display = 'none';
            }, 2000);
        });
        
        // Theme Switcher
        const adminThemeBtn = document.getElementById('admin-theme');
        const userThemeBtn = document.getElementById('user-theme');
        const switchRoleBtn = document.getElementById('switch-role-btn');
        const roleBadge = document.getElementById('role-badge');
        const userRoleText = document.querySelector('.user-role');
        const userDropdownRole = document.querySelector('.user-dropdown-role');
        
        adminThemeBtn.addEventListener('click', () => {
            document.body.classList.remove('user-theme');
            document.body.classList.add('admin-theme');
            adminThemeBtn.classList.add('active');
            userThemeBtn.classList.remove('active');
            roleBadge.textContent = 'Administrator';
            userRoleText.textContent = 'Administrator';
            userDropdownRole.textContent = 'Administrator';
            switchRoleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i><span>Switch to User View</span>';
        });
        
        userThemeBtn.addEventListener('click', () => {
            document.body.classList.remove('admin-theme');
            document.body.classList.add('user-theme');
            adminThemeBtn.classList.remove('active');
            userThemeBtn.classList.add('active');
            roleBadge.textContent = 'User';
            userRoleText.textContent = 'User';
            userDropdownRole.textContent = 'User';
            switchRoleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i><span>Switch to Admin View</span>';
        });
        
        switchRoleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('admin-theme')) {
                document.body.classList.remove('admin-theme');
                document.body.classList.add('user-theme');
                adminThemeBtn.classList.remove('active');
                userThemeBtn.classList.add('active');
                roleBadge.textContent = 'User';
                userRoleText.textContent = 'User';
                userDropdownRole.textContent = 'User';  
                switchRoleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i><span>Switch to Admin View</span>';
            } else {
                document.body.classList.remove('user-theme');
                document.body.classList.add('admin-theme');
                adminThemeBtn.classList.add('active');
                userThemeBtn.classList.remove('active');
                roleBadge.textContent = 'Administrator';
                userRoleText.textContent = 'Administrator';
                userDropdownRole.textContent = 'Administrator';
                switchRoleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i><span>Switch to User View</span>';
            }
            userDropdown.classList.remove('show');
        });
