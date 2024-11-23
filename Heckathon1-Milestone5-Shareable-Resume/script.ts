// Define the types for the form elements
const form = document.getElementById('resumeForm') as HTMLFormElement;
const generateResumeBtn = document.getElementById('generateResume') as HTMLButtonElement;
const resumeContainer = document.getElementById('resumeContainer') as HTMLElement;
const formContainer = document.getElementById('formContainer') as HTMLElement;
const editResumeBtn = document.getElementById('editResume') as HTMLButtonElement;
const downloadPDFBtn = document.getElementById('downloadPDF') as HTMLButtonElement;
const shareResumeBtn = document.getElementById('shareResume') as HTMLButtonElement;
const shareableLinkInput = document.getElementById('shareableLink') as HTMLInputElement;

// Define the types for input values
type ResumeInputValues = {
    name: string;
    position: string;
    phone: string;
    email: string;
    address: string;
    linkedin: string;
    profilePicture: File | null;
    sonOf: string;
    dob: string;
    nationality: string;
    languages: string;
    hobbies: string;
    objective: string;
    experience: string[];
    education: string[];
    skills: string[];
    certifications: string[];
};

// Add event listener to the generate resume button
generateResumeBtn.addEventListener('click', () => {
    // Fetch the input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
    const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement).files?.[0] || null;
    const sonOf = (document.getElementById('sonOf') as HTMLInputElement).value;
    const dob = (document.getElementById('dob') as HTMLInputElement).value;
    const nationality = (document.getElementById('nationality') as HTMLInputElement).value;
    const languages = (document.getElementById('languages') as HTMLInputElement).value;
    const hobbies = (document.getElementById('hobbies') as HTMLInputElement).value;
    const objective = (document.getElementById('objective') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.split(',');
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.split(',');
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split(',');
    const certifications = (document.getElementById('certifications') as HTMLTextAreaElement).value.split(',');

    // Display resume in the right section
    (document.getElementById('displayName') as HTMLElement).textContent = name;
    (document.getElementById('displayPosition') as HTMLElement).textContent = position;
    (document.getElementById('displayPhone') as HTMLElement).textContent = phone;
    const displayEmail = document.getElementById('displayEmail') as HTMLAnchorElement;
    displayEmail.textContent = email;
    displayEmail.href = `mailto:${email}`;
    (document.getElementById('displayAddress') as HTMLElement).textContent = address;
    const displayLinkedIn = document.getElementById('displayLinkedIn') as HTMLAnchorElement;
    displayLinkedIn.href = linkedin;
    displayLinkedIn.textContent = linkedin;

    // Display profile picture
    if (profilePicture) {
        const displayProfilePicture = document.getElementById('displayProfilePicture') as HTMLImageElement;
        displayProfilePicture.style.display = 'block';
        displayProfilePicture.src = URL.createObjectURL(profilePicture);
    }

    (document.getElementById('displayObjective') as HTMLElement).textContent = objective;
    (document.getElementById('displaySonOf') as HTMLElement).textContent = sonOf;
    (document.getElementById('displayDOB') as HTMLElement).textContent = dob;
    (document.getElementById('displayNationality') as HTMLElement).textContent = nationality;
    (document.getElementById('displayLanguages') as HTMLElement).textContent = languages;
    (document.getElementById('displayHobbies') as HTMLElement).textContent = hobbies;

    // Display Work Experience as List
    const experienceList = experience.map(item => `<li>${item.trim()}</li>`).join('');
    (document.getElementById('displayExperience') as HTMLElement).innerHTML = `<ul>${experienceList}</ul>`;

    // Display Education as List
    const educationList = education.map(item => `<li>${item.trim()}</li>`).join('');
    (document.getElementById('displayEducation') as HTMLElement).innerHTML = `<ul>${educationList}</ul>`;

    // Display Skills with Progress Bar
    const skillContainer = document.getElementById('displaySkills') as HTMLElement;
    skillContainer.innerHTML = skills.map(skill => {
        const [name, percentage] = skill.trim().split(':');
        return ` 
            <div>
                <p>${name.trim()}</p>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${percentage.trim()}%">${percentage.trim()}%</div>
                </div>
            </div>
        `;
    }).join('');

    // Display Certifications
    (document.getElementById('displayCertifications') as HTMLElement).innerHTML = certifications.map(cert => `<p>${cert.trim()}</p>`).join('');

    // Hide the form and show the resume
    formContainer.style.display = 'none';
    resumeContainer.style.display = 'block';
});

// Event listener for editing the resume
editResumeBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    resumeContainer.style.display = 'none';
});

// Download PDF functionality
downloadPDFBtn.addEventListener('click', () => {
    const resumeElement = document.getElementById('resumeContainer') as HTMLElement;
    const opt = {
        margin: 0.5,  // Smaller margin to fit everything
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },  // Set scale to 3 for better resolution
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
shareResumeBtn.addEventListener('click', () => {
    const resumeData = {
        name: (document.getElementById('displayName') as HTMLElement).textContent!,
        position: (document.getElementById('displayPosition') as HTMLElement).textContent!,
        phone: (document.getElementById('displayPhone') as HTMLElement).textContent!,
        email: (document.getElementById('displayEmail') as HTMLAnchorElement).textContent!,
        address: (document.getElementById('displayAddress') as HTMLElement).textContent!
    };
    // You could integrate this with a sharing service like email or social media
    shareableLinkInput.value = `Resume Link: https://your-resume-link.com/${resumeData.name}`;
});
