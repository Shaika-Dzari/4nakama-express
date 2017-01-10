create table account (
    id serial primary key,
    username text not null,
    password text not null,
    displayname text not null,
    email text not null,
    role text not null default 'author',
    enabled boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    unique (username)
);

-- Default / disabled account
insert into account(username, password, displayname, email, role, enabled)
values('admin@system', '-', 'System', 'admin@system', 'author', false);

create table module (
    id serial primary key,
    code text not null,
    name text not null,
    moduleorder integer not null,
    enablemodule boolean not null default true,
    enablecomment boolean not null default true,
    enablecategory boolean not null default true,
    createdat timestamp with time zone not null default now(),
    unique (name)
);

-- Basic Modules
insert into module(code, name, moduleorder, enablecomment, enablecategory) values('BLOG', 'Blog', 0, true, true);
insert into module(code, name, moduleorder, enablecomment, enablecategory) values('STORY', 'Stories', 1, true, true);
insert into module(code, name, moduleorder, enablecomment, enablecategory) values('PROJECT', 'Projects', 2, true, false);
insert into module(code, name, moduleorder, enablemodule, enablecomment, enablecategory) values('ABOUT', 'About', 3, false, false, false);

create table modulemetatype (
    id serial primary key,
    name text not null,
    createdat timestamp with time zone not null default now(),
    unique (name)
);

-- Some common type
insert into modulemetatype(name) values('text');
insert into modulemetatype(name) values('url');
insert into modulemetatype(name) values('file');
insert into modulemetatype(name) values('date');

create table modulemeta (
    id serial primary key,
    key text not null,
    value text not null,
    valuetypeid integer not null,
    moduleid integer not null,
    createdat timestamp with time zone not null default now(),
    unique (key, moduleid),
    constraint fk_modmeta_moduleid foreign key (moduleid) references module (id),
    constraint fk_modmeta_vtid foreign key (valuetypeid) references modulemetatype (id)
);

create index idx_modmeta_moduleid on modulemeta(moduleid);

create table category (
    id serial primary key,
    name text not null,
    description text,
    moduleid integer not null,
    createdat timestamp with time zone not null default now(),
    unique (name, moduleid),
    constraint fk_modmeta_moduleid foreign key (moduleid) references module (id)
);

create index idx_cat_moduleid on category(moduleid);

-- Default Categories
with module_blog as ( select * from module where code = 'BLOG' ),
cats as (
    select 'Development' as name union all
    select 'Movie' union all
    select 'Book' union all
    select 'Blog'
)
insert into category(name, moduleid)
select c.name, m.id
from cats c, module_blog m
;

create table message (
    id serial primary key,
    title text not null,
    body text not null,
    bodyhtml text,
    published boolean not null default FALSE,
    authorname text not null,
    authorid integer,
    prettyurl text not null,
    moduleid integer not null,
    categories jsonb,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    constraint fk_message_accountid foreign key (authorid) references account (id),
    constraint fk_message_moduleid foreign key (moduleid) references module (id)
);

create index idx_message_createdat on message(createdat);

-- Welcome message
with
module_blog as ( select * from module where code = 'BLOG' ),
default_account as ( select * from account where username = 'admin@system' )
insert into message(title, body, bodyhtml, published, authorname, authorid, prettyurl, moduleid)
select 'Welcome', 'Welcome to your blog!', '<p>Welcome to your blog!</p>', true, a.displayname, a.id, '/welcome', m.id
from module_blog m, default_account a;


create table comment (
    id serial primary key,
    body text not null,
    approved boolean not null default TRUE,
    email text,
    authorname text not null,
    authorid integer,
    messageid integer,
    createdat timestamp with time zone not null default now(),
    constraint fk_comment_messageid foreign key (messageid) references message (id),
    constraint fk_message_accountid foreign key (authorid) references account (id)
);

create index idx_comment_msgid on comment(messageid);

create table file (
    id serial primary key,
    name text not null,
    filepath text not null,
    contenttype text not null default 'application/octet-stream',
    ownerid integer not null,
    ownername text not null,
    ispublic boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    constraint fk_file_accountid foreign key (ownerid) references account (id)
);


create table statistics (
    id serial primary key,
    tablename text not null,
    statistic text not null,
    value text not null,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    unique(tablename, statistic)
);

-- Basic stats
insert into statistics(tablename, statistic, value) values('file', 'total_count', '0');
insert into statistics(tablename, statistic, value) values('message', 'total_count', '0');
insert into statistics(tablename, statistic, value) values('comment', 'total_count', '0');

-- Procedure to calculate stats
create or replace function calculate_statistics_message() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from message) where tablename = 'message' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
-- SET search_path = nakama
;

create or replace function calculate_statistics_file() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from file) where tablename = 'file' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
-- SET search_path = nakama
;

create or replace function calculate_statistics_comment() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from comment) where tablename = 'comment' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
-- SET search_path = nakama
;

-- Triggers to calculate statistics automatically
create trigger trg_message_insert_stats after insert on message execute Procedure calculate_statistics_message();
create trigger trg_message_delete_stats after delete on message execute Procedure calculate_statistics_message();

create trigger trg_file_insert_stats after insert on file execute Procedure calculate_statistics_file();
create trigger trg_file_delete_stats after delete on file execute Procedure calculate_statistics_file();

create trigger trg_comment_insert_stats after insert on comment execute Procedure calculate_statistics_comment();
create trigger trg_comment_delete_stats after delete on comment execute Procedure calculate_statistics_comment();

/*
grant all on schema nakama to u4nakama;
grant all on all tables in schema nakama to u4nakama;
grant all on all sequences in schema nakama to u4nakama;
grant all on all functions in schema nakama to u4nakama;
*/