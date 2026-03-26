from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_postgres
from src.manager.repository import DeviceRepository
from src.manager.service import DeviceService


class GetManagerRepository:
    async def __call__(self, session: AsyncSession = Depends(get_postgres)):
        return DeviceRepository(session)


class GetManagerService:
    async def __call__(
        self, repository: DeviceRepository = Depends(GetManagerRepository())
    ):
        return DeviceService(repository)
