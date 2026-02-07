from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import routers
from routers import disease, yield_prediction, soil, price, video

app = FastAPI(title="AgriPredict360 AI Service")

# CORS configuration
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(disease.router, prefix="/api/disease", tags=["Disease Detection"])
app.include_router(yield_prediction.router, prefix="/api/yield", tags=["Yield Prediction"])
app.include_router(soil.router, prefix="/api/soil", tags=["Soil Analysis"])
app.include_router(price.router, prefix="/api/price", tags=["Price Prediction"])
app.include_router(video.router, prefix="/api/video", tags=["Video Generation"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriPredict360 AI Service"}

if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
