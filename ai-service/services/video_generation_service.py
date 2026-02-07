"""
Video Generation Service for AgriPredict360
Generates AI-powered educational videos for farmers in multiple languages
"""

import os
import asyncio
import aiohttp
from openai import OpenAI
from typing import Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class VideoGenerationService:
    """AI Video Generation Service using OpenAI, ElevenLabs, and D-ID"""
    
    def __init__(self):
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.did_api_key = os.getenv("DID_API_KEY")
        self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        
        self.language_map = {
            'hi': 'Hindi',
            'en': 'English', 
            'pa': 'Punjabi',
            'mr': 'Marathi'
        }
        
        self.voice_map = {
            'hi': 'pNInz6obpgDQGcFmaJgB',
            'en': '21m00Tcm4TlvDq8ikWAM',
            'pa': 'pNInz6obpgDQGcFmaJgB',
            'mr': 'pNInz6obpgDQGcFmaJgB'
        }
        
        self.avatar_map = {
            'hi': 'https://create-images-results.d-id.com/face1.png',
            'en': 'https://create-images-results.d-id.com/face2.png',
            'pa': 'https://create-images-results.d-id.com/face3.png',
            'mr': 'https://create-images-results.d-id.com/face4.png'
        }
    
    async def generate_disease_video(self, disease_data: Dict, language: str = 'hi') -> Dict:
        """Generate complete AI video for disease treatment"""
        try:
            logger.info(f"Starting video generation for: {disease_data.get('name')}")
            
            script = await self.generate_script(disease_data, language)
            audio_url = await self.generate_voice(script, language)
            video_url = await self.create_avatar_video(audio_url, language)
            final_video_url = await self.add_overlays(video_url, disease_data)
            
            return {
                'success': True,
                'video_url': final_video_url,
                'script': script,
                'duration': await self.estimate_duration(script),
                'language': language
            }
        except Exception as e:
            logger.error(f"Video generation failed: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    async def generate_script(self, disease_data: Dict, language: str) -> str:
        """Generate video script using GPT-4"""
        prompt = f"""
        Create a 90-second educational video script in {self.language_map.get(language, 'Hindi')} for farmers about:
        
        Disease: {disease_data.get('name', 'Unknown')}
        Scientific Name: {disease_data.get('scientific_name', 'N/A')}
        Crops: {', '.join(disease_data.get('crops', ['crops']))}
        
        Structure: Greeting (5s), Introduction (15s), Symptoms (25s), Treatment (30s), Prevention (10s), Closing (5s)
        
        Requirements: Simple language, medicine names with dosages, costs in INR, timing, warm tone.
        """
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an agricultural expert explaining to farmers."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1200
        )
        return response.choices[0].message.content
    
    async def generate_voice(self, script: str, language: str) -> str:
        """Convert script to speech using ElevenLabs"""
        voice_id = self.voice_map.get(language, self.voice_map['hi'])
        
        async with aiohttp.ClientSession() as session:
            headers = {
                "Accept": "audio/mpeg",
                "Content-Type": "application/json",
                "xi-api-key": self.elevenlabs_api_key
            }
            payload = {
                "text": script,
                "model_id": "eleven_multilingual_v2",
                "voice_settings": {"stability": 0.75, "similarity_boost": 0.85}
            }
            
            async with session.post(
                f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
                headers=headers, json=payload
            ) as response:
                if response.status == 200:
                    audio_data = await response.read()
                    return await self.upload_to_storage(audio_data, f"audio_{language}.mp3")
                raise Exception(f"ElevenLabs error: {response.status}")
    
    async def create_avatar_video(self, audio_url: str, language: str) -> str:
        """Create AI avatar video using D-ID"""
        async with aiohttp.ClientSession() as session:
            headers = {"Authorization": f"Bearer {self.did_api_key}", "Content-Type": "application/json"}
            payload = {
                "script": {"type": "audio", "audio_url": audio_url},
                "source_url": self.avatar_map.get(language),
                "config": {"result_format": "mp4", "fluent": True}
            }
            
            async with session.post("https://api.d-id.com/talks", headers=headers, json=payload) as response:
                if response.status == 201:
                    result = await response.json()
                    return await self.poll_video_status(session, headers, result.get('id'))
                raise Exception(f"D-ID error: {response.status}")
    
    async def poll_video_status(self, session, headers, talk_id: str) -> str:
        """Poll until video is ready"""
        for _ in range(60):
            async with session.get(f"https://api.d-id.com/talks/{talk_id}", headers=headers) as response:
                result = await response.json()
                if result.get('status') == 'done':
                    return result.get('result_url')
                elif result.get('status') == 'error':
                    raise Exception("D-ID generation failed")
                await asyncio.sleep(5)
        raise Exception("Video generation timeout")
    
    async def add_overlays(self, video_url: str, disease_data: Dict) -> str:
        """Add overlays (placeholder for FFmpeg processing)"""
        return video_url
    
    async def upload_to_storage(self, data: bytes, filename: str) -> str:
        """Upload to cloud storage"""
        upload_dir = os.path.join(os.path.dirname(__file__), '..', 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        filepath = os.path.join(upload_dir, filename)
        with open(filepath, 'wb') as f:
            f.write(data)
        return f"/uploads/{filename}"
    
    async def estimate_duration(self, script: str) -> int:
        """Estimate duration based on word count"""
        return int((len(script.split()) / 150) * 60)


def get_video_service() -> VideoGenerationService:
    return VideoGenerationService()
