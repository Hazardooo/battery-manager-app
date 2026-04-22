from src.manager.repository import DeviceRepository
from src.manager.schemas import DeviceBaseSchema


class DeviceService:
    def __init__(self, repository: DeviceRepository):
        self.repository = repository

    async def create_device_service(self, device: DeviceBaseSchema):
        return await self.repository.create(device)

    async def get_all_service(self):
        return await self.repository.get_all()

    async def get_by_id_service(self, id):
        return await self.repository.get_by_id(id)

    async def delete_device_service(self, id):
        return await self.repository.delete(id)

    async def update_device_service(self, id, device: DeviceBaseSchema):
        return await self.repository.update(id, device)
