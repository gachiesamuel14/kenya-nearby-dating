# Kenya Nearby Dating

Location-based online dating website for people in Kenya to connect with one another based on proximity, county, interests, and more.

## Features (MVP)
- User signup/login via Netlify Identity
- Geolocation for nearby matching
- Swipe/like profiles (mock data for demo)
- Basic profile display with photos, age, bio, distance, county
- Matches list

## Planned Features
- Real user profiles stored in database (e.g. Supabase or Netlify Blobs/Database)
- Real-time chat
- Photo uploads
- Filters: age, distance, tribe, religion, lifestyle, student/professional/church mode
- Notifications
- Safety/report system
- M-Pesa payments for premium features
- Sheng/local language support

## Tech Stack
- Frontend: React + Vite
- Auth: Netlify Identity
- Hosting: Netlify
- Repo: GitHub

## Setup
1. Clone the repo
2. `npm install`
3. `npm run dev`
4. For production: Connect this GitHub repo to the Netlify site "kenya-nearby-dating"
5. Enable Identity in Netlify project settings (Identity tab)
6. Deploy

## Next Steps for Full App
- Integrate Supabase for users, profiles, locations, messages (PostGIS for geo queries)
- Add Google Maps or Mapbox for visualization
- Implement real matching algorithm using Haversine distance or geo indexes
- Add chat with Supabase Realtime or Socket.io
- Photo storage with Cloudinary or Supabase Storage
- M-Pesa via Daraja API for subscriptions

Live site (after deploy): https://kenya-nearby-dating.netlify.app
