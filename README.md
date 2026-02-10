# BFHL REST API

Production-ready REST API built with Node.js and Express.js featuring mathematical operations and AI integration.

## 🚀 Features

- **GET /health** - Health check endpoint
- **POST /bfhl** - Main processing endpoint supporting:
  - Fibonacci series generation
  - Prime number filtering
  - LCM (Least Common Multiple) calculation
  - HCF (Highest Common Factor) calculation
  - AI-powered single-word answers via Google Gemini

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## 🛠️ Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   OFFICIAL_EMAIL=your_email@chitkara.edu.in
   PORT=3000
   ```

## 🏃 Running Locally

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### GET /health

Health check endpoint that always returns success.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

### POST /bfhl

Main processing endpoint. Accepts exactly ONE key in the request body.

#### Valid Operations

**1. Fibonacci Series**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 10}'
```

Response:
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

**2. Prime Numbers**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}'
```

Response:
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2, 3, 5, 7]
}
```

**3. LCM (Least Common Multiple)**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'
```

Response:
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 72
}
```

**4. HCF (Highest Common Factor)**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [12, 18, 24]}'
```

Response:
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 6
}
```

**5. AI Query**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of France?"}'
```

Response:
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Paris"
}
```

## ⚠️ Validation Rules

- Request body must contain **exactly one key**
- Valid keys: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`
- `fibonacci`: Must be a non-negative integer
- `prime`, `lcm`, `hcf`: Must be arrays with at least 2 integers
- `AI`: Must be a non-empty string

## 🚨 Error Responses

**Validation Error (400)**
```json
{
  "is_success": false,
  "error": "Error message describing the issue"
}
```

**Server Error (500)**
```json
{
  "is_success": false,
  "error": "Internal server error"
}
```

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `OFFICIAL_EMAIL`

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `GEMINI_API_KEY`
   - `OFFICIAL_EMAIL`
4. Deploy!

## 📁 Project Structure

```
bfhl-api/
├── server.js              # Main Express server
├── utils/
│   ├── mathUtils.js       # Mathematical operations
│   └── aiService.js       # Google Gemini integration
├── package.json           # Dependencies
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── vercel.json           # Vercel config
└── README.md             # This file
```

## 🔒 Security Features

- No `eval()` or unsafe code execution
- Input validation on all endpoints
- Error handling to prevent crashes
- Environment variable protection
- CORS enabled for public access

## 📝 License

ISC

## 👨‍💻 Author

Built as a production-ready backend API solution.
