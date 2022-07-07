// Modal 

// Makes modals
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

    const modalOptions = document.getElementById('modal-options');
    
    // Delete previously created buttons
    while (modalOptions.children.length > 1)
    {
        modalOptions.removeChild(modalOptions.lastChild);
    }

    // Make buttons
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
    document.getElementById('modal').style.display = 'block';   // 'none' to hide modal
}

// Predefined modals
const modals = {
    surgeryEnd: {
        header: 'Surgery Ended',
        desc: 'congrats',
        buttons: [
            {
                class: 'normal',
                text: 'Home',
                code() { document.location='./index.html'; }
            },
    
            {
                class: 'good',
                text: 'Perform another surgery',
                code() { start(); document.getElementById('modal').style.display = 'none'; }
            }
        ]
    },

    surgeryStart: {
        header: 'Are you sure?',
        desc: 'You are about to start a surgery.',
        buttons: [
            {
                class: 'danger',
                text: 'No, go back home',
                code() { document.location='./index.html'; }
            },

            {
                class: 'good',
                text: 'Yes, I am ready',
                code() { start(); document.getElementById('modal').style.display = 'none'; }
            }
        ]
    }
}
