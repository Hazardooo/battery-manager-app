from uuid import UUID

from fastapi import APIRouter, Depends
from src.manager.dependencies import GetManagerService
from src.manager.schemas import DeviceBaseSchema, DeviceDataBaseSchema
from src.manager.service import DeviceService

router = APIRouter()


@router.post("/create", response_model=DeviceDataBaseSchema)
async def create_device(
    device: DeviceBaseSchema,
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.create_device_service(device)


@router.get("/devices", response_model=list[DeviceDataBaseSchema])
async def get_devices(
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.get_all_service()


@router.get("/devices/{id}", response_model=DeviceBaseSchema)
async def get_current_device(
    id: UUID,
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.get_by_id_service(id)


@router.delete("/devices/{id}", status_code=204)
async def delete_device(
    id: UUID,
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.delete_device_service(id)


@router.post("/devices/{id}", response_model=DeviceDataBaseSchema)
async def update_device(
    id: UUID,
    device: DeviceBaseSchema,
    service: DeviceService = Depends(GetManagerService()),
):
    return await service.update_device_service(id, device)
