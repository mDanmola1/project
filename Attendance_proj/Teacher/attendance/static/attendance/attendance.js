document.addEventListener('DOMContentLoaded', function() {
    loadStudentsForUser(localStorage.getItem('username')); // Load students upon page load
    document.getElementById('save-students-button').addEventListener('click', saveStudents);
    document.getElementById('sign-out-button').addEventListener('click', signOut);  
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if the cookie name matches the CSRF token name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Extract and decode the CSRF token
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function signOut() {
    localStorage.clear(); // Clears all data stored in localStorage
    window.location.href = '/accounts/login/'; // Redirects to the login page
}

// Attach the signOut function directly to the sign-out button event
document.getElementById('sign-out-button').addEventListener('click', signOut);

function addMultipleStudents() {
    let input = document.getElementById('student-input').value;
    if (input.trim().length === 0) {
        alert("Please enter some names.");
        return;
    }
    let names = input.split(',');
    names.forEach(name => {
        if (name.trim() !== "") {
            addStudent(name.trim());
        }
    });
    document.getElementById('student-input').value = ''; // Clear the input field after adding
}

function addStudent(name) {
    let listDiv = document.getElementById('student-list-div');
    let studentDiv = document.createElement('div');
    studentDiv.className = 'student';

    let nameLabel = document.createElement('span');
    nameLabel.textContent = name;
    nameLabel.className = 'student-name';
    studentDiv.appendChild(nameLabel);

    let input = document.createElement('input'); // Input for editing
    input.type = 'text';
    input.value = name;
    input.className = 'edit-input';
    input.style.display = 'none'; // Initially hide the input
    studentDiv.appendChild(input);

    let controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'button';
    editButton.onclick = function() {
        if (editButton.textContent === 'Edit') {
            nameLabel.style.display = 'none';
            input.style.display = 'inline-block'; // Show input for editing
            input.focus(); // Focus on the input field
            editButton.textContent = 'Save';
        } else {
            nameLabel.textContent = input.value; // Update the label with new input
            nameLabel.style.display = 'inline';
            input.style.display = 'none'; // Hide the input again
            editButton.textContent = 'Edit';
            saveStudents(); // Save the updated list
        }
    };
    
    controlsDiv.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'button';
    deleteButton.onclick = function() {
        if (confirm('Are you sure you want to delete this student?')) {
            studentDiv.remove(); // Remove the student entry
            saveStudents(); // Save the updated list to localStorage after deletion
            alert('Student deleted successfully!'); // Confirmation message after save
        }
    };
    
    controlsDiv.appendChild(deleteButton);

    let toggleButton = createToggleButton();
    controlsDiv.appendChild(toggleButton);

    studentDiv.appendChild(controlsDiv);

    listDiv.appendChild(studentDiv);
}

function createToggleButton() {
    let toggleButton = document.createElement('button');
    toggleButton.textContent = 'Present'; // Set default state to Present
    toggleButton.classList.add('toggle-button', 'present');
    toggleButton.onclick = function() {
        toggleButton.textContent = (toggleButton.textContent === 'Present' ? 'Absent' : 'Present');
        toggleButton.classList.toggle('present');
        toggleButton.classList.toggle('absent');
    };
    return toggleButton;
}

function saveStudents(showAlert = false) {
    let username = localStorage.getItem('username');
    let students = [];
    document.querySelectorAll('.student .student-name').forEach(function(elem) {
        students.push(elem.textContent);
    });

    // Make a POST request to the /api/attendance/ endpoint
    fetch('/api/attendance/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Ensure CSRF token is included
        },
        body: JSON.stringify({ username: username, students: students }),
    })
    .then(response => {
        if (response.ok) {
            if (showAlert) {
                alert('Students saved successfully!');
            }
        } else {
            throw new Error('Failed to save students');
        }
    })
    .catch(error => {
        console.error('Error saving students:', error);
    });
}


