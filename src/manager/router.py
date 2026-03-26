from fastapi import APIRouter, Depends

from src.manager.dependencies import GetManagerService
from src.manager.schemas import Device as DeviceSchema
from src.manager.service import DeviceService

router = APIRouter()


@router.post("/create")
async def create_device(
    device: DeviceSchema,
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.create_device_service(device)


@router.get("/devices")
async def get_devices(
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.get_devices_service()
