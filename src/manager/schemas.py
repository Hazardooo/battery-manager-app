from uuid import UUID

from pydantic import BaseModel


class Device(BaseModel):
    device_name: str
    battery_type: str
    battery_count: int

    class Config:
        from_attributes = True


class DeviceDataBase(Device):
    id: UUID
