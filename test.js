const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334", "4"],
            alphabets: ["A", "R"],
            special_characters: ["$"],
            sum: "339"
        }
    },
    {
        name: "Example B",
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2", "4", "92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A", "ABCD", "DOE"],
            special_characters: [],
            sum: "0"
        }
    }
];

async function testAPI() {
    console.log('🚀 Testing BFHL API...\n');
    
    for (const testCase of testCases) {
        try {
            console.log(`📝 Testing: ${testCase.name}`);
            console.log(`Input: ${JSON.stringify(testCase.data)}`);
            
            const response = await axios.post(`${BASE_URL}/bfhl`, {
                data: testCase.data
            });
            
            console.log(`✅ Status: ${response.status}`);
            console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
            
            // Validate key fields
            const { data } = response;
            if (data.is_success && 
                data.user_id && 
                data.email && 
                data.roll_number) {
                console.log('✅ All required fields present');
            }
            
            console.log('---\n');
            
        } catch (error) {
            console.error(`❌ Error testing ${testCase.name}:`, error.message);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
            console.log('---\n');
        }
    }
}

// Testing the endpoint
async function testHealth() {
    try {
        console.log('🏥 Testing health endpoint...');
        const response = await axios.get(BASE_URL);
        console.log(`Health check: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error) {
        console.error('❌ Health check failed:', error.message);
    }
}

// Running tests
async function runTests() {
    try {
        await testHealth();
        await testAPI();
        console.log('🎉 All tests completed!');
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { testAPI, testHealth };
