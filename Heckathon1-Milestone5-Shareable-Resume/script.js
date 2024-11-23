// Define the types for the form elements
var form = document.getElementById('resumeForm');
var generateResumeBtn = document.getElementById('generateResume');
var resumeContainer = document.getElementById('resumeContainer');
var formContainer = document.getElementById('formContainer');
var editResumeBtn = document.getElementById('editResume');
var downloadPDFBtn = document.getElementById('downloadPDF');
var shareResumeBtn = document.getElementById('shareResume');
var shareableLinkInput = document.getElementById('shareableLink');
// Add event listener to the generate resume button
generateResumeBtn.addEventListener('click', function () {
    var _a;
    // Fetch the input values
    var name = document.getElementById('name').value;
    var position = document.getElementById('position').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var linkedin = document.getElementById('linkedin').value;
    var profilePicture = ((_a = document.getElementById('profilePicture').files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    var sonOf = document.getElementById('sonOf').value;
    var dob = document.getElementById('dob').value;
    var nationality = document.getElementById('nationality').value;
    var languages = document.getElementById('languages').value;
    var hobbies = document.getElementById('hobbies').value;
    var objective = document.getElementById('objective').value;
    var experience = document.getElementById('experience').value.split(',');
    var education = document.getElementById('education').value.split(',');
    var skills = document.getElementById('skills').value.split(',');
    var certifications = document.getElementById('certifications').value.split(',');
    // Display resume in the right section
    document.getElementById('displayName').textContent = name;
    document.getElementById('displayPosition').textContent = position;
    document.getElementById('displayPhone').textContent = phone;
    var displayEmail = document.getElementById('displayEmail');
    displayEmail.textContent = email;
    displayEmail.href = "mailto:".concat(email);
    document.getElementById('displayAddress').textContent = address;
    var displayLinkedIn = document.getElementById('displayLinkedIn');
    displayLinkedIn.href = linkedin;
    displayLinkedIn.textContent = linkedin;
    // Display profile picture
    if (profilePicture) {
        var displayProfilePicture = document.getElementById('displayProfilePicture');
        displayProfilePicture.style.display = 'block';
        displayProfilePicture.src = URL.createObjectURL(profilePicture);
    }
    document.getElementById('displayObjective').textContent = objective;
    document.getElementById('displaySonOf').textContent = sonOf;
    document.getElementById('displayDOB').textContent = dob;
    document.getElementById('displayNationality').textContent = nationality;
    document.getElementById('displayLanguages').textContent = languages;
    document.getElementById('displayHobbies').textContent = hobbies;
    // Display Work Experience as List
    var experienceList = experience.map(function (item) { return "<li>".concat(item.trim(), "</li>"); }).join('');
    document.getElementById('displayExperience').innerHTML = "<ul>".concat(experienceList, "</ul>");
    // Display Education as List
    var educationList = education.map(function (item) { return "<li>".concat(item.trim(), "</li>"); }).join('');
    document.getElementById('displayEducation').innerHTML = "<ul>".concat(educationList, "</ul>");
    // Display Skills with Progress Bar
    var skillContainer = document.getElementById('displaySkills');
    skillContainer.innerHTML = skills.map(function (skill) {
        var _a = skill.trim().split(':'), name = _a[0], percentage = _a[1];
        return " \n            <div>\n                <p>".concat(name.trim(), "</p>\n                <div class=\"progress-container\">\n                    <div class=\"progress-bar\" style=\"width: ").concat(percentage.trim(), "%\">").concat(percentage.trim(), "%</div>\n                </div>\n            </div>\n        ");
    }).join('');
    // Display Certifications
    document.getElementById('displayCertifications').innerHTML = certifications.map(function (cert) { return "<p>".concat(cert.trim(), "</p>"); }).join('');
    // Hide the form and show the resume
    formContainer.style.display = 'none';
    resumeContainer.style.display = 'block';
});
// Event listener for editing the resume
editResumeBtn.addEventListener('click', function () {
    formContainer.style.display = 'block';
    resumeContainer.style.display = 'none';
});
// Download PDF functionality
downloadPDFBtn.addEventListener('click', function () {
    var resumeElement = document.getElementById('resumeContainer');
    var opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            hotfixes: ['px_scaling'] // Prevents content from being too large
        }
    };
    html2pdf().from(resumeElement).set(opt).save();
});
// Share Resume functionality
shareResumeBtn.addEventListener('click', function () {
    var resumeData = {
        name: document.getElementById('displayName').textContent,
        position: document.getElementById('displayPosition').textContent,
        phone: document.getElementById('displayPhone').textContent,
        email: document.getElementById('displayEmail').textContent,
        address: document.getElementById('displayAddress').textContent
    };
    // You could integrate this with a sharing service like email or social media
    shareableLinkInput.value = "Resume Link: https://your-resume-link.com/".concat(resumeData.name);
});
