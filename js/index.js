const generateButton = document.querySelector("#generate-button");

generateButton.addEventListener('click', e => {
    //e.preventDefault(); apenas quando o type for submit 
    const passwordLength = document.querySelector('#password-length').value;
    const lowercaseCheckbox = document.getElementById('lowercase').checked;
    const uppercaseCheckbox = document.getElementById('uppercase').checked;
    const numbersCheckbox = document.getElementById('numbers').checked;
    const symbolsCheckbox = document.getElementById('symbols').checked;

    const passwordGenerator = new PasswordGenerator(passwordLength,
        lowercaseCheckbox,uppercaseCheckbox, numbersCheckbox, symbolsCheckbox);
    const password = passwordGenerator.generate();
    
    document.querySelector('#resultado').innerHTML= password;
    document.querySelector('#copy-button').style.display = 'block';
    //console.log(document.querySelector('#resultado').innerText.length<12)
});

class PasswordGenerator {
    constructor(length, lowercase, uppercase, numbers, symbols) {
        this.length = length;
        this.lowercase = lowercase;
        this.uppercase = uppercase;
        this.numbers = numbers;
        this.symbols = symbols;
    }

    generate() {
        if (!PasswordGenerator.validateLength(this.length)) { 
            return '<p class="red bg-erro">O tamanho da senha deve ser um número de 3 à 20.</p>'
        };

        const allCharacters = this.selectedCharacters();
        let password = '';

        // Gera a senha, um caractere de cada vez
        for (let i = 0; i < this.length; i++) {
            let characterIndex = Math.floor(Math.random() * allCharacters.length)
            // Escolhe um caractere aleatório da string de todos os caracteres
            const character = allCharacters.charAt(characterIndex);  
            // Adiciona o caractere à senha
            password += character;
       }
        
        return password;
    }

    static validateLength(length) {
        if (isNaN(length)) return false;
        if (length < 3 || length > 20) return false;

        return true;
    }

    selectedCharacters() {
        const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!"#$%&\'()*+,-./:;=?@[\\]^_`{|}~'; // se adicionar <> deve trocar o innerHTML
        let allCharacters = '';

        if (this.lowercase) {
            allCharacters += lowercaseCharacters;
        }
        if (this.uppercase) {
            allCharacters += uppercaseCharacters;
        }
        if (this.numbers) {
            allCharacters += numbers;
        }
        if (this.symbols) {
            allCharacters += symbols;
        }

        return allCharacters;
      
    }

}

const copyButton = document.querySelector('#copy-button');

copyButton.addEventListener('click', () => {
    const resultadoDiv = document.querySelector('#resultado');

    if(document.querySelector('#resultado').innerText === 'Senha copiada') return;

    // Seleciona o conteúdo da div resultado
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(resultadoDiv);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copia o conteúdo selecionado para a área de transferência
    if (document.querySelector('#resultado').innerText === 'Você deve gerar a senha primeiro' || 
    document.querySelector('#resultado').innerText === '' ||
    document.querySelector('#resultado').innerText === 'O tamanho da senha deve ser um número de 3 à 20.' ) {

    document.querySelector('#resultado').innerHTML = '<p class="red bg-erro" >Você deve gerar a senha primeiro</p>';
    return;
    }

    document.execCommand('copy');

    // Exibe mensagem para o usuário
    document.querySelector('#resultado').innerHTML= '<p class ="copy-code">Senha copiada</p>';
});



  