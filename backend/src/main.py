from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config import app_config
from src.manager.router import router as urls_router

app = FastAPI(
    title=app_config.APP_NAME,
    description=f"{app_config.APP_NAME} API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=urls_router, tags=["Manager"])
