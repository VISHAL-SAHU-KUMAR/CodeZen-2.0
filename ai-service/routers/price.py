from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random
from datetime import datetime, timedelta

router = APIRouter()

class PriceInput(BaseModel):
    crop: str
    location: str

@router.post("/predict")
async def predict_price(data: PriceInput):
    try:
        # Mock historical data logic
        base_price = 100
        if data.crop.lower() == "wheat":
            base_price = 2000
        elif data.crop.lower() == "rice":
            base_price = 2500
            
        forecast = []
        today = datetime.now()
        
        for i in range(7):
            date = (today + timedelta(days=i)).strftime("%Y-%m-%d")
            price = base_price * random.uniform(0.95, 1.05)
            forecast.append({"date": date, "price": round(price, 2)})
            
        return {
            "crop": data.crop,
            "location": data.location,
            "current_price": forecast[0]["price"],
            "forecast": forecast,
            "trend": "up" if forecast[-1]["price"] > forecast[0]["price"] else "down"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_root():
    return {"status": "ok", "module": "price_prediction"}
