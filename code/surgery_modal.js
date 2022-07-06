// Modal when starting / Surgery ended

// modalItems           Object
//  header              String
//  desc                String
//  buttons             Array of Objects
//  buttons[i].class    String
//  buttons[i].text     String
//  buttons[i].code     Function 
function modal(modalItems)
{
    // Set header and description
    document.getElementById('modal-header').innerText = modalItems.header;
    document.getElementById('modal-desc').innerText = modalItems.desc;

    // Make buttons
    const modalOptions = document.getElementById('modal-options');
    for (const item of modalItems.buttons)
    {
        // Make the button
        const button = document.createElement('button');
        button.innerHTML = item.text;
        button.setAttribute('type', 'button');
        button.className = item.class;

        // Insert to page
        modalOptions.insertBefore(button, modalOptions.lastElementChild.nextSibling);

        // Add function
        button.addEventListener('click', item.code);
    }

    // Make modal visible
    document.getElementById('modal').style.display = 'block';
}

// Predefined modals
const modals = {
    surgeryEnd: {
        header: 'Surgery Ended',
        desc: 'you suck',
        buttons: [
            {
                class: 'normal',
                text: 'Home',
                code() { document.location='./index.html'; }
            },
    
            {
                class: 'good',
                text: 'Perform another surgery',
                code() { location.reload(); }
            }
        ]
    }
}
