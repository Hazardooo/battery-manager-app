from fastapi import Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from src.manager.exceptions import DeviceNotFound


class HTTPExceptionResponse(JSONResponse):
    def __init__(self, status_code: int, error_code: str, message: str):
        super().__init__(
            status_code=status_code, content={"error": error_code, "message": message}
        )


async def device_not_found_handler(
    request: Request, exc: DeviceNotFound
) -> HTTPExceptionResponse:
    return HTTPExceptionResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        error_code="DEVICE_NOT_FOUND",
        message="Device not found",
    )


async def database_connect_error_handler(
    request: Request, exc: SQLAlchemyError
) -> HTTPExceptionResponse:
    return HTTPExceptionResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        error_code="DATABASE_CONNECT_ERROR",
        message="Failed to connect to the database",
    )


def register_exception_handlers(app):
    app.add_exception_handler(DeviceNotFound, device_not_found_handler)
    app.add_exception_handler(SQLAlchemyError, database_connect_error_handler)
