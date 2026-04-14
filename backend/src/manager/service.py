from src.manager.repository import DeviceRepository
from src.manager.schemas import DeviceBaseSchema


class DeviceService:
    def __init__(self, repository: DeviceRepository):
        self.repository = repository

    async def create_device_service(self, device: DeviceBaseSchema):
        return await self.repository.create(device)

    async def get_devices_service(self):
        return await self.repository.get_devices()

    async def get_current_device_service(self, id):
        return await self.repository.get_current_device(id)

    async def delete_device_service(self, id):
        return await self.repository.delete_device(id)

    async def update_device_service(self, id, device: DeviceBaseSchema):
        return await self.repository.update_device(id, device)
