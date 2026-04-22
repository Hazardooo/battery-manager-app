from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.manager import exceptions
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

    async def get_all(self) -> Sequence[DeviceModel]:
        devices = await self.session.execute(select(DeviceModel))
        return devices.scalars().all()

    async def get_by_id(self, id: str) -> DeviceModel:
        device = await self.session.execute(
            select(DeviceModel).where(DeviceModel.id == id)
        )
        device = device.scalar_one_or_none()
        if not device:
            raise exceptions.DeviceNotFound()
        return device

    async def delete(self, id: str) -> None:
        device = await self.get_by_id(id)
        await self.session.delete(device)
        await self.session.commit()

    async def update(self, id: str, device: DeviceBaseSchema) -> DeviceModel:
        db_device = await self.get_by_id(id)
        for key, value in device.model_dump().items():
            setattr(db_device, key, value)
        await self.session.commit()
        await self.session.refresh(db_device)
        return db_device
