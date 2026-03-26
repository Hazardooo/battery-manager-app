from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.manager.models import Device as DeviceModel
from src.manager.schemas import DeviceBaseSchema


class DeviceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, device: DeviceBaseSchema) -> DeviceModel:
        new_device = DeviceModel(**device.model_dump())
        self.session.add(new_device)
        await self.session.commit()
        await self.session.refresh(new_device)
        return new_device

    async def get_devices(self) -> Sequence[DeviceModel]:
        devices = await self.session.execute(select(DeviceModel))
        return devices.scalars().all()

    async def get_current_device(self, id: str) -> DeviceModel | None:
        device = await self.session.execute(
            select(DeviceModel).where(DeviceModel.id == id)
        )
        return device.scalar_one_or_none()
