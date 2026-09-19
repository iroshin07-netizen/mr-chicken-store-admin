# Mr. Chicken — Store Admin App
React/Vite + Tailwind + Supabase JS + Supabase Realtime + React Router + lucide-react. No paid APIs.
## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and enter the SAME Supabase project URL and publishable/anon key used by Owner Dashboard.
3. Never put a service_role/secret key in this frontend.
4. Run the complete `schema-additions.sql` in Supabase SQL Editor. It adds `orders.payment_mode`, `orders.delivery_partner_id`, and `delivery_partners`.
5. Create a staff user in Supabase Auth.
6. `npm run dev`
## Features
Real-time Kanban orders, Accept/Reject, Preparing, Ready for Pickup, delivery assignment, menu availability toggles only, history/search/filters, profile/logout, new-order sound and animation.
## Status values
Exactly: `pending`, `preparing`, `ready_for_pickup`, `picked_up`, `delivered`, `cancelled`.
## Important
Menu items cannot be added/edited/deleted here. Staff only changes `menu_items.is_available`. Manual delivery assignment stores `delivery_partner_id` and moves the order to `picked_up`; normally the Delivery App should own pickup status.
## Build
`npm run build`
