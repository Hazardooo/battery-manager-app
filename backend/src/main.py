from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config import app_config
from src.error_handlers import register_exception_handlers
from src.manager.router import router as urls_router

app = FastAPI(
    title=app_config.APP_NAME,
    description=f"{app_config.APP_NAME} API",
    version="1.0.0",
    root_path="/api",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
                      "http://localhost:3000",
                      "http://127.0.0.1:3000",
                      "http://localhost:8000",
                      "http://127.0.0.1:8000",
                      "http://localhost",
                      "http://127.0.0.1",
                  ] + app_config.CORS_URL,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)
app.include_router(router=urls_router, tags=["Manager"])
