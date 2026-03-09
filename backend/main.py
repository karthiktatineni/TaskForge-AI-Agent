from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from config import HOST, PORT, CORS_ORIGINS
from routers import projects
from services.metrics import get_stats

app = FastAPI(
    title="AI Project Architect API",
    description="API for the AI Project Architect SaaS tool",
    version="0.2.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root check / Analytics Dashboard
@app.get("/", response_class=HTMLResponse)
async def root():
    stats = get_stats()
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Project Architect - Backend Status</title>
        <style>
            :root {{
                --bg: #0d1117;
                --card-bg: #161b22;
                --card-hover: #1c2128;
                --border: #30363d;
                --text-main: #c9d1d9;
                --text-bright: #ffffff;
                --accent: #58a6ff;
                --success: #3fb950;
                --error: #f85149;
            }}
            body {{
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--bg);
                color: var(--text-main);
                margin: 0;
                padding: 40px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
            }}
            .container {{
                max-width: 900px;
                width: 100%;
                background-color: var(--card-bg);
                border: 1px solid var(--border);
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }}
            .header {{
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 40px;
                border-bottom: 1px solid var(--border);
                padding-bottom: 25px;
            }}
            .pulse-dot {{
                width: 14px;
                height: 14px;
                background-color: var(--success);
                border-radius: 50%;
                box-shadow: 0 0 15px var(--success);
                animation: pulse 2s infinite;
            }}
            @keyframes pulse {{
                0% {{ box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.7); }}
                70% {{ box-shadow: 0 0 0 15px rgba(63, 185, 80, 0); }}
                100% {{ box-shadow: 0 0 0 0 rgba(63, 185, 80, 0); }}
            }}
            h1 {{ margin: 0; color: var(--text-bright); font-size: 28px; letter-spacing: -0.5px; }}
            .grid {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 24px;
                margin-bottom: 40px;
            }}
            .card {{
                background-color: #21262d;
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 24px;
                transition: transform 0.2s, background-color 0.2s;
            }}
            .card:hover {{
                transform: translateY(-2px);
                background-color: var(--card-hover);
                border-color: #444c56;
            }}
            .card-title {{
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #8b949e;
                margin-bottom: 12px;
                font-weight: 600;
            }}
            .card-value {{
                font-size: 36px;
                font-weight: 800;
                color: var(--accent);
                font-variant-numeric: tabular-nums;
            }}
            .card-value.success {{ color: var(--success); }}
            .card-value.error {{ color: var(--error); }}
            .footer {{
                font-size: 14px;
                color: #8b949e;
                text-align: center;
                margin-top: 40px;
                padding-top: 25px;
                border-top: 1px solid var(--border);
            }}
            .badge {{
                display: inline-block;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: bold;
                background: #23863626;
                color: #3fb950;
                border: 1px solid #23863666;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="pulse-dot"></div>
                <h1>AI System Core <span style="color: #8b949e; font-weight: 400;">/</span> Status Dashboard</h1>
                <div style="margin-left: auto;">
                    <span class="badge">v{app.version}</span>
                </div>
            </div>
            
            <div class="grid">
                <div class="card">
                    <div class="card-title">Compute Footprint / API</div>
                    <div class="card-value">{stats['total_requests']} <span style="font-size: 14px; color: #8b949e; font-weight: normal;">hits</span></div>
                </div>
                <div class="card">
                    <div class="card-title">Inference Success</div>
                    <div class="card-value success">{stats['successful_generations']}</div>
                </div>
                <div class="card">
                    <div class="card-title">Token Output (Est)</div>
                    <div class="card-value" style="color: #a371f7;">{stats['total_tokens_estimated']:,}</div>
                </div>
                <div class="card">
                    <div class="card-title">Avg Latency</div>
                    <div class="card-value">{stats['average_generation_time_sec']:.1f}s</div>
                </div>
            </div>
            
            <div style="background: #1c2128; border: 1px dashed var(--border); border-radius: 8px; padding: 20px; text-align: center; font-family: monospace; font-size: 13px;">
                SYSTEM UPTIME START: <span style="color: var(--accent);">{stats['start_time']}</span>
            </div>

            <div class="footer">
                AI Project Architect Core Engine &bull; FastAPI 0.109+ &bull; Mode: Single User Lab
            </div>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# Status JSON for tools
@app.get("/status")
async def status():
    return {{"status": "ok", "version": app.version, "metrics": get_stats()}}

# Includes routers
app.include_router(projects.router, prefix="/api/v1", tags=["projects"])

if __name__ == "__main__":
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
