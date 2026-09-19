-- Run after the existing Owner Dashboard schema.
alter table public.orders add column if not exists payment_mode text default 'COD';
alter table public.orders drop constraint if exists orders_payment_mode_check;
alter table public.orders add constraint orders_payment_mode_check check (payment_mode in ('COD','Paid'));
create table if not exists public.delivery_partners (
 id uuid primary key default gen_random_uuid(), name text not null,
 is_online boolean default false, created_at timestamp default now()
);
alter table public.delivery_partners enable row level security;
drop policy if exists "Authenticated users can read delivery partners" on public.delivery_partners;
create policy "Authenticated users can read delivery partners" on public.delivery_partners for select to authenticated using (true);
alter table public.orders add column if not exists delivery_partner_id uuid references public.delivery_partners(id);
do $$ begin alter publication supabase_realtime add table public.delivery_partners; exception when duplicate_object then null; end $$;
insert into public.delivery_partners(name,is_online)
select v.name,v.is_online from (values ('Arman Khan',true),('Sameer Shaikh',true),('Faizan Ali',false),('Rohit Verma',true)) v(name,is_online)
where not exists(select 1 from public.delivery_partners dp where dp.name=v.name);
update public.orders set payment_mode=case when random()>.45 then 'Paid' else 'COD' end where payment_mode is null;