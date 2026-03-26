from uuid import UUID

from pydantic import BaseModel


class DeviceBaseSchema(BaseModel):
    device_name: str
    battery_type: str
    battery_count: int

    class Config:
        from_attributes = True


class DeviceDataBaseSchema(DeviceBaseSchema):
    id: UUID
