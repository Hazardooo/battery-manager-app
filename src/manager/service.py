from src.manager.repository import DeviceRepository
from src.manager.schemas import Device as DeviceSchema


class DeviceService:
    def __init__(self, repository: DeviceRepository):
        self.repository = repository

    async def create_device_service(self, device: DeviceSchema):
        return await self.repository.create(device)

    async def get_devices_service(self):
        return await self.repository.get_devices()
