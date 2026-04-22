from fastapi import Request, status
from fastapi.responses import JSONResponse
from src.exceptions import DBConnectionError
from src.manager.exceptions import DeviceNotFound


class ErrorResponse(JSONResponse):
    def __init__(self, status_code: int, error_code: str, message: str):
        super().__init__(
            status_code=status_code,
            content={"error": error_code, "message": message},
        )


async def device_not_found_handler(
    request: Request, exc: DeviceNotFound
) -> ErrorResponse:
    return ErrorResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        error_code="DEVICE_NOT_FOUND",
        message="Device not found",
    )


async def database_error_handler(
    request: Request, exc: DBConnectionError
) -> ErrorResponse:
    return ErrorResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        error_code="DATABASE_CONNECT_ERROR",
        message="Database connection failed. Is PostgreSQL running?",
    )


def register_exception_handlers(app):
    app.add_exception_handler(DeviceNotFound, device_not_found_handler)
    app.add_exception_handler(DBConnectionError, database_error_handler)
