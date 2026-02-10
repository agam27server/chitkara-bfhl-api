require('dotenv').config();
const express = require('express');
const { generateFibonacci, filterPrimes, calculateHCF, calculateLCM } = require('./utils/mathUtils');
const { getAIAnswer } = require('./utils/aiService');

const app = express();
const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'agam1512.be23@chitkara.edu.in';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});



app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({
        is_success: false,
        error: 'Request body must be a valid JSON object'
      });
    }

    const keys = Object.keys(body);

    if (keys.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Request body must contain exactly one key'
      });
    }

    if (keys.length > 1) {
      return res.status(400).json({
        is_success: false
      });
    }

    const key = keys[0];
    const value = body[key];

    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

    if (!validKeys.includes(key)) {
      return res.status(400).json({
        is_success: false,
        error: `Invalid key. Valid keys are: ${validKeys.join(', ')}`
      });
    }

    let result;

    switch (key) {
      case 'fibonacci':
        if (!Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            error: 'fibonacci value must be a non-negative integer'
          });
        }
        result = generateFibonacci(value);
        break;

      case 'prime':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'prime value must be an array'
          });
        }
        if (value.length < 2) {
          return res.status(400).json({
            is_success: false,
            error: 'prime array must contain at least 2 integers'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'prime array must contain only integers'
          });
        }
        result = filterPrimes(value);
        break;

      case 'lcm':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'lcm value must be an array'
          });
        }
        if (value.length < 2) {
          return res.status(400).json({
            is_success: false,
            error: 'lcm array must contain at least 2 integers'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'lcm array must contain only integers'
          });
        }
        result = calculateLCM(value);
        break;

      case 'hcf':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'hcf value must be an array'
          });
        }
        if (value.length < 2) {
          return res.status(400).json({
            is_success: false,
            error: 'hcf array must contain at least 2 integers'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'hcf array must contain only integers'
          });
        }
        result = calculateHCF(value);
        break;

      case 'AI':
        if (typeof value !== 'string') {
          return res.status(400).json({
            is_success: false,
            error: 'AI value must be a string'
          });
        }
        if (value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'AI value must be a non-empty string'
          });
        }
        try {
          result = await getAIAnswer(value);
        } catch (aiError) {
          return res.status(500).json({
            is_success: false,
            error: 'AI service error: ' + aiError.message
          });
        }
        break;

      default:
        return res.status(400).json({
          is_success: false,
          error: 'Invalid operation'
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      is_success: false,
      error: 'Invalid JSON in request body'
    });
  }
  
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {});

module.exports = app;
