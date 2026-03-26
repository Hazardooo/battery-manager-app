from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.manager.models import Device as DeviceModel
from src.manager.schemas import Device as DeviceSchema


class DeviceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, device: DeviceSchema) -> DeviceModel:
        new_device = DeviceModel(**device.model_dump())
        self.session.add(new_device)
        await self.session.commit()
        await self.session.refresh(new_device)
        return new_device

    async def get_devices(self) -> Sequence[DeviceModel]:
        devices = await self.session.execute(select(DeviceModel))
        return devices.scalars().all()
