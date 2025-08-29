# BFHL API

A REST API that processes arrays and returns categorized data including numbers, alphabets, special characters, and various calculations.

## Features

- **POST** endpoint at `/bfhl`
- Processes arrays and categorizes elements
- Returns even/odd numbers, alphabets, special characters
- Calculates sum of numbers
- Generates concatenated string with alternating caps in reverse order
- Follows BFHL assignment specifications

## API Endpoint

- **URL**: `/bfhl`
- **Method**: POST
- **Content-Type**: application/json

## Request Format

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

## Response Format

```json
{
  "is_success": true,
  "user_id": "sarth_saxena_17122024",
  "email": "sarth.saxena@example.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Response Fields

1. **is_success**: Boolean indicating operation status
2. **user_id**: Generated in format `{full_name_ddmmyyyy}`
3. **email**: User's email address
4. **roll_number**: College roll number
5. **odd_numbers**: Array of odd numbers (as strings)
6. **even_numbers**: Array of even numbers (as strings)
7. **alphabets**: Array of alphabets (converted to uppercase)
8. **special_characters**: Array of special characters
9. **sum**: Sum of all numbers (returned as string)
10. **concat_string**: Concatenated alphabets in reverse order with alternating caps

## Examples

### Example 1
**Request:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "sarth_saxena_17122024",
  "email": "sarth.saxena@example.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example 2
**Request:**
```json
{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "sarth_saxena_17122024",
  "email": "sarth.saxena@example.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd bfhl-api
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the server:**
   ```bash
   # Development mode with auto-reload
   pnpm run dev
   
   # Production mode
   pnpm start
   ```

4. **Server will start on port 3000 (or PORT environment variable)**

## Environment Variables

- `PORT`: Server port (default: 3000)

## Testing the API

### Using cURL
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

### Using Postman
1. Set method to POST
2. Set URL to `http://localhost:3000/bfhl`
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
   ```json
   {
     "data": ["a", "1", "334", "4", "R", "$"]
   }
   ```

## Deployment

This API can be deployed to various platforms:

- **Vercel**: Supports Node.js APIs
- **Railway**: Easy deployment with automatic scaling
- **Render**: Free tier available for APIs
- **Heroku**: Classic platform for Node.js apps

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Proper HTTP status codes
- Error messages for debugging
- Try-catch blocks for graceful error handling

## Notes

- Numbers are returned as strings in the response
- Alphabets are converted to uppercase
- Special characters are identified using regex patterns
- The `user_id` is generated dynamically based on current date
- All responses include `is_success` field for status tracking

## License

ISC License
