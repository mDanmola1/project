// Ensure all DOM content is loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Login, Create Account, and Sign-out button functionality
    document.getElementById('login-button').addEventListener('click', function() {
        toggleVisibility('login-window');
        document.getElementById('create-account-window').style.display = 'none';
    });

    document.getElementById('create-account-button').addEventListener('click', function() {
        toggleVisibility('create-account-window');
        document.getElementById('login-window').style.display = 'none';
        document.getElementById('output-login').style.display = 'none';
    });

    // Handle account creation submission
    document.getElementById('create-account-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        submitAccount();
    });
});

// Toggle visibility of elements
function toggleVisibility(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block' ? 'none' : 'block');
}

// Handle login functionality
function submitLogin() {
    let form = document.getElementById('login-form');
    let formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin' // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid username or password');
        }
    })
    .then(data => {
        // Handle successful login
        document.getElementById('login-feedback').innerHTML = 'Login successful!';
        document.getElementById('student-name-window').style.display = 'block';
        document.getElementById('login-window').style.display = 'none';
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('create-account-button').style.display = 'none';
        document.getElementById('sign-out-button').style.display = 'block'; // Show sign-out button
        document.getElementById('save-students-button').style.display = 'block'; // Show the Save Students button
        
        // Redirect to the desired page after successful login
        window.location.href = '/attendance/'; // Replace with the actual URL
    })
    .catch(error => {
        // Handle login error
        document.getElementById('login-feedback').innerHTML = error.message;
    });
}

// Handle account creation functionality
function submitAccount() {
    let form = document.getElementById('create-account-form');
    let formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin' // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Account creation failed');
        }
    })
    .then(data => {
        // Handle successful account creation
        document.getElementById('output-submit-account').innerHTML = `Account created successfully!`;
        document.getElementById('output-submit-account').style.display = 'block';
        document.getElementById('create-account-window').style.display = 'none';
    })
    .catch(error => {
        // Handle account creation error
        console.error(error);
    });
}

// Function to add students
function addStudents() {
    let input = document.getElementById('student-names-input').value;
    let names = input.split(',');

    names.forEach(name => {
        addStudent(name.trim());
    });

    document.getElementById('student-names-input').value = ''; // Clear the input field after adding
}

// Function to save students
function saveStudents() {
    let students = [];
    document.querySelectorAll('.student .student-name').forEach(elem => {
        students.push(elem.textContent);
    });

    // Perform AJAX request to save students
    fetch('/save_students/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(students)
    })
    .then(response => {
        if (response.ok) {
            alert('Students saved successfully!');
        } else {
            throw new Error('Failed to save students');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

// Function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
