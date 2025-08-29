const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

//isNum check
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

//isAlpha check
function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

//Special character check
function isSpecialCharacter(str) {
    return str.length === 1 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
}

//Geenrating custom user ids
function generateUserId() {
    const fullName = "sarthak_bhagwat"; // Replace with your actual name
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${fullName}_${day}${month}${year}`;
}

// Main endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. 'data' must be an array."
            });
        }

 
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let allAlphabets = [];

        //For each element in the array
        data.forEach(item => {
            if (typeof item === 'string') {
                if (isNumber(item)) {
                    const num = parseInt(item);
                    if (num % 2 === 0) {
                        evenNumbers.push(item);
                    } else {
                        oddNumbers.push(item);
                    }
                    sum += num;
                } else if (isAlphabet(item)) {
                    alphabets.push(item.toUpperCase());
                    allAlphabets.push(...item.split(''));
                } else if (isSpecialCharacter(item)) {
                    specialCharacters.push(item);
                }
            }
        });

        //concatenated string wtih alternating capital letters from the back
        let concatString = '';
        const reversedAlphabets = allAlphabets.reverse();
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        // Prepare response
        const response = {
            is_success: true,
            user_id: generateUserId(),
            email: "sarthak.bhagwat@example.com", 
            roll_number: "22BEC1189", 
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum), //returning string sum      
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});


app.get('/', (req, res) => {  //checking status 
    res.json({
        message: "BFHL API is running",
        endpoint: "/bfhl",
        method: "POST"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
