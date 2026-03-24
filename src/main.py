from fastapi import FastAPI

from src.config import app_config
from src.manager.router import router as urls_router

app = FastAPI(
    title=app_config.APP_NAME,
    description=f"{app_config.APP_NAME} API",
    version="1.0.0",
)

app.include_router(router=urls_router, tags=["Manager"])
