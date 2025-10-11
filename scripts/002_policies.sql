-- class_config: allow public read; writes only via service role (no public write policies)
drop policy if exists "class_config_select_public" on class_config;
create policy "class_config_select_public"
on class_config for select
to public
using (true);

-- chat_messages: allow public select and insert (anonymous chat)
drop policy if exists "chat_messages_select_public" on chat_messages;
create policy "chat_messages_select_public"
on chat_messages for select
to public
using (true);

drop policy if exists "chat_messages_insert_public" on chat_messages;
create policy "chat_messages_insert_public"
on chat_messages for insert
to public
with check (true);
