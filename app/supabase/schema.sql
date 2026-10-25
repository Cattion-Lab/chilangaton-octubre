create table public.ratings (
	id uuid primary key default gen_random_uuid(),
	clinic_id text not null,
	week text not null check (week ~ '^\d{4}-W\d{2}$'),
	non_judgmental smallint check (non_judgmental between 1 and 5),
	clear_information smallint check (clear_information between 1 and 5),
	privacy smallint check (privacy between 1 and 5),
	waiting_time smallint check (waiting_time between 1 and 5),
	free_of_charge smallint check (free_of_charge between 1 and 5),
	ease_of_access smallint check (ease_of_access between 1 and 5),
	comment text check (char_length(comment) <= 500),
	comment_status text not null default 'none' check (comment_status in ('none', 'pending', 'approved', 'rejected')),
	check (
		non_judgmental is not null or clear_information is not null or privacy is not null
		or waiting_time is not null or free_of_charge is not null or ease_of_access is not null
	),
	check (comment_status = 'none' or comment is not null)
);

create index ratings_clinic_id_idx on public.ratings (clinic_id);

alter table public.ratings enable row level security;

revoke all on public.ratings from public, anon, authenticated;

create function public.submit_rating(p_clinic_id text, p_scores jsonb, p_comment text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	allowed constant text[] := array[
		'non_judgmental', 'clear_information', 'privacy', 'waiting_time', 'free_of_charge', 'ease_of_access'
	];
	score_key text;
	score_value jsonb;
	clean_comment text := nullif(btrim(coalesce(p_comment, '')), '');
begin
	if p_clinic_id is null or char_length(p_clinic_id) not between 1 and 100 then
		raise exception 'clinic_id no válido';
	end if;

	if p_scores is null or jsonb_typeof(p_scores) <> 'object' or p_scores = '{}'::jsonb then
		raise exception 'Califica al menos un criterio';
	end if;

	for score_key, score_value in select * from jsonb_each(p_scores) loop
		if not (score_key = any (allowed)) then
			raise exception 'Criterio no válido: %', score_key;
		end if;
		if jsonb_typeof(score_value) <> 'number'
			or (score_value #>> '{}') !~ '^[1-5]$' then
			raise exception 'Las calificaciones deben ser números del 1 al 5';
		end if;
	end loop;

	if clean_comment is not null then
		if char_length(clean_comment) > 500 then
			raise exception 'El comentario puede tener hasta 500 caracteres';
		end if;
		if clean_comment ~ '[^\s@]+@[^\s@]+\.[^\s@]+'
			or clean_comment ~* '\m[a-z]{4}\d{6}[hm][a-z]{5}[a-z0-9]\d\M'
			or exists (
				select 1
				from regexp_matches(clean_comment, '\d[\d\s().-]{6,}\d', 'g') as phone_match (parts)
				where char_length(regexp_replace(phone_match.parts[1], '\D', '', 'g')) >= 8
			) then
			raise exception 'El comentario parece incluir un correo, un teléfono o una CURP';
		end if;
	end if;

	insert into public.ratings (
		clinic_id, week, non_judgmental, clear_information, privacy, waiting_time,
		free_of_charge, ease_of_access, comment, comment_status
	) values (
		p_clinic_id,
		to_char(now() at time zone 'utc', 'IYYY-"W"IW'),
		(p_scores ->> 'non_judgmental')::smallint,
		(p_scores ->> 'clear_information')::smallint,
		(p_scores ->> 'privacy')::smallint,
		(p_scores ->> 'waiting_time')::smallint,
		(p_scores ->> 'free_of_charge')::smallint,
		(p_scores ->> 'ease_of_access')::smallint,
		clean_comment,
		case when clean_comment is null then 'none' else 'pending' end
	);
end;
$$;

create function public.rating_summary(p_clinic_id text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
	select case
		when count(*) < 5 then jsonb_build_object('enough', false)
		else jsonb_build_object(
			'enough', true,
			'count', count(*),
			'averages', jsonb_strip_nulls(jsonb_build_object(
				'non_judgmental', round(avg(non_judgmental), 1),
				'clear_information', round(avg(clear_information), 1),
				'privacy', round(avg(privacy), 1),
				'waiting_time', round(avg(waiting_time), 1),
				'free_of_charge', round(avg(free_of_charge), 1),
				'ease_of_access', round(avg(ease_of_access), 1)
			))
		)
	end
	from public.ratings
	where clinic_id = p_clinic_id;
$$;

create function public.approved_comments(p_clinic_id text)
returns table (comment text, week text)
language sql
stable
security definer
set search_path = ''
as $$
	select r.comment, r.week
	from public.ratings as r
	where r.clinic_id = p_clinic_id
		and r.comment_status = 'approved'
		and r.comment is not null
	order by r.week desc
	limit 50;
$$;

revoke all on function public.submit_rating(text, jsonb, text) from public, anon, authenticated;
revoke all on function public.rating_summary(text) from public, anon, authenticated;
revoke all on function public.approved_comments(text) from public, anon, authenticated;

grant execute on function public.submit_rating(text, jsonb, text) to anon;
grant execute on function public.rating_summary(text) to anon;
grant execute on function public.approved_comments(text) to anon;
