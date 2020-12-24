const form = document.getElementsByClassName('form')[0];
const jsonOutput = document.getElementsByClassName('results_output')[0];
const result = document.getElementsByClassName('results')[0];
const email = document.getElementById('email');
const options = document.getElementById('source');



const validateRadioBtn = () => {
const radios = document.getElementsByName('title');
for (let i = 0; i < radios.length; i++) {
    if (!radios[i].checked) {
      alert ('please')     
    }
}
}

const validateCheckbox = () => {
  const checkboxes = document.getElementsByName('flavour');
  for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        alert ('please select at least one')     
      }
  }
}

//VALIDATE FORM INPUTS
const validateInput = () => {
  const emailInput = email.value.trim();
  const selectOption = options.value;


//Validate Radio-Buttons
validateRadioBtn()

//Validate Checkboxes
validateCheckbox()

//Validate Select
  if (selectOption === "")
  setError(options, "Please select an option.");


//Vaidate Email
  if (emailInput === "") {
      setError(email, 'Email cannot be empty');
  } else if(!validEmail(emailInput)) {
      setError(email, 'Email is not valid');
  } else {
      return email;
  }
}


//Email Validator
const validEmail = (email) => {
  var auth = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return auth.test(email);
}


//Set Error Prompts
const setError = (input, message) => {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  small.innerText = message;
  formGroup.className = 'form_group error';
} 




//FUNCTIONS TO RETRIEVE FORM DATA

//Function to check for non empty fields and return its value
const isValidElement = element => {
  return element.name && element.value;
};


//Function that checks for input that require a checked state
const isValidValue = element => {
  return !['checkbox', 'radio'].includes(element.type) || element.checked;
};


//Function that checks for element that accepts multiple values
const isCheckbox = element => element.type === 'checkbox';


//Function that checks for the selected options 
const isMultiSelect = element => element.options && element.multiple;


//Function that retrieves selected options from multiselect as an array
const getSelectValues = options => [].reduce.call(options, (values, option) => {
  return option.selected ? values.concat(option.value) : values;
}, []);



//Function that validates all checks before outputting result as an object literal
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

  // Make sure the element has the required properties and should be added.
  if (isValidElement(element) && isValidValue(element)) {
    if (isCheckbox(element)) {
      data[element.name] = (data[element.name] || []).concat(element.value);
    } else if (isMultiSelect(element)) {
      data[element.name] = getSelectValues(element);
    } else {
      data[element.name] = element.value;
    }
  }
  return data;
}, {});




//FORM SUBMISSION

result.style.display = "none"

const handleFormSubmit = event => {
  event.preventDefault();

  //Store the form data in a variable
  const data = formToJSON(form.elements);

  if(!validateInput()){
    validateInput();
   } else {
      //Hide form and Convert form data to JSON and 
    form.style.display = "none"
    result.style.display = "block"
    jsonOutput.textContent = JSON.stringify(data, null, "  ");
  }   
};


//EVENT LISTENER
form.addEventListener('submit', handleFormSubmit);
