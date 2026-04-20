const ELEVEN_LABS_API_KEY = "sk_8ee5feede9bb6c0fe9994be285986bd2d8eeae1b3dfaed4f";

export async function generateSpeech(text: string, voiceId: string) {
    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVEN_LABS_API_KEY,
                'accept': 'audio/mpeg',
            },
            body: JSON.stringify({
                text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('ElevenLabs API Error Details:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(`ElevenLabs API request failed with status ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Error generating speech:', error);
        return null;
    }
}
