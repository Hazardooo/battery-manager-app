from pydantic import BaseModel


class Device(BaseModel):
    device_name: str
    battery_type: str
    battery_count: int
