# Spec: SDG Modular Roadmap JSON Schema

This schema defines the AI-generated roadmap that bridges the Teacher Dashboard and the Student Lab.

## JSON Schema Structure

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "courseTitle": { "type": "string" },
    "primarySDG": {
      "type": "object",
      "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "description": { "type": "string" }
      },
      "required": ["id", "name"]
    },
    "modules": {
      "type": "array",
      "minItems": 3,
      "maxItems": 3,
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "title": { "type": "string" },
          "description": { "type": "string" },
          "task": { "type": "string" },
          "codeTemplate": { "type": "string" },
          "testCriteria": { "type": "string" },
          "visualOutput": { "type": "string" }
        },
        "required": ["id", "title", "task", "testCriteria"]
      }
    }
  },
  "required": ["courseTitle", "primarySDG", "modules"]
}
```

## Example Payload (AI Generated)

```json
{
  "courseTitle": "Intro to Python for Climate",
  "primarySDG": {
    "id": 13,
    "name": "Climate Action",
    "description": "Combat climate change impacts."
  },
  "modules": [
    {
      "id": "MOD_1",
      "title": "The Input: Temp Sensor",
      "task": "Define `read_sensor()` to return a value between 20 and 40.",
      "codeTemplate": "def read_sensor():\n    # your code\n    return 0",
      "testCriteria": "contains('def read_sensor()')",
      "visualOutput": "Update Termometer UI"
    },
    {
      "id": "MOD_2",
      "title": "The Logic: Offset",
      "task": "Calculate offset: temp * 0.15.",
      "testCriteria": "math_check(temp, result)",
      "visualOutput": "Update CO2 Bar"
    },
    {
      "id": "MOD_3",
      "title": "The Output: Visualization",
      "task": "Print 'Impact Saved'.",
      "testCriteria": "contains('print')",
      "visualOutput": "Trigger Final Animation"
    }
  ]
}
```

---

> [!IMPORTANT]
> **Approval Required**: Please confirm if this JSON structure meets your requirements for the Teacher-Student sync.
