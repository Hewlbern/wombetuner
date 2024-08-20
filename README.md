# Womb Tunes

Womb Tunes is a prototype project developed as part of the Cybernetic Imagination Residency at ANU’s School of Cybernetics. The goal is to create a digital product that converts ultrasound images into personalized soundtracks, offering both a unique artistic experience and potential commercial application.

## Project Overview

Womb Tunes leverages AI and machine learning models to transform ultrasound images into music. The process involves converting ultrasound images into spectrograms, which are then used as input for music generation models. The generated music reflects the unique data points of each ultrasound, creating a personalized auditory experience.

## Key Features

- **Ultrasound to Spectrogram Conversion**: Converts uploaded ultrasound images into spectrograms and raw audio.
- **AI-Powered Music Generation**: Utilizes models like Stable Audio, MusicGen, and others to create music based on spectrograms and image descriptions.
- **Interactive Web Interface**: Provides an easy-to-use interface where users can upload ultrasounds and receive personalized soundtracks.
- **Seamless Data Handling**: Efficiently stores and retrieves data using Supabase, with backend processing managed through Google Cloud Run.

## System Architecture

- **Frontend**: Built with React and hosted on Vercel, offering a user-friendly interface for interactions.
- **Backend**: Processes images and handles AI model interactions via Google Cloud Run.
- **Data Storage**: Supabase is used to store ultrasound images, spectrograms, and generated audio files.
- **AI Integration**: AI models (Vertex AI, Hugging Face) are integrated to generate music from the spectrograms.

## Use Cases

- **Artistic Installations**: Womb Tunes can be exhibited as part of interactive installations at galleries or festivals.
- **Personalized Experiences**: Families can create unique soundtracks for their ultrasound images.
- **Research and Development**: The project explores the intersection of technology, art, and human connection through sound.

## Future Development

The Womb Tunes prototype lays the foundation for further development into a fully commercial product. Future iterations could expand on the user experience, integrate additional adaptive engines, and explore deeper customization options for sound generation.

---

For more information on the concepts and research behind Womb Tunes, please refer to the project documentation.