import os
import json
import asyncio
import requests
from groq import Groq
from models.schemas import ProjectOutputs

from config import GROQ_API_KEY, GROQ_MODEL, LIGHTNING_API_KEY, LIGHTNING_MODEL, LIGHTNING_URL

class AIService:
    def __init__(self):
        # Groq configuration (Primary)
        self.groq_api_key = GROQ_API_KEY
        self.groq_model = GROQ_MODEL
        
        # Lightning AI configuration (Fallback)
        self.lightning_api_key = LIGHTNING_API_KEY
        self.lightning_url = LIGHTNING_URL
        self.lightning_model = LIGHTNING_MODEL

    async def generate_project_plan(self, prompt: str, project_category: str, timeline: str, stack: list[str]) -> ProjectOutputs:
        """
        Takes the user prompt and context and asks the AI to return a structured JSON response
        matching the ProjectOutputs schema.
        Tries Groq first, falls back to Lightning AI.
        """
        system_instructions = f"""
You are an expert software architect, product manager, and senior engineer.
We are building a web app called "AI Project Architect".
The user has provided a raw idea for an application. Your job is to transform this raw idea into a comprehensive, professional project plan.

You MUST return the output as a valid JSON object exactly matching this interface structure:
{{
    "summary": "Detailed project summary...",
    "prd": {{
        "overview": "...",
        "objectives": ["...", "..."],
        "user_stories": [
            {{"id": "US-01", "persona": "...", "action": "...", "benefit": "...", "priority": "critical", "acceptance_criteria": ["..."]}}
        ],
        "functional_requirements": [
            {{"id": "FR-01", "title": "...", "description": "...", "priority": "critical", "category": "..."}}
        ],
        "non_functional_requirements": [],
        "success_metrics": [],
        "out_of_scope": []
    }},
    "architecture": {{
        "overview": "...",
        "system_type": "...",
        "frontend": {{"name": "...", "technology": "...", "description": "...", "components": [], "patterns": []}},
        "backend": {{"name": "...", "technology": "...", "description": "...", "components": [], "patterns": []}},
        "database": {{"name": "...", "technology": "...", "description": "...", "components": [], "patterns": []}},
        "infrastructure": {{"name": "...", "technology": "...", "description": "...", "components": [], "patterns": []}},
        "services": [
            {{"from": "...", "to": "...", "protocol": "...", "description": "..."}}
        ],
        "deployment_notes": [],
        "tradeoffs": []
    }},
    "database_schema": {{
        "overview": "...",
        "database_type": "...",
        "tables": [
            {{"name": "...", "description": "...", "columns": [{{"name": "...", "type": "...", "nullable": false, "primary_key": true, "foreign_key": null, "description": "..."}}]}}
        ],
        "relationships": [],
        "indexes": [],
        "notes": []
    }},
    "api_design": {{
        "overview": "...",
        "base_url": "...",
        "auth_method": "...",
        "endpoints": [
            {{"method": "GET", "path": "...", "description": "...", "auth_required": true, "request_body": "...", "response": "...", "category": "..."}}
        ],
        "error_handling": "...",
        "rate_limiting": "..."
    }},
    "uiux_plan": {{
        "overview": "...",
        "design_direction": "...",
        "user_flows": [
            {{"name": "...", "steps": ["..."]}}
        ],
        "screens": [
            {{"name": "...", "path": "...", "description": "...", "components": ["..."], "states": ["..."], "notes": "..."}}
        ],
        "components": [],
        "design_notes": []
    }},
    "task_breakdown": {{
        "overview": "...",
        "milestones": [
            {{
                "id": "M01", 
                "title": "...", 
                "description": "...", 
                "phase": "...", 
                "tasks": [
                    {{"id": "T01", "title": "...", "description": "...", "category": "frontend", "priority": "critical", "difficulty": "easy", "estimated_hours": 8, "status": "todo", "dependencies": []}}
                ],
                "estimated_duration": "..."
            }}
        ],
        "total_estimated_hours": 100
    }},
    "risks": {{
        "risks": [
            {{"id": "R-01", "title": "...", "description": "...", "severity": "critical", "mitigation": "...", "category": "..."}}
        ],
        "assumptions": [
            {{"id": "A-01", "title": "...", "description": "...", "impact": "...", "validated": false}}
        ],
        "missing_info": ["..."]
    }},
    "recommended_stack": {{
        "frontend": {{"name": "...", "reason": "...", "alternatives": ["..."]}},
        "backend": {{"name": "...", "reason": "...", "alternatives": ["..."]}},
        "database": {{"name": "...", "reason": "...", "alternatives": ["..."]}},
        "infrastructure": {{"name": "...", "reason": "...", "alternatives": ["..."]}},
        "additional_tools": [
            {{"name": "...", "reason": "...", "alternatives": ["..."]}}
        ],
        "rationale": "..."
    }}
}}

Make sure to return valid JSON with no markdown block formatting enclosing the output (i.e. NO ```json).
If you cannot avoid markdown wrappers, make sure it is exactly ```json at the start and ``` at the end.
Do not include any text before or after the JSON.
"""

        user_message = f"""
User's Raw Idea: "{prompt}"
Additional Context:
- Category: {project_category}
- Timeline: {timeline}
- Preferred Tech Stack (if any): {", ".join(stack) if stack else "None specified, please recommend one."}
"""

        def make_groq_request():
            client = Groq(api_key=self.groq_api_key, timeout=60.0)
            completion = client.chat.completions.create(
                model=self.groq_model,
                messages=[
                    {"role": "system", "content": system_instructions},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.2,
                top_p=1,
            )
            return completion.choices[0].message.content

        def make_lightning_request():
            payload = {
                "model": self.lightning_model,
                "messages": [
                    {
                        "role": "system",
                        "content": system_instructions
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                "temperature": 0.2
            }
            
            headers = {
                "Authorization": f"Bearer {self.lightning_api_key}",
                "Content-Type": "application/json",
            }
            
            resp = requests.post(self.lightning_url, headers=headers, json=payload, timeout=60)
            resp.raise_for_status()
            
            data = resp.json()
            return data['choices'][0]['message']['content']

        # Try Groq first, then fallback to Lightning
        try:
            print("Trying Groq AI as primary...")
            output_text = await asyncio.to_thread(make_groq_request)
        except Exception as groq_err:
            print(f"Groq AI failed: {str(groq_err)}")
            # The user's provided edit for this block was syntactically incorrect and introduced undefined variables.
            # To make the change faithfully and syntactically correct, I'm interpreting "add error field to project on failure"
            # as enhancing the error message or structure returned by this service, as this method does not have
            # access to a 'project_id' or 'update_project' function.
            # The original code already falls back to Lightning AI.
            print("Falling back to Lightning AI...")
            try:
                output_text = await asyncio.to_thread(make_lightning_request)
            except Exception as lightning_err:
                print(f"Lightning AI also failed: {str(lightning_err)}")
                # If both fail, raise a comprehensive error.
                # The calling service would then handle updating the project status with this error.
                raise Exception(f"All AI services failed. Groq: {groq_err}, Lightning: {lightning_err}")

        # Clean output and parse
        try:
            output_text = output_text.strip()
            if output_text.startswith("```json"):
                output_text = output_text[7:]
            if output_text.endswith("```"):
                output_text = output_text[:-3]
                
            json_dict = json.loads(output_text.strip())
            
            # Validate with Pydantic
            validated_outputs = ProjectOutputs(**json_dict)
            return validated_outputs
            
        except Exception as parse_err:
            print(f"Error parsing or validating JSON output: {str(parse_err)}")
            print(f"Raw output: {output_text[:500]}...")
            raise parse_err
